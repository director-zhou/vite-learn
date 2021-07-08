## 服务器启动前触发

在服务器启动前覆盖侦听以运行优化器, 这句话是源码中的注释`// overwrite listen to run optimizer before server start`

调用`createServer`启动前,将会重写`listen`方法,调用优化器之后，再进行`listen`启动。

```JS
const listen = httpServer.listen.bind(httpServer)
httpServer.listen = (async (port: number, ...args: any[]) => {
  try {
    await runOptimize()
  }
  return listen(port, ...args)
}) as any
```

如果采用其它框架做为服务器时, 服务的器启动之前都等待`createServer`执行完毕。

```js
  if (!middlewareMode && httpServer) {
  } else {
    await runOptimize()
  }
```

## 加载静态资源时触发

在服务器启动时,会对加载资源进行优化,但是往往有些情况下,优化扫描器并不能完全扫描成功,会有以下情况:

> 1. `import`动态加载时, 加载路径存在变量时, 扫描器无法对存在`动态变量`的路径进行准确的扫描。

```js
const root = 'util'
import(/* @vite-ignore */ `./${root}/index.js`)
```

util/index.js内容
```js
import lodash from 'lodash'
```

> 2. 通过插件`api`中`transform`方法转换源代码, `transform`插件`api`是浏览器加载资源时,服务器会经过此函数进行转换后再把内容发送到浏览器, 扫描器将无法提前识别转换后的文件内容。

```js
// one.js中的内容
export default {}
```

```js
// 插件方法
function myPlugin ()  {
  return {
    transform(src, id) {
      if (id.indexOf('one.js') >= 0) {
        return `
          import dayjs from 'dayjs'
          ${src}
        `
      }
    },
  }
}
```

> 3. 通过插件`resolveId` 和 `load` 插件`api`引入虚拟文件时, 加载到相应的资源时，通过`resolveId`来确定最终`id`, 通过`load`来生成相应的代码片段，扫描器同样无法提前识别

```js
// 引入的虚拟文件
import File from '@my-virtual-file'
```

```js
// 插件内容
function myPlugin ()  {
  return {
    resolveId (id) {
      if (id === '@my-virtual-file') {
        return '@my-virtual-file'
      }
    },
    load(id) {
      if (id === '@my-virtual-file') {
        return `
          import lodash from 'lodash'
          export default {}
        `
      }
    },
  }
}
```


