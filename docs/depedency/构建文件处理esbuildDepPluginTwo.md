在构建文件处理(一)的部分中, 已经对入口文件和入口文件中的引入模块的方式进行了过滤和分配了虚拟空间待构建时对文件的内容通过`onLoad`进行处理。

## `onLoad` 转换入口文件,生成入口代理模块

对于入口文件，将进行读取并构造一个代理模块，因为实际模块可能会通过相对导入引用-如果我们不分离代理和实际的模块, `esbuild`将创建相同的副本模块！

所有依赖的入口模块都被`onResolve`分配到`dep`命名空间中，处量时将会调用onLoad进行模块代理,模块代理的原理就是将原本的入口模块中所有的内容导出方式，能将在外代理一层，在代理模块中引入原本入口文件，再将原本的入口文件进行导出进行构建。

形成示例:

```js
原本入口模块的模块:

import a from './a.js'
function demo() {
  console.log('helloWorld)
}
export { a }
export default demo
```

```js
代理模块的改造
import d from '代理模块地址'
export * from '代理模块地址'
export default d
```

由此代理模块变成了入口模块。

```js
build.onLoad({ filter: /.*/, namespace: 'dep' }, ({ path: id }) => {})
```

`onLoad`拦截`namespance`为`dep`的虚拟模块的所有的文件, 这里将会拦截所有入口文件进行生成代理改造。

> 生成相对路径

```js
const root = path.resolve(config.root)
const entryFile = qualified[id]
let relativePath = normalizePath(path.relative(root, entryFile))
if (!relativePath.startsWith('.')) {
  relativePath = `./${relativePath}`
}
```

路径相对于`root`, 这里通过设置`resolveDir`可以知道代码模块中的引入的入口文件来源于文件那里。这样`esbuild`就可以正确的寻找到
声明`root`变量, 则为`vite.config`配置的值。否就是`process.cwd()`
声明`entry`变量，通过已收集展示化后的依赖通过`id`进行寻找，此时的`id`是进行展后化后过的，在`onResolve`并没有返回绝对路径,返回则是原始`id`
声明`relativePath`变量，则为代理模块引入入口文件时的模块名称(路径名称) `import XXX from 'XXX'`, 通过`path.relative`基于`root`和`entryFile`得出相对的路径。
此时得出的相对路径会缺少`./`,需要加上`./`形成一个完整合法的相对路径

### 获取构建前准备内容

```js
let contents = ''
const data = exportsData[id]
const [imports, exports] = data
```

声明`content`变量，用来存放代理模块转化后的内容
声明`data`变量,`exportsData`对象存放着每个入口文件中解析后的基于`es-module-lexer`词法分析后的内容
通过`data`可以获得`import`部分的描述，和`exports`的描述


### 输出`cjs`代理内容

```js
if (!imports.length && !exports.length) {
  // cjs
  contents += `export default require("${relativePath}");`
}
```

如果没有imports并也没有exports说明肯定不是esm的写法,必然是cjs或者umd的写法,直接通过export default require(相对路径)

### 输出`esm`代理内容

```js
if (exports.includes('default')) {
  contents += `import d from "${relativePath}";export default d;`
}
if (
  data.hasReExports ||
  exports.length > 1 ||
  exports[0] !== 'default'
) {
  contents += `\nexport * from "${relativePath}"`
}
```

`esm`的编写方式，同时可以单个导出，也可以进行多个进行导出
如果存在单个导出，`exports`词法解析中就会存在`deafult`值,在代码模块中写导入入口文件，同时再进行导出，让`esbuild`进行构建
检测是入口文件中是有多个导出的内容, 可以有几下三种情况都会存在有多个导出方式

1. `export { a } from 'XXX'` 这种方法在`import`词在分析的数组上添加`hasReExports`为`true`
2. `exports`部分只要长度大于`1`, 也证明有导出内容，为什么要大于`1`，因为只是单纯的`export default`, `exports`分内容中会存在`default`值
3. 如果存在多个导出内容，同时第一项不是`default`, 说明肯定有多个导出的存在。

存在的情况下，在代码模块中使用`export * from '相对路径的入口模块'`, 这样就可以把入口模块中的所有多模块导出的全导入进代理模块中


### 返回结果

```js
let ext = path.extname(entryFile).slice(1)
if (ext === 'mjs') ext = 'js'
return {
  loader: ext as Loader,
  contents,
  resolveDir: root
}
```

返回时在对象中传传三个属性:

1. `loader` 返回的解析文件类型, 通过`path.extname`拿到入口文件的后缀类型，如果是`.mjs`则当作`.js`
2. `content` 是代码模块的内容
3. `resolveDir`是必传的, 对于代理模块而言，里面的文件的相对路径，`esbuild`是不知道的基于那个位置相对寻找,正因`relativePath`是为`root`相对获得的，所以`resolveDir`则使用`root`,这个可以确保`esbuild`可以正确的找到此文件。


## onLoad 转换不存在的模块

不在的模在解析的时候会被`onResolved`分配到`browser-external`虚拟命名空间中。此时会被以下`onLoad`进行拦截

```js
build.onLoad(
  { filter: /.*/, namespace: 'browser-external' },
  ({ path: id }) => {)
```

拦截条件为`namespace`为`browser-external`的所有文件。

```js
return {
contents:
  `export default new Proxy({}, {
  get() {
  throw new Error('Module "${id}" has been externalized for ` +
    `browser compatibility and cannot be accessed in client code.')
  }
})`
}
```

返回一个代理对象, 如果调用代理对象任何属于，将进行提示模块`ID`已外部化以实现浏览器兼容性，无法在客户端代码中访问.









