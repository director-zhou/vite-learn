
## esbuild插件基础介绍

**esbuild** 插件是一个带有 `name` 和一个 `setup` 函数的对象, 该 `setup` 函数为每个构建 **API** 调用运行一次。

## 案例1

当你在代码中导入一个不存在的模块, 或者是`esbuild`无法解析的文档的时候, 很明显，`env`是一个并不真正存在的文件, 是一个虚拟文件, 最终打最印出来的结果是`process.env`的环境变量。可以通过以下方式进行模块拦截，分配虚拟空间, 进行转换代码。

```js
import { PATH } from  'env' 
console .log( `PATH is ${PATH} ` )
```

```js
let envPlugin = {
   name : 'env' ,
   setup ( build ) {
    // 拦截名为“env”的导入路径，因此 esbuild 不会尝试
    // 将它们映射到文件系统位置。用“env-ns” 
    // 命名空间标记它们，以便为这个插件保留它们。
    build.onResolve({ filter : /^env$/ }, args => ({
       path : args.path,
       namespace : 'env-ns' ,
    }))

    // 加载带有“env-ns”命名空间标记的路径
    // 它们指向包含环境变量的 JSON 文件。
    build.onLoad({ filter : /.*/ , namespace: 'env-ns' }, () => ({
       contents : JSON.stringify(process.env),
       loader : 'json' ,
    }))
  },
}
```
### `plugin` 对象属性

> 1. name

表示插件的名称。

> 2. setup

表示插件调用的函数。


### **onResolve** 

`filter` 通过正则匹配用来拦截导入的模块名称或者文件路径, 当遇到不支持解析的文件或者虚拟文件, 返回当前解析后的 `path` 可以通过 `namespace` 进行分配虚拟空间, 等待 `onload` 进行转换代码内容和指定 `esbuild` 可解析的文件后缀。

::: warning 提示
如果返回值不设置`namespace`, `path` 则需要返回绝对路径。
:::

### **onLoad**

`filter` 通过正则匹配用来拦截导入的模块名称或者文件路径, 同时满足 `namespace` 分配的虚拟空间，两者都满足时将通过 `onload` 进行自定义转换，`contents` 则是转换的文件的内容，`loader` 则是告诉 **esbuild** 构建内容时视为那种模块类型进行处理，不同的后缀`esbuild` 构建的方式也不同。


## 案例2

1. 可以通过插件改变导入的模块。

2. 导入模块作为外部引用, 不需要 `bundle` 到主文件中。

```js
// main.js
// 构建文件
import Image from 'images/a.jpg'
import Url from 'https://www.cdn-XXXXXXX.js'
```

```js
let exampleOnResolvePlugin = {
  name: 'example',
  setup(build) {
    let path = require('path')

    // 将以“images/”开头的所有路径重定向到“./public/images/”
    build.onResolve({ filter: /^images\// }, args => {
      return { path: path.join(args.resolveDir, 'public', args.path) }
    })

    // 标记所有以“http://”开头的路径或“https://”作为外部
    build.onResolve({ filter: /^https?:\/\// }, args => {
      return { path: args.path, external: true }
    })
  },
}
```

### 替换模块

通过 `filter` 拦截到 `images/` 开头的模块, 通过执行第二个参数方法的返回值确认替换结果, 方法执行时参数返回一个 `args` 对象, 代表以下内容:

1. `resolveDir` 导入模块代码的文件所在的目录  `/user/demo/src`
2. `importer` 导入模块代码的文件地址  `/user/demo/src/main.js`
3. `path` 导入的模块名称或者路径地址 (相对路径，绝对路径, npm包名称, 自定义虚拟名称) 等。

### 过滤模块

当拦截到 `http` 或者 `https` 开头的路径, 最后返回的时候可以通过 `external` 设置 `true`, 将会过滤对当前导入的模块, 当前模块不进行构建，还是以`import` 语法的方式进行导入, 不将源代码构建入主入口中, 同时当前被过滤的模块中内部导入的模块也会被过滤。

