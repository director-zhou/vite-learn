
## esbuild插件基础介绍

**esbuild** 插件是一个带有 `name` 和一个 `setup` 函数的对象。它们以数组形式传递给构建 **API** 调用。该 `setup` 函数为每个构建 **API** 调用运行一次。

## 案例1

当你在代码中这样的写的时候, 引入的`env`并不是一个真正的文件，或者是`esbuild`无法解析的文档的时候, 很明显，`env`是一个并不真正存在的文件, 是一个虚拟文件, 最打最印出来的结果是`process.env`的环境变量。可以通过以下方式进行标记路径，转换代码。

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

> name

表示插件的名称

> setup

是插件调用的函数。

1. **onResolve** 

`filter` 拦截正则表达式匹配到的文件。

是用来解析引入的文件的路径, 当遇到不支持解析的文件或者虚拟文件, 返回当前解析后的 `path` 可以通过 `namespace` 进行文件暂存,等到通过`onload`进行转换成真正可执行或者可被`esbuild`解析的文件。

:::warning
如果返回值不设置`namespace`, `path`则需要返回绝对路径。
:::

2. **onLoad**

`filter` 拦截正则表达式匹配到的文件, `namespace` 命令空间标记的路径，两者都满足时将进行`onload`进行转换。

将通过此方法进行自定义转换，`contents`则是转换的文件的内容，`loader`则是告诉`esbuild`你需要解析的文件后缀，不同的后缀`esbuild`解析的方式也不同。


## 案例2

可以通过插件改变引用的路径地址。
导入模块作为外部引用, 不需要`bundle`到主文件中。

```js

// user/demo/src/main.js

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
> 转换路径

通过`filter`拦截到`images/`开头的路径, 通过第二个参数是一个函数, 参数返回一个`args`对象。

1. **resolveDir** 导入代码所在的文件地址目录  `/user/demo/src`
2. **importer** 导入代码所有的文件地址  `/user/demo/src/main.js`
3. **path** 导入的字符串内容, (相对路径，绝对路径, npm包名称, 自定义虚拟名称)等 `images/a.jpg`  `https://www.cdn-XXXXXXX.js`

如果我们需要对路径转前, 必须要返回绝对路径。

> 过滤路径

当拦截到 `http` 或者 `https`开头的路径, 最后返回的时候可以通过 `external` 设置 `true`, 将会过滤对当前引入的模块进行解析, 同时当前引入的模块内部的模块也会被过滤。在构建过种中将会对 `import XXX from XXX` 进行任何处理。

