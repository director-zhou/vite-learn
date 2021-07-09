## optimizeDeps方法参数以及返回值

```js
export async function optimizeDeps(
  config: ResolvedConfig,
  force = config.server.force,
  asCommand = false,
  newDeps?: Record<string, string> // missing imports encountered after server has started
): Promise<DepOptimizationMetadata | null>
```
> 一. 参数

1. `config` 启动前 **Vite** 整合的 `config` 信息，参考配置项 `API`。
2. `force` 引用 `server.force` 中的 `API`, 设置为 `true` 强制使依赖预构建, 每次启动的时候都将删除所有预构建的缓存文件夹，重新进行预构建。
3. `asCommand` 是否是命令行调用，调用 `optimizeDeps` 方法有三处，其中有一处是通过命令行进行调用。
4. `newDeps` 会存在两种情况，第一种情况会是 `undefined`, 在启动调用优化器时, 不会存在新的优化依赖, 第二种情况是一个对象, 会把启动前需要构建的依赖与加载时导入文件缺失的构建依赖进行合并, 扫描器此时并不会再次进行扫描, 只会进行对合并后的依赖进行执行重新构建。

> 二. 返回值

```json
{
  "hash": "4dd4ced0",
  "browserHash": "dfb02c43",
  "optimized": {
    "lodash": {
      "file": "/Users/admin/zzx/test/node_modules/.vite/lodash.js",
      "src": "/Users/admin/zzx/test/node_modules/lodash/lodash.js",
      "needsInterop": true
    },
    "dayjs": {
      "file": "/Users/admin/zzx/test/node_modules/.vite/dayjs.js",
      "src": "/Users/admin/zzx/test/node_modules/dayjs/dayjs.min.js",
      "needsInterop": true
    }
  }
}
```

1. `hash` 字段的生成是由用户 `vite.config.js` 中的配置的某此字段和 `.lock` 文件合并生成的 `8` 位 `hash` 值, `hash`是否需要变更, 也取决于 `vite.config.js` 的配置文件和 `.lock` 文件是否变更，有变更将重进行预构建, 因为这些变更对构建内容将产生不符合预期的结果, 否则将跳过预构建，以免不必要重新预构建, 减少启动耗时。

2. `browserHash` 浏览器哈希由主哈希加上其他依赖项决定, 依赖的变量会说明构建内容也会变更，服务器需要通过判断 `browserHash` 是告诉浏览器重新加载资源, 而不是 `304` 取缓存。

3. `optimized` 构建器优化完的构建映射表, `file`表示依赖构建存放的目录地址。 `src` 表示收集的依赖 `(npm模块)` 构建的入口文件。 `needsInterop` 是否需要进行加载变异。


## 构建大致流程

1. 判断是否需要进行预构建，对存储文件目录进行处理。
2. 通过扫描器，对入口文件进行扫描, 扫描需要构建的依赖和缺失依赖。
3. 在优化 `include` 中找到的依赖与扫描后的依赖进行合并。
4. 提示需要预构建的内容。
5. 对需要构建的依赖通过 `esBuild` 进行构建输出到 `cacheDir`
6. 向 `cacheDir` 中 `_metadata.json` 写入构建后的元信息。


## 构建大致流程图
尽请期待....