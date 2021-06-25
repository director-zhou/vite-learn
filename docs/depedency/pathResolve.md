通过 `html` 的 脚本提取，找到了引用的脚本路径, 以下 `demo`:

```js
import "/src/main.js"
export default {}
```

## onResolve解析路径

无论是相对路径和绝对路径的`js`, `tsx`, `jsx`, `mjs`文件都将被 `build.onResolve({filter: /.*/}` 拦截
同时也支持省去后缀，在`resolve`解析路径的时候，会对后缀进行自动匹配

```js
// 省去后缀
import "/src/main"
export default {}
```

```js
async ({ path: id, importer }) => {}
```

解析时 `id` 则为路径地址 `/src/main.js`, `importer` 则为 `html` 的绝对路径地址

> 解析路径
```JS
const resolved = await resolve(id, importer)
```

`resolved` 将返回绝对路径地址, 同时也可以没有寻找到任何匹配的路径

```js
else {
  // resolve failed... probably unsupported type
  return externalUnlessEntry({ path: id })
}
```

如果没有找到则认为是一个错误文件, 直接进行过滤, 不再对此路径进行深入扫描

> 如果解析到绝对路径

```js
if (shouldExternalizeDep(resolved, id)) {
  return externalUnlessEntry({ path: id })
}

export function pshouldExternalizeDep(
  resolvedId: string,
  rawId: string
): boolean {
  // not a valid file path
  if (!path.isAbsolute(resolvedId)) {
    return true
  }
  // virtual id
  if (resolvedId === rawId || resolvedId.includes('\0')) {
    return true
  }
  // resolved is not a scannable type
  if (!JS_TYPES_RE.test(resolvedId) && !htmlTypesRE.test(resolvedId)) {
    return true
  }
  return false
}
```

就对路径解析成功，需要对文件路径进行检测优化，以下解析后的路径需要进行过滤

1. 不是一个正确的绝对路径。
2. 是一个虚拟的路径
3. 路径不是以`.js`, `.ts`, `.jsx` ,`.tsx`, `.mjs`后缀, 并且不是以`.vue`, `.html`, `.svelte`后缀文件


> 遇上 .vue .html .svelte后缀的相对路径或者绝对路径文件时

```js
const namespace = htmlTypesRE.test(resolved) ? 'html' : undefined
```

如果此时解析的路径是一个 `.vue`，`.html`, `.svelte`文件, 直接返回不进行`load`转换时会造成`esbuild`无法识别, 此时返回时设置`namespace`, 继续交给`onload`进行处理。其余的正常返回,解析控制权交还于`esbuild`


```js
return {
  path: path.resolve(cleanUrl(resolved)),
  namespace
}
```

> 什么情况会解析到 .vue .html .svelte后缀文件

在**8**大`onResolved`方法中, 一开始就会解析 `.vue`, `.html`, `.svelte`文件，但如果引入的路径省略后缀，在`resolve`路径时会进行补全，但是此时已`filter .* `拦截, 所以此时需要再进行二次同样处理。



## 深入路径解析

```js
//  /src/main.js

import util from './util/index.js'
```

```js
// /src/util/index.js

import cache from './cache.js'
```

```js
// /src/util/cache.js

export default {}
```

整个深入路径解析的过程是

`/user/project/src/main.js`  -> `/user/project/src/util/index.js` -> `/user/project//src/util/cache.js`

以上三个路径都将被进行路径解析，同时`esbuild`会对内部导入进行分析

## 中断解析过程

```js
//  /src/main.js

import util from '../util/index.js'
```
这是一个错误的路径，通过`resolve`解析出来是`undfined`, 此时就会对`../util/index.js`进行`external`, 同时他内部的`import cache from './cache.js'`都不会被`esbuild`进行导入解析, 直接中断。

如果不设置`external`, `esbuild`将会报错:

```js
 > src/main.js:4:7: error: Could not resolve "../util/index.js"
    4 │ import '../util/index.js'
      ╵        ~~~~~~~~~~~~~~~~~~

error when starting dev server:
Error: Build failed with 1 error:
src/main.js:4:7: error: Could not resolve "../util/index.js"
```

