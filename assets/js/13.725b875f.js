(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{371:function(t,s,a){"use strict";a.r(s);var n=a(23),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"依赖变量声明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#依赖变量声明"}},[t._v("#")]),t._v(" 依赖变量声明")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" deps"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Record"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" string"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" missing"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Record"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" string"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("在扫描入口之前声明"),a("code",[t._v("需要收集的构建依赖模块")]),t._v("和"),a("code",[t._v("需要收集的构建依赖缺失模块")]),t._v("两个变量。")]),t._v(" "),a("h2",{attrs:{id:"生成插件容器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成插件容器"}},[t._v("#")]),t._v(" 生成插件容器")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" container "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createPluginContainer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("在 "),a("code",[t._v("Vite")]),t._v(" 启动时, 会形成内置插件, 同时也会有自定义插件, 所有的插件都将由插件容器进行调用。在扫描时, 用到了 "),a("code",[t._v("resolveId")]),t._v(" 插件 "),a("code",[t._v("api")]),t._v(", 对导入的模块进行构建依赖收集时, 需要被收集的构建依赖将会被进行入口文件路径解析。")]),t._v(" "),a("h2",{attrs:{id:"esbuild插件-负责收集依赖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#esbuild插件-负责收集依赖"}},[t._v("#")]),t._v(" esbuild插件(负责收集依赖)")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" plugin "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("esbuildScanPlugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" container"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" deps"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" missing"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" entries"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[a("strong",[t._v("esbuild")]),t._v(" 是一个构建工具，它只针对入口进行构建, 并不会进行依赖收集。但是"),a("code",[t._v("esbuild")]),t._v("提供了插件功能, 在构建的时候, "),a("code",[t._v("esbuild")]),t._v(" 可以\b扫描出整个"),a("code",[t._v("图谱模块与块")]),t._v("引用关系, 通过分析导入的模块, 对非正常可解析文件 "),a("strong",[t._v("(比如.html .vue)")]),t._v(" 结尾的文件进行脚本提取, 同时收集需要构建的依赖。")]),t._v(" "),a("h2",{attrs:{id:"通过-esbuild-build-进行-假构建-扫描收集依赖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#通过-esbuild-build-进行-假构建-扫描收集依赖"}},[t._v("#")]),t._v(" 通过 "),a("strong",[t._v("esbuild")]),t._v(" "),a("code",[t._v("build")]),t._v(" 进行 "),a("code",[t._v("假构建")]),t._v(" 扫描收集依赖")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" Promise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("all")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    entries"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("entry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        write"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        entryPoints"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("entry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        bundle"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        format"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'esm'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        logLevel"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'error'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        plugins"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" plugin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("esbuildOptions\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("当收集完需要解析入口之后, 将入口进行一一扫描 "),a("code",[t._v("=>")]),t._v(" (可以理解为通过 "),a("code",[t._v("esbuild")]),t._v(" 进行构建，但是实际上只利用构建过程的寻找导入关系链抓到每个导入的模块，判断是我符合收集成为构建依赖)")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("write")]),t._v(" 正是设置为 "),a("code",[t._v("false")]),t._v(" 这里只收集依赖, 并不会产生构建打包文件。")]),t._v(" "),a("li",[a("code",[t._v("entryPoints")]),t._v(" 需要扫描文件的入口地址, 以数组的方式写入单个或多个。")]),t._v(" "),a("li",[a("code",[t._v("bundle")]),t._v(" 不设置"),a("code",[t._v("bundle")]),t._v("的情况下, 打包的入口文件如果有导入的文件, 并不会进行解析, 需要手动进行设置为"),a("code",[t._v("true")]),t._v(", 才会进行递归的方式进行深入解析。")]),t._v(" "),a("li",[a("code",[t._v("format")]),t._v(" 构建转换成什么格式。")]),t._v(" "),a("li",[a("code",[t._v("logLevel")]),t._v(" 报错提示等级。")]),t._v(" "),a("li",[a("code",[t._v("plugins")]),t._v(" 表示插件, 正是通过编写 "),a("code",[t._v("esbuildScanPlugin")]),t._v(" 函数进行收集依赖。")])]),t._v(" "),a("h2",{attrs:{id:"自定义扫描过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自定义扫描过程"}},[t._v("#")]),t._v(" 自定义扫描过程")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" plugins "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("esbuildOptions "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("\nconfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("optimizeDeps"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("esbuildOptions "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("??")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("在文档中并没有 "),a("code",[t._v("optimizeDeps.esbuildOptions")]),t._v(" 的用法。在扫描的时候对导入的模块进行额外处理, 我们可以通过 "),a("code",[t._v("esbuild")]),t._v(" 插件功能实现额外的收集依赖拓展, 大部分功能在内部的扫描器插件中已经实现。同时还可以覆盖扫描的配置。")])])}),[],!1,null,null,null);s.default=e.exports}}]);