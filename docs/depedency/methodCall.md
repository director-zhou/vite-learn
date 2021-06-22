加载资源优化的机制是等待服务器启动前调用优化器执行完毕后，将会创建一个`_registerMissingImport`方法,为启动前扫描器遗漏生成的优化器,两者的内部核心都是以`optimizeDeps`方法为基础作为优化模块。

```js
  const runOptimize = async () => {
    if (config.cacheDir) {
      server._isRunningOptimizer = true
      try {
        server._optimizeDepsMetadata = await optimizeDeps(config)
      } finally {
        server._isRunningOptimizer = false
      }
      server._registerMissingImport = createMissingImporterRegisterFn(server)
    }
  }
```

## 服务器启动前的执行机制

在服务器启动前会调用`runOptimize`方法, 同时会在`server`对象上把`_isRunningOptimizer`属性设置为`true`,表示优化器正在运行中,调用`optimizeDeps`方法,`optimizeDeps`方法是贯穿了整个优化过程。

优化器工作完毕, 将会把`isRunningOptimizer`重置为`false`,表示优化工作完闭。

## 加载资源时优化的执行机制

在调用完启动前优化器之后，会在`server`对象上添加`_registerMissingImport`方法, 是通过`createMissingImporterRegisterFn`生成加载资源时的优化器,此方法在`optimeizer/registerMissing.ts`文件中,内部还是调用了`optimizeDeps`方法,所以说`optimizeDeps`是整个优化器的核心方法入口。

```js
// plugin/resolve.ts

export function tryNodeResolve(
  id: string,
  importer: string | undefined,
  options: InternalResolveOptions,
  targetWeb: boolean,
  server?: ViteDevServer
): PartialResolvedId | undefined {
  if (isBuild) {
   XXX
  } else {
    if (
     XXX
    ) {
      XXX
    } else {
      // this is a missing import.
      // queue optimize-deps re-run.
      server._registerMissingImport?.(id, resolved)
    }
    return { id: resolved }
  }
}
```
> 理解注释

```
// this is a missing import.
// queue optimize-deps re-run.
```

当加载将源时,会调用`vite-resolve`插件, 一旦在优化器映射表中没找到对应的缓存的解析路径，将会调用`server._registerMissingImport?.(id, resolved)`, 二次优化器调用完毕之后,通过`websocket`向浏览器发出重新刷新页面的通信，同时是以队列的方式进行优化，每优化一块将重新刷新页面。

```js
server.ws.send({
  type: 'full-reload',
  path: '*'
})
```