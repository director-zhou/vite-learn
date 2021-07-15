(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{368:function(t,s,a){"use strict";a.r(s);var n=a(23),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"为了解决-commonjs-和-umd-兼容性问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为了解决-commonjs-和-umd-兼容性问题"}},[t._v("#")]),t._v(" 为了解决 CommonJS 和 UMD 兼容性问题")]),t._v(" "),a("p",[a("strong",[t._v("CommonJS")]),t._v(" 和 "),a("strong",[t._v("UMD")]),t._v(" 兼容性: 开发阶段中，"),a("strong",[t._v("Vite")]),t._v(" 的开发服务器将所有代码视为原生 "),a("strong",[t._v("ES")]),t._v(" 模块。因此 "),a("strong",[t._v("Vite")]),t._v(" 必须先将作为 "),a("strong",[t._v("CommonJS")]),t._v(" 或 "),a("strong",[t._v("UMD")]),t._v(" 发布的依赖项转换为 "),a("strong",[t._v("ESM")]),t._v("。")]),t._v(" "),a("h2",{attrs:{id:"什么是-esm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是-esm"}},[t._v("#")]),t._v(" 什么是 ESM")]),t._v(" "),a("p",[a("strong",[t._v("ES-Module")]),t._v(" 简称为 "),a("strong",[t._v("ESM")]),t._v(", "),a("strong",[t._v("ESM")]),t._v(" 是浏览器原生支持模块功能, 浏览器能够最优化的方式加载模块，使它比使用库更有效率, 使用库通常需要做额外的客户端处理。")]),t._v(" "),a("h3",{attrs:{id:"利用浏览器esm加载方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#利用浏览器esm加载方式"}},[t._v("#")]),t._v(" 利用浏览器ESM加载方式")]),t._v(" "),a("p",[a("strong",[t._v("ESM")]),t._v(" 加载的方式与通常的 "),a("code",[t._v("<script>")]),t._v(" 加载的机制一样, 但唯一的区别在于需要 "),a("code",[t._v("<script>")]),t._v(" 起始标签加一个 "),a("code",[t._v('type="module"')]),t._v(" 的属性, 这样就可以通过 "),a("code",[t._v("import")]),t._v(" 和 "),a("code",[t._v("export")]),t._v(" 这两个关健字进行模块化导入导出的管理。")]),t._v(" "),a("h3",{attrs:{id:"错误加载示例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#错误加载示例"}},[t._v("#")]),t._v(" 错误加载示例")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" HelloWorld "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./index.js'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"custom-block-title"},[t._v("错误提示")]),t._v(" "),a("p",[t._v("Uncaught SyntaxError: Cannot use import statement outside a module")]),t._v(" "),a("p",[a("code",[t._v("import")]),t._v(" 和 "),a("code",[t._v("export")]),t._v(" 方式进行模块化方式导入与导出需要在 "),a("code",[t._v("<script>")]),t._v(" 标签加上 "),a("code",[t._v('type="module"')])])]),t._v(" "),a("h2",{attrs:{id:"什么是commonjs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是commonjs"}},[t._v("#")]),t._v(" 什么是CommonJS")]),t._v(" "),a("p",[a("strong",[t._v("CommonJS")]),t._v(" 简称为 "),a("strong",[t._v("CJS")]),t._v("。")]),t._v(" "),a("p",[a("strong",[t._v("CommonJS")]),t._v(" 也是一种模块的形式, 其特性为: 核心思想是通过 "),a("code",[t._v("require")]),t._v(" 方法来同步加载依赖的其他模块, 通过 "),a("code",[t._v("module.exports")]),t._v(" 导出需要暴露的代码模块。")]),t._v(" "),a("p",[a("strong",[t._v("CommonJS")]),t._v(" 大多数用于 "),a("code",[t._v("Node.js")]),t._v(" 环境下, 大多数 "),a("code",[t._v("NPM")]),t._v(" 第三方模块采用了 "),a("code",[t._v("CommonJS")]),t._v(" 规范, 但是这样的导入导出的方式无法运行在浏览器环境下。")]),t._v(" "),a("h3",{attrs:{id:"浏览器环境下使用-import-语法导入-commonjs-格式的模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器环境下使用-import-语法导入-commonjs-格式的模块"}},[t._v("#")]),t._v(" 浏览器环境下使用 "),a("code",[t._v("import")]),t._v(" 语法导入 "),a("code",[t._v("CommonJS")]),t._v(" 格式的模块")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"module"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" HelloWrold "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./index.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"custom-block-title"},[t._v("错误提示")]),t._v(" "),a("p",[t._v("Uncaught ReferenceError: require is not defined")]),t._v(" "),a("p",[t._v("没有定义 "),a("code",[t._v("require")]),t._v(", 浏览器并没有全局实现 "),a("code",[t._v("require")]),t._v(" 方法, 不支持此方法.")])]),t._v(" "),a("h2",{attrs:{id:"什么是umd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是umd"}},[t._v("#")]),t._v(" 什么是UMD")]),t._v(" "),a("p",[t._v("由于 "),a("strong",[t._v("CommonJS")]),t._v(" 和 "),a("strong",[t._v("AMD")]),t._v(" 风格都同样流行，似乎还没有达成共识。这带来了对支持两种风格的"),a("code",[t._v("通用")]),t._v("模式的推动，这让我们想到了通用模块定义。")]),t._v(" "),a("p",[t._v("诚然，该模式很丑陋，但与 "),a("strong",[t._v("AMD")]),t._v(" 和 "),a("strong",[t._v("CommonJS")]),t._v(" 兼容，并且支持旧式的"),a("code",[t._v("全局")]),t._v("变量定义。")]),t._v(" "),a("h3",{attrs:{id:"浏览器环境下使用-import-语法导入-umd-格式模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器环境下使用-import-语法导入-umd-格式模块"}},[t._v("#")]),t._v(" 浏览器环境下使用 "),a("code",[t._v("import")]),t._v(" 语法导入 "),a("code",[t._v("UMD")]),t._v(" 格式模块")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// index.js")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("root"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" factory")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" define "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'function'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" define"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("amd"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// AMD")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("define")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jquery'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'underscore'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" factory"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'object'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Node, CommonJS之类的")]),t._v("\n        module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("factory")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jquery'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'underscore'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 浏览器全局变量(root 即 window)")]),t._v("\n        root"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("returnExports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("factory")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("root"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jQuery"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" root"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("$"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" _")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//    方法")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//    私有方法，因为它没被返回 (见下面)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//    公共方法，因为被返回了")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("c")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//    公共方法，因为被返回了")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//    暴露公共方法")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        b"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        c"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" c\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"module"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" HelloWrold "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./index.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"custom-block-title"},[t._v("错误提示")]),t._v(" "),a("p",[t._v("Uncaught SyntaxError: The requested module './index.js?v=43ffb0a3' does not provide an export named 'default'")]),t._v(" "),a("p",[t._v("提示报错:")]),t._v(" "),a("p",[a("code",[t._v("index.js")]),t._v(" 文件是一个"),a("code",[t._v("umd")]),t._v(" 格式模块， 通过"),a("code",[t._v("import")]),t._v("的语法进行在浏览器导入, 则会提示没有提供默认的导出名称。")])]),t._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("p",[t._v("以上三种方式可以得出只有通过 "),a("code",[t._v('<script type="module"><\/script>')]),t._v(" 方式引入, 并且要符合 "),a("strong",[t._v("ESM")]),t._v(" 的导入导出规范, 浏览器才会符合预期效果进行模块加载, 其余的 "),a("strong",[t._v("CommonJS")]),t._v(" 规范还是 "),a("strong",[t._v("UMD")]),t._v(" 规范, 浏览器都不能进行识别，对于UMD 而言可以通过 "),a("code",[t._v("<script src>")]),t._v(" 引入的方式可以达到全局变量预期。")]),t._v(" "),a("p",[t._v("所以 "),a("strong",[t._v("Vite")]),t._v(" 进行对模块的预构建也是同样的道理, 市面上的 "),a("strong",[t._v("NPM")]),t._v(" 三方模块包大多数都是 "),a("strong",[t._v("CommonJS")]),t._v(" 和 "),a("strong",[t._v("UMD")]),t._v(" 的规范, 为了让所有 "),a("strong",[t._v("NPM")]),t._v(" 模块包在浏览器下使用 "),a("strong",[t._v("ESM")]),t._v(" 的语法进行导入, 通过预构建的方式把 "),a("strong",[t._v("CommonJS")]),t._v(" 和 "),a("strong",[t._v("UMD")]),t._v(" 的模块包转化为 "),a("strong",[t._v("ESM")]),t._v(" 的导出的模式, 这样浏览器就可以使用 "),a("strong",[t._v("ESM")]),t._v(" 的模块加载机制。")])])}),[],!1,null,null,null);s.default=r.exports}}]);