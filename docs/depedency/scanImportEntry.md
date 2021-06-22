### scanImports 函数
```js
export async function scanImports(config: ResolvedConfig): Promise<{
  deps: Record<string, string>
  missing: Record<string, string>
}
```

**scanImports** 是预构建扫描器方法

> 入参 config

`config` 自义定配置

> 返回值
1. `deps` 扫描出来需要优化表
2. `missing` 扫描后的缺失表


```js
let entries: string[] = []
```

声明入口变量 **entries**

## 自定义optimizeDeps.entries为入口


> 文档解释

默认情况下，**Vite** 会抓取你的 **index.html** 来检测需要预构建的依赖项。如果指定了 **build.rollupOptions.input**，**Vite** 将转而去抓取这些入口点。

如果这两者都不合你意，则可以使用此选项指定自定义条目——该值需要遵循 `fast-glob` 模式 ，或者是相对于 `vite` 项目根的模式数组。这将覆盖掉默认条目推断

```js
  const explicitEntryPatterns = config.optimizeDeps?.entries
   if (explicitEntryPatterns) {
    entries = await globEntries(explicitEntryPatterns, config)
  }
```

`optimizeDeps.entries`是`Vite`的依赖优化选项的一个`Api`,同时也是第一优先级，如果定义了, 则从`optimizeDeps.entries`配置中进行入口解析。


```js
import glob from 'fast-glob'
function globEntries(pattern: string | string[], config: ResolvedConfig) {
  return glob(pattern, {
    cwd: config.root,
    ignore: [
      '**/node_modules/**',
      `**/${config.build.outDir}/**`,
      `**/__tests__/**`
    ],
    absolute: true
  })
}
```

`globEntries`是整个调用了 **NPM** 包`fast-glob`进行寻找入口文件

1. **cwd** 是寻找到的起始目录
2. **ignore** 忽略的文件夹
 * `node_modules`文件夹
 * 打包后的文件夹
 * `__tests__` 单元测试文件
3. **absolute** 最后解析后返回绝对路径


## 自定义 build.rollupOptions.input为入口点

```js
  const buildInput = config.build.rollupOptions?.input
  if (XXX) {
    XXX
  } else if (buildInput) {
    const resolvePath = (p: string) => path.resolve(config.root, p)
    if (typeof buildInput === 'string') {
      entries = [resolvePath(buildInput)]
    } else if (Array.isArray(buildInput)) {
      entries = buildInput.map(resolvePath)
    } else if (isObject(buildInput)) {
      entries = Object.values(buildInput).map(resolvePath)
    } else {
      throw new Error('invalid rollupOptions.input value.')
    }
  }
```
如果没有`optimizeDeps.entries`, 接下来以`build.rollupOptions.input`为入口点。

`rollupOptions`是与`rollup`文档保持一致。会存在三种配置方案

1. 字符串
```js
'./index.html'
```
2. 数组
```js
['./index.html', './index2.html']
```
3. 对象的方式
```json
{
  "index": "./index.html",
  "index2": "./index2.html"
}
```

> 解析方式

通过`resolvePath`方法, 获取基于`config.root`相对的路径,最后解析成绝对路径写入`entries`变量中

如果格式不是以上三种，将提示检查`rollupOptions.input`值。

::: warning
通过`rollupOptions.input`寻找入口, 不存在被过滤问题, 如果不想被过滤进行约束,可以通过`rollupOptions.input`寻找入口,在有些启动node_modules中的工程时可以使用。
:::

## 默认入口

```js
else {
    entries = await globEntries('**/*.html', config)
}
```

以上没有配置任务自定义入口时,将会抓取以`root`为根目录的`.html`文件


## 检查确定后的入口文件

```js
const JS_TYPES_RE = /\.(?:j|t)sx?$|\.mjs$/
const htmlTypesRE = /\.(html|vue|svelte)$/
  // Non-supported entry file types and virtual files should not be scanned for
  // dependencies.
  entries = entries.filter(
    (entry) =>
      (JS_TYPES_RE.test(entry) || htmlTypesRE.test(entry)) &&
      fs.existsSync(entry)
  )
```

在描入口之前, 需要对扫描的入口进行检可扫描性, 需要以下两点, 否则将不合法的入口地址过滤。

1. 允许扫描文件类型
  * `.js`
  * `.tsx`
  * `.jsx`
  * `.mjs`
  * `.html`
  * `.vue`
  * `.svelte`

2. 文件存在

```js
if (!entries.length) {
    return { deps: {}, missing: {} }
}
```

如果没有确定任何扫描入口, 即`entries`没有数组长度, `deps` 依赖和 `missing` 依赖缺失都以空对象返回

