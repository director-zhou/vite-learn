扫描入口文件, 收集到所需要的依赖的分别为两种:

1. `deps` 需要进行构建的依赖
2. `missing` 扫描文件时检测到缺失的依赖

## 利用依赖信息更新`browser hash`

在预构建启动前已经生成了`main hash`, 同时`browser hash`也等于`main hash`, 如果不进行预构建的情况下`main hash` 与 `browser hash`相同。

> main hash

`main hash`的生成是用来重新启动时，是否需要进行重新执行构建。

> browser hash

`browser hash` 在浏览加载资源的时候, 告诉浏览器是否需要向服务端重新加载资源, 在预构建扫描入口的情况下并不会总是把所有文件扫描干净，收集到应该收集的所有依赖。等到浏览器启动加载资源时, 如果此资源是需要进行预构建的，而找不到相应的构建资源，将会再次进行与原有依赖内容合并后再次构建后，自动重新刷新浏览器, 重新预构建的内容将需要重服务端重新获取。因为构建内容将会重新改变


```js
  // update browser hash
  data.browserHash = createHash('sha256')
    .update(data.hash + JSON.stringify(deps))
    .digest('hex')
    .substr(0, 8)
```

生成方式与`main hash`一样，调用`node`模块`crypto`的`createHash`方法对进行`hash`加密,截取**8**位，加密的内容是由`main hash` + `所收集的所有依赖`。这样就可以确保在开发中, 自动重新预构建时候，保证加载的是最新的资源。

这里需要一张图。

## 报错提示缺失的依赖

在项目中，如果缺少任务一个引入的文件模块, 这必定是一个无法正常运行的项目, 在收集依赖时，如果发现缺少对应依赖的文件内容时，`Vite`将会中断赖个构建过种, 通过报错提示告诉开发者。

```js
  const missingIds = Object.keys(missing)
  if (missingIds.length) {
    throw new Error(
      `The following dependencies are imported but could not be resolved:\n\n  ${missingIds
        .map(
          (id) =>
            `${chalk.cyan(id)} ${chalk.white.dim(
              `(imported by ${missing[id]})`
            )}`
        )
        .join(`\n  `)}\n\nAre they installed?`
    )
  }

```

`missing`的数据结构是由引入模块`id`加上`importer`来源进行`key : value` 组合

```js
{
  "dayjs" : "/user/admin/project/src/main.js"
}
```
提取`missing`中的`Key,` 通过抛错进行通知。

这里加个抛错图


## 添加`optimizeDeps.include`依赖

之前是通过文件入口进行扫描, 某些情况下入口扫描无法完全扫描完全,会扫描丢失, 需要在加载资源的时候会进行重新预构建, `pre-bundle`是队列的形式，队列一旦比较多，会影响启动速度，不断重新构建，重新刷新页面。

入口扫描加入依赖的内容只会存在**bare Import**, `node_modules`依赖包的引入模块，为了解决业务文件引入一个文件然后进行导出的方式会影响加载性能，会占用大量`connect`连接线程进行阻塞加载, 可以通过`include`加入依赖

```js
  const include = config.optimizeDeps?.include
  if (include) {
    const resolve = config.createResolver({ asSrc: false })
    for (const id of include) {
      if (!deps[id]) {
        const entry = await resolve(id)
        if (entry) {
          deps[id] = entry
        } else {
          throw new Error(
            `Failed to resolve force included dependency: ${chalk.cyan(id)}`
          )
        }
      }
    }
  }
```

通过`config`的配置获取`include`数组，如果存在`include`依赖，通过`for of`循环, 如果模块已经被收集依赖则无视,否则对模块进行解析路径文件路径,如果没有解析到文件路径则提示报错，`include`中的依赖收集错误，路径解析成功，则加入依赖收集项中。

// 如果include中导入解析的文件非.js 或者 .mjs 被es-module-lexer抛错


# 构建是否有构建项

在服务启动前是否存在有构建项分为两点:

1. 入口扫描是否找出构建项
2. `optimizeDeps.include`中是否包含构建项

```js
  const qualifiedIds = Object.keys(deps)

  if (!qualifiedIds.length) {
    writeFile(dataPath, JSON.stringify(data, null, 2))
    log(`No dependencies to bundle. Skipping.\n\n\n`)
    return data
  }
```
声明q`ualifiedIds`变量, 通过`Object.keys`进行收集模块依赖的模块名称, 如果不存在任务需要构建的依赖,把`data`数进行返回赋值到，`server._optimizeDepsMetadata`属性上。同时向缓存文件进行写入优化元信息内容

```js
// _metadata.json文件
{
  hash: XXXXXXXX,
  browserHash: XXXXXXXX,
  optimized: {}
}
```

## 构建依赖前的提示

依赖已经收集完毕了, 马上就要临近构建了, 在构建前需要提示开发者, 当前构建了那些依赖
前面已经了解过,预构建的执行会在三处。这三处理的执行预构建方法给开发者的提示都不一样

> 通过控制台命令行启动前优化时

```
logger.info(chalk.greenBright(`Optimizing dependencies:\n  ${depsString}`))
// 只通知优化内容
```

> 非控制台命令行启动前优化时

```js
logger.info(
  chalk.greenBright(`Pre-bundling dependencies:\n  ${depsString}`)
)
logger.info(
  `(this will be run only when your dependencies or config have changed)`
)
// 不但通知优化内容，通过配置进行改动，将重新进行预构建
```

> 启动后加载资源时进行优化时

不进行任何提示

```js
if (!asCommand) {
  if (!newDeps) {
    // This is auto run on server start - let the user know that we are
    // pre-optimizing deps
    logger.info(
      chalk.greenBright(`Pre-bundling dependencies:\n  ${depsString}`)
    )
    logger.info(
      `(this will be run only when your dependencies or config have changed)`
    )
  }
} else {
  logger.info(chalk.greenBright(`Optimizing dependencies:\n  ${depsString}`))
}
```

1. `asCommand` 表示是否是命令行启动
2. `newDeps` 表示是否是加载时执行的优化

> depsString 生成方法

```js
const total = qualifiedIds.length
const maxListed = 5
const listed = Math.min(total, maxListed)
const extra = Math.max(0, total - maxListed)
const depsString = chalk.yellow(
  qualifiedIds.slice(0, listed).join(`\n  `) +
    (extra > 0 ? `\n  (...and ${extra} more)` : ``)
)
```

变量`total`是需要优化的总数
变量`maxListed`表示只展示`5`条构建内容
变量`listed`表示得到最小的截取数量, 如果依赖总数小于`maxListed`,则用`total`,否则用`maxListed`
变量`extra`表示大于`5`条优化条目时，还有有多少省略展示

> 展示的构建提示内容

```js
Pre-bundling dependencies:
  vue
  ant-design-vue
  @ant-design/icons-vue
  vue-router
  vuex
  (...and 9 more)
(this will be run only when your dependencies or config have changed)
```



