## 收集依赖，依赖是什么？

**Vite** 将抓取你的源码，并自动寻找引入的依赖项（即 "**bare import**"，表示期望从 **node_modules** 解析）

以上是官方文档的解释，所谓的收集依赖就是根据导入的包名,确定需要导入的包名的绝对路路径，关于到底使用包中那个文件，`resolveId`插件会对`package.json`进行分析选择。

## onResolved 命中解析

> 导入示例

```js
import dayjs from 'dayjs'
```

在整个解析链路中,遇到导入的内容来源于`node_modules`将会命中以下解析方法

```js
build.onResolve({filter: /^[\w@][^:]/}, async ({ path: id, importer }) => { XXX })
```
## 过滤exclude包名

```js
if (exclude?.some((e) => e === id || id.startsWith(e + '/'))) {
  return externalUnlessEntry({ path: id })
}
```

当解析的对应的包名时, 如果不需要进行预构建,可以通过`optimizeDeps.exclude`来强制排除进入当前依赖项, 排除满足以下两个条件:

1. 当导入路径等于排除名称
2. 当导入`npm`包的中的某个文件

```js
import lodash from 'lodash'
import toKey from 'lodash/_toKey.js

// exclude配置

optimizeDeps.exclude: ['lodash']
```

## 过滤已收集的依赖

```js
if (depImports[id]) {
  return externalUnlessEntry({ path: id })
}
```

`depImports`是`esbuildScanPlugin`插件的参数, 同时也是收集依赖的映射表
当前依赖已经被收集,不再进行深入依赖解析

## 解析引入包的入口文件

```js
const resolved = await resolve(id, importer)
if (resolved) {
  
} else {
  missing[id] = normalizePath(importer)
}
```

排除了以上两种不需要进行依赖收集的情况, 接下来就对导入包路径进行解析，寻找入口文件
如果没有解析到引入包名的入口文件, 视为缺失的包, 通过`missing`变量进行收集。
## 排除非法文件, 过行过滤

```js
if (shouldExternalizeDep(resolved, id)) {
  return externalUnlessEntry({ path: id })
}
```

这里主要会有一些`npm`包的入口文件后缀名不符合构建要求, 比如后缀不是`.js`或者`.mjs`

## 符合收集依赖文件, 进行收集

```js
if (resolved.includes('node_modules') || include?.includes(id)) {
  // dependency or forced included, externalize and stop crawling
  if (OPTIMIZABLE_ENTRY_RE.test(resolved)) {
    depImports[id] = resolved
  }
  return externalUnlessEntry({ path: id })
}
```

符合收集依赖需要那几点, 分为两层:

> 第一层

1. 如果解析的路径地址包含node_modules
2. 在optimizeDeps.include中强制构建导入路径

> 第二层

解析后的路径必须是后缀为`.mjs`或者`.js`结尾的文件

> 理解在`optimizeDeps.include`中强制构建导入路径的使用场景

这里属于自定义预构构建, 导入的文件可能并不是从`npm`包中进行收集的依赖，同时也是`esm`多模块导出的导致加载性能的优化手段

> 示例

```js
// src/util.js
import one from './one.js
import two from './two.js
...n个模块

export default {
  one,
  two,
  ...n个模块
}
```

```js
import util from '@/util.js'

// vite.config.js
resolve: {
  alias: {
    "@": "path.resolve(__dirname, 'src')"
  }
},
optimizeDeps: {
  include: ["@/util.js"]
}
```

通过别名引入的方式同样也可以被构建`esbuild`插件拦截到,同时满足以上两层的优化条件

## 依赖收集方式

```js
depImports[id] = resolved
```

收集的依赖是一个`key:value`的方式

1. `id` 代表导入模块的路径
2. `value` 代表最后通过`resolveId`插件方法寻找到的入口文件的路径

> 展现结果:

```json
{
  "dayjs": "/Users/admin/crm/node_modules/dayjs/index.js",
  "@/util.js": "/Users/admin/crm/src/util/index.js"
}
```

## 不进行二次寻找依赖

```js
if (OPTIMIZABLE_ENTRY_RE.test(resolved)) {
  depImports[id] = resolved
}
return externalUnlessEntry({ path: id })
```

可以发现在收集依赖完毕之后进行路导入路径过滤，不再深入进行寻找构建内容

因为最后预构建的内容以主入口主，文件内部引入的模块将会被打入主口文件中, 内部引用的模块不必进行二次收集依赖, 如果N个收集的依赖模会存在相互依赖的情况下, 也不必担心，在真正构建过程会进行`splitChunk`进行分包。

## 继续深入寻找

```js
if (resolved.includes('node_modules') || include?.includes(id)) {
  XXX
} else {
 return {
    path: path.resolve(resolved)
 }
}

```

通过别名引入时，没有把导入路径加载优化**API**`optimizeDeps.include`中时, 需要进行深入文件内部继续寻找需要构建的依赖。

## issure

https://github.com/vitejs/vite/issues/3998
https://github.com/vitejs/vite/issues/3532

```js
import HelloWorld from '@/src/component/helloWorld'
// vite.config.js
resolve: {
  extensions: ['.vue']
},
```
通过别名并且省去后缀，后缀是以`.vue` 或者`esbuild`不可解析的情况, 同样代码也会执行入深入寻找内容中。

> 解决方案

1. 加上后缀, 一进行`esbuild`插件解析时就可以直接被`.vue`后缀`onResolved`解析器给拦截。
2. 通过optimizeDeps.esbuildOptions 进行自定义拦截过滤。