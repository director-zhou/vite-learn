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

在`VITE`启动时, 会形成内置插件, 同时也会有自定义插件,所有的插件都将有插件容器进行调用。在扫描时, 用到了`resolveId`插件`api`, 对导出的模块, `NPM`模块, 扫描入口进行路径解析。

## esbuild插件(负责收集依赖)

```js
const plugin = esbuildScanPlugin(config, container, deps, missing, entries)
```

`esbuild`是一个构建工具，它只针对入口进行构建，打包, 并不会进行依赖收集。但是`esbuild`提供了插件功能, 在构建的时候, `esbuild`可以扫描出整个`图谱模块与块`引用关系, 通过分析导入的模块, 对非正常可解析文件 **(比如.html .vue)** 结尾的文件进行重写, 同时针对需要收集的依赖进行收集。


## 通过esbuild build方法收集依赖

```js
  await Promise.all(
    entries.map((entry) =>
      build({
        write: false,
        entryPoints: [entry],
        bundle: true,
        format: 'esm',
        logLevel: 'error',
        plugins: [...plugins, plugin],
        ...esbuildOptions
      })
    )
  )
```

当收集完需要解析入口之后, 将入口进行一一扫描, (可以理解为通过`esbuild`进行构建，但是实际上只利用构建过程的解析关系链)

1. `write` 设置为`false`, 正是这里只收集依赖, 并不会产生构建打包文件
2. `entryPoints` 需要扫描文件的入口地址
3. `bundle` 不设置`bundle`的情况下, 打包的入口文件如果有导入的文件, 并不会进行解析, 需要手动进行设置为`true`, 才会进行递归的方式进行解析。
4. `format` 构建转换成什么格式
5. `logLevel` 报错提示等级
6. `plugins` 插件, 正是通过编写`esbuildScanPlugin`函数进行收集依赖

## 自定义扫描过程

```js
const { plugins = [], ...esbuildOptions } =
config.optimizeDeps?.esbuildOptions ?? {}
```

在文档中并没有`optimizeDeps.esbuildOptions`的用法。在扫描的时候对文件进行处理阶段和收集阶段, 我们可以通过`esbuild`插件功能实现额外的收集依赖拓展, 大部分功能在内部的扫描器插件中已经实现。同时还可以覆盖扫描的配置。