## 启动入口html写法

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
</body>
<script src="/src/main2.js"></script>
<script>
  let a = 1
  console.log(a)
</script>
<script type="module" src="/src/main.js"></script>
<script type="module">
  import dayjs from 'dayjs'
  console.log(dayjs)
</script>
</html>
```

在工程启动的时候, [确定了扫描入口文件](/depedency/确定扫描入口文件.html#scanimports-函数), 默认扫描入口 `entries` 则为根目录下的 `index.html` 文件, 对于`html`文件通常我们会有以下几引入脚本的写法:

1. `script` 元素既可以包含脚本语言，
2. 也可以通过 `src` 属性指向外部脚本文件。
3. 通过 `type` 属性规定脚本的 `MIME` 类型。

## `.html`后缀文件的构建问题

在 **esbuild** 中 `enteryPoint` 入口的路径是一个绝对路径的 `.html` 后缀文件。但是对于构建工具 **esbuild** 来说，不会识别 `.html` 路径的文件, 不支持此类型文件的构建, 如果不进行解析转换将会遇到以下的错误信息。

::: danger 错误提示
```js

 > error: No loader is configured for ".html" files: index.html

error when starting dev server:
Error: Build failed with 1 error:
error: No loader is configured for ".html" files: index.html
```
:::


之所以使用插件, 在整个构建扫描期间，只需要知道整个构建导入的关系链，而不是真正的构建, 所以只要提需取到 `.html` 中脚本内容和引入的脚本路径，就可以顺藤摸瓜继续向下寻找导入折关系链。

## `onResolve` 确定路径

```js
const htmlTypesRE = /\.(html|vue|svelte)$/
build.onResolve({ filter: htmlTypesRE }, async ({ path, importer }) => {
  return {
    path: await resolve(path, importer),
    namespace: 'html'
  }
})
```

当遇到`.html`文件时，将会被以上代码进行`filter`拦截, 通过调用`resolve`方法返回 `html` 的绝对路径，同时返回给`esbuild`进行路径解析
同时还需要返回对象中设置`namespace: 'html'`, 在`esbuild`插件中介绍过, 如果不是`esbuild`能够识别的文件, 但是想继续进行`onload`进行转换的同时, 需要打上`namespace`的标签，进行暂存, 这样`esbuild`暂时还是会认为它是一个有效的构建文件。



## onLoad 提取脚本内容, 并将其视为js模块

在转换层将被 `{ filter: htmlTypesRE, namespace: 'html' }`, 过滤条件拦截转换后交给`esbuild`进行继续处理

> 获取html文本内容

```js
let raw = fs.readFileSync(path, 'utf-8')
```

`path`则是`onResolve`解析后传入的绝对路径, 直接通过`fs.readFileSync`获取的`html`文本内容

> 替换注释节点
```js
export const commentRE = /<!--(.|[\r\n])*?-->/
raw = raw.replace(commentRE, '<!---->')
```
通过`replace`方法把注释部分进行替换


> 确定匹配方式

```js
const scriptModuleRE =
  /(<script\b[^>]*type\s*=\s*(?:"module"|'module')[^>]*>)(.*?)<\/script>/gims
const isHtml = path.endsWith('.html')
const regex = isHtml ? scriptModuleRE : scriptRE
regex.lastIndex = 0
let js = ''
let loader: Loader = 'js'
```

变量 `isHTML` 确定是否是 `.html` 文件结尾, 因为`.vue` `.svelte`后缀路径也会被拦截, 这里先理解`.html`路径的解析
变量 `regex` 确定匹配的正则条件, 如果是`.html`路径使用`scriptModuleRE`正则

> **regex.lastIndex**理解:

`RegExpObject` 的 `lastIndex` 属性指定的字符处开始检索字符串 `string`。当 `exec()` 找到了与表达式相匹配的文本时，在匹配后，它将把 `RegExpObject` 的 `lastIndex` 属性设置为匹配文本的最后一个字符的下一个位置。

声明 `js` 变量, 存放提取或者转换的脚本内容

声明 `loader` 变量, 告诉 `esbuild` 构建时视为什么类型的文件进行构建。

> 通过正则匹配获取脚本内容

```js
const srcRE = /\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s'">]+))/im
while ((match = regex.exec(raw))) {
  const [, openTag, content] = match
  const srcMatch = openTag.match(srcRE)
  if (srcMatch) {
    const src = srcMatch[1] || srcMatch[2] || srcMatch[3]
    js += `import ${JSON.stringify(src)}\n`
  } else if (content.trim()) {
    js += content + '\n'
  }
}
```

利用 `while` 循环通过 `exec` 检索字符串中的正则表达式的匹配, 因为在 `html` 中会有好多处 `script` 元素


变量 `openTag` 为正则表达式开标签的匹配结果, 只有 `type` 为 `module` 才会有匹配结果

```js
<script type="module" src="/src/main.js"></script> => <script type="module" src="/src/main.js">
<script type="module">
  import dayjs from 'dayjs'     =>    <script type="module">
  console.log(dayjs)
</script>     
```

变量 `srcMatch` 提取外部脚本 `src` 路径, 如果有 `srcMatch`, 则转换成`import`的引入方式存放在 `js` 变量中

```js
 <script type="module" src="/src/main.js">  =>  import '/src/main.js'
```

变量 `content` 为非外部引入的脚本，同时添加到 `js` 变量中

```js
<script type="module">
  import dayjs from 'dayjs'     =>   import dayjs from 'dayjs'
  console.log(dayjs)                 console.log(dayjs)    
</script> 
```

检测没有 `export default`, 则添加 `export default {}`, 形成一个完整的 `esm` 的模块方式

```js
if (!js.includes(`export default`)) {
  js += `\nexport default {}`
}
```

> 导出转换后的代码

```js
return {
  loader,
  contents: js
}
```

1. **loader** 告诉 `esbuild` 当作什么类型的文件进行处理
2. **contents** 告诉 `esbuild` 文件处理的内容代码

> 转换演示

转换前:

```js
<script type="module" src="/src/main.js"></script>
<script type="module">
  import dayjs from 'dayjs'
  console.log(dayjs)
</script>
```

转换后:

```js
import "/src/main.js"
import dayjs from 'dayjs'
console.log(dayjs)
export default {}
```

