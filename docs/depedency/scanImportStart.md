## 依赖变量声明

```js
const deps: Record<string, string> = {}
const missing: Record<string, string> = {}
```

在扫描入口之前需要声明存储依赖和缺失依赖的变量。

## 生成插件容器
```js
const container = await createPluginContainer(config)
```

在vite启动时, 会形成内置插件, 同时也会有自定义插件,所有的插件都将有插件容器进行调用。在扫描时, 用到了resolveId插件api, 对导出的模块, NPM模块, 扫描入口进行路径解析。

## esbuild插件(负责收集依赖)

```js
const plugin = esbuildScanPlugin(config, container, deps, missing, entries)
```

esbuild是一个构建工具，它只针对入口进行构建，打包, 并不会进行依赖收集。但是esbuild提供了插件功能, 在构建的时候, esbuild可以扫描出整个图谱, 通过分析导入的模块, 对模块进行重写, 同时针对需要收集的依赖进行收集。

## 自定义构建收集过程

```
const { plugins = [], ...esbuildOptions } =
config.optimizeDeps?.esbuildOptions ?? {}
```