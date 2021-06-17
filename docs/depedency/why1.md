
## （一） 为了解决 CommonJS 和 UMD 兼容性问题

**CommonJS** 和 **UMD** 兼容性: 开发阶段中，**Vite** 的开发服务器将所有代码视为原生 **ES** 模块。因此，**Vite** 必须先将作为 **CommonJS** 或 **UMD** 发布的依赖项转换为 **ESM**。

## 什么是 ESM

**ES-Module** 简称为 **ESM**, **ESM** 是浏览器原生支持模块功能, 浏览器能够最优化加载模块，使它比使用库更有效率：使用库通常需要做额外的客户端处理。
> 使用方式

使用的方式与通常的`<script>`加载的机制一样, 但唯一的区别在于需在`<script>`起始标签加一个`type="module"`的属性, 这样就可以通过 `import`和 `export`这两个关健字进行模块化导入导出的管理。

> 错误引入方式

```js
<script>
  import HelloWorld from './index.js'
</script>
```

:::warning
Uncaught SyntaxError: Cannot use import statement outside a module

提示报错:

想用import 和 export 方式进行模块化方式导入与导出需要在`<script>`标签加上 `type="module`
:::


## 什么是CommonJS

**CommonJS** 简称为 **CJS**

**CommonJS** 也是一种模块的形式, 其特性为: 核心思想是通过`require`方法来同步加载依赖的其他模块, 通过`module.exports`导出需要暴露的接口。

**CommonJS** 大多数用于Node.js环境下, 大多数`Npm`第三方模块采用了`CommonJS`规范, 但是这样的引入导出方式无法运行在浏览器环境下。


> 尝试在浏览器环境下引入CommonJS

```js
<script type="module">
  const HelloWrold = require('./index.js')
</script>
```

:::warning
Uncaught ReferenceError: require is not defined

提示报错:

没有定义`require`, 浏览器并没有`require`方法, 所以不支持此方法
:::

## 什么是UMD

由于 **CommonJS** 和 **AMD** 风格都同样流行，似乎还没有达成共识。这带来了对支持两种风格的`通用`模式的推动，这让我们想到了通用模块定义。

诚然，该模式很丑陋，但与 **AMD** 和 **CommonJS** 兼容，并且支持旧式的`全局`变量定义。

> 尝试在浏览器环境下引入umd

```js
<script type="module">
  import dayjs from './node_modules/dayjs/dayjs.min.js'
</script>
```

::: warning
Uncaught SyntaxError: The requested module '/node_modules/dayjs/dayjs.min.js?v=43ffb0a3' does not provide an export named 'default'

提示报错:

`node_modules`包中的`dayjs`是一个`umd`格式的包，通过`import`的方式进行在浏览器引入, 则会提示没有提供默认的导出名称
:::

## 总结

以上三种方式，可以得出只有通过`<script type="module"></script>`方式引入, 并且要符合 **ESM** 的导入导出规范, 浏览器才会符合预期效果进行模块加载, 其余的 **CommonJS** 规范还是 **UMD** 规范, 浏览器都不能进行识别。

所以 **Vite** 进行对模块的预构建也是同样的道理, 市面上的 **NPM** 包大多数都是 **CommonJS** 和 **UMD** 的模块, 为了能很好的使用市场的 **NPM**包, 通过预构建把 **CommonJS** 和 **UMD** 的包转化为 **ESM** 的导入导出方式, 这样浏览器就可以进行模块加载。