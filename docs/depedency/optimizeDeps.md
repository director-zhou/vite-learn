## 方法参数以及返回值

```js
export async function optimizeDeps(
  config: ResolvedConfig,
  force = config.server.force,
  asCommand = false,
  newDeps?: Record<string, string> // missing imports encountered after server has started
): Promise<DepOptimizationMetadata | null>
```
> 参数介绍

1. `config` 表示启动时整合的`config`信息，参考配置项`api`
2. `force` 则是引用`server.force`中的`Api`, 设置为 `true` 强制使依赖预构建, 每次启动的时候都将删除所有预构建的缓存，重新对所有进行预构建
3. `asCommand` 表示是否是命令行调用，调用`optimizeDeps`方法有三处，其中有一处是通过命令行进行调用的。
4. `newDeps` 会存在两种情况，第一种情况会是`undefined`,在启动时预构建, 不会存在新的优化依赖, 第二种情况是一个对象, 会把启动时需要预构建与加载时缺失的预构建文件地址进行合并。这决定了需要不需要对设置的入口文件进行再次预构建的扫描。

> 返回值

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

1. `hash` 字段的生成是由, 用户的配置 `vite.config.js` 中的配置和`.lock`文件合并生成的`8`位`hash`值, `hash`是否需要变更,也取决于`config`的配置文件和`.lock`文件是否变更，有变更将重进行预构建, 否则将跳过预构建，以免不必要的重新预构建。

2. 浏览器哈希由主哈希加上其他依赖项决定, 在运行时发现。这用于使浏览器请求无效, 优化的`deps`

3. `optimized` 构建器优化完的构建映射表, `file`表示, 构建后的存方地址, `src` 表示构建前的原本文件地址。 `needsInterop` 暂时还没有明白透


## 构建大致流程

1. 判断是否需要进行预构建，对构建后的存储文件进行处理
2. 通过扫描器，对入口文件进行扫描, 解析需要构建的依赖地址和缺失依赖
3. 对优化`include`中找到的依赖与扫描后的依赖进行合并。
4. 提示需要预构建的内容
5. 对需要构建的依赖通过`esBuild`进行打包输出到`cacheDir`
6. 向`cacheDir`中`_metadata.json`写入构建后的映射表和hash比对的数据。


## 构建大致流程图