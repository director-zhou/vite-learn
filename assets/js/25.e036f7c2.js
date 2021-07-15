(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{383:function(s,t,a){"use strict";a.r(t);var e=a(23),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"optimizedeps方法参数以及返回值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#optimizedeps方法参数以及返回值"}},[s._v("#")]),s._v(" optimizeDeps方法参数以及返回值")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("async")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("optimizeDeps")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n  config"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" ResolvedConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  force "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("force"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  asCommand "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  newDeps"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Record"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" string"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// missing imports encountered after server has started")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Promise"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("DepOptimizationMetadata "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])])]),a("blockquote",[a("p",[s._v("一. 参数")])]),s._v(" "),a("ol",[a("li",[a("code",[s._v("config")]),s._v(" 启动前 "),a("strong",[s._v("Vite")]),s._v(" 整合的 "),a("code",[s._v("config")]),s._v(" 信息，参考配置项 "),a("code",[s._v("API")]),s._v("。")]),s._v(" "),a("li",[a("code",[s._v("force")]),s._v(" 引用 "),a("code",[s._v("server.force")]),s._v(" 中的 "),a("code",[s._v("API")]),s._v(", 设置为 "),a("code",[s._v("true")]),s._v(" 强制使依赖预构建, 每次启动的时候都将删除所有预构建的缓存文件夹，重新进行预构建。")]),s._v(" "),a("li",[a("code",[s._v("asCommand")]),s._v(" 是否是命令行调用，调用 "),a("code",[s._v("optimizeDeps")]),s._v(" 方法有三处，其中有一处是通过命令行进行调用。")]),s._v(" "),a("li",[a("code",[s._v("newDeps")]),s._v(" 会存在两种情况，第一种情况会是 "),a("code",[s._v("undefined")]),s._v(", 在启动调用优化器时, 不会存在新的优化依赖, 第二种情况是一个对象, 会把启动前需要构建的依赖与加载时导入文件缺失的构建依赖进行合并, 扫描器此时并不会再次进行扫描, 只会进行对合并后的依赖进行执行重新构建。")])]),s._v(" "),a("blockquote",[a("p",[s._v("二. 返回值")])]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"hash"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"4dd4ced0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"browserHash"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dfb02c43"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"optimized"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"lodash"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"file"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/Users/admin/zzx/test/node_modules/.vite/lodash.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"src"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/Users/admin/zzx/test/node_modules/lodash/lodash.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"needsInterop"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dayjs"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"file"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/Users/admin/zzx/test/node_modules/.vite/dayjs.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"src"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/Users/admin/zzx/test/node_modules/dayjs/dayjs.min.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"needsInterop"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("ol",[a("li",[a("p",[a("code",[s._v("hash")]),s._v(" 字段的生成是由用户 "),a("code",[s._v("vite.config.js")]),s._v(" 中的配置的某此字段和 "),a("code",[s._v(".lock")]),s._v(" 文件合并生成的 "),a("code",[s._v("8")]),s._v(" 位 "),a("code",[s._v("hash")]),s._v(" 值, "),a("code",[s._v("hash")]),s._v("是否需要变更, 也取决于 "),a("code",[s._v("vite.config.js")]),s._v(" 的配置文件和 "),a("code",[s._v(".lock")]),s._v(" 文件是否变更，有变更将重进行预构建, 因为这些变更对构建内容将产生不符合预期的结果, 否则将跳过预构建，以免不必要重新预构建, 减少启动耗时。")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("browserHash")]),s._v(" 浏览器哈希由主哈希加上其他依赖项决定, 依赖的变量会说明构建内容也会变更，服务器需要通过判断 "),a("code",[s._v("browserHash")]),s._v(" 是告诉浏览器重新加载资源, 而不是 "),a("code",[s._v("304")]),s._v(" 取缓存。")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("optimized")]),s._v(" 构建器优化完的构建映射表, "),a("code",[s._v("file")]),s._v("表示依赖构建存放的目录地址。 "),a("code",[s._v("src")]),s._v(" 表示收集的依赖 "),a("code",[s._v("(npm模块)")]),s._v(" 构建的入口文件。 "),a("code",[s._v("needsInterop")]),s._v(" 是否需要进行加载变异。")])])]),s._v(" "),a("h2",{attrs:{id:"构建大致流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#构建大致流程"}},[s._v("#")]),s._v(" 构建大致流程")]),s._v(" "),a("ol",[a("li",[s._v("判断是否需要进行预构建，对存储文件目录进行处理。")]),s._v(" "),a("li",[s._v("通过扫描器，对入口文件进行扫描, 扫描需要构建的依赖和缺失依赖。")]),s._v(" "),a("li",[s._v("在优化 "),a("code",[s._v("include")]),s._v(" 中找到的依赖与扫描后的依赖进行合并。")]),s._v(" "),a("li",[s._v("提示需要预构建的内容。")]),s._v(" "),a("li",[s._v("对需要构建的依赖通过 "),a("code",[s._v("esBuild")]),s._v(" 进行构建输出到 "),a("code",[s._v("cacheDir")])]),s._v(" "),a("li",[s._v("向 "),a("code",[s._v("cacheDir")]),s._v(" 中 "),a("code",[s._v("_metadata.json")]),s._v(" 写入构建后的元信息。")])]),s._v(" "),a("h2",{attrs:{id:"构建大致流程图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#构建大致流程图"}},[s._v("#")]),s._v(" 构建大致流程图")]),s._v(" "),a("p",[s._v("尽请期待....")])])}),[],!1,null,null,null);t.default=r.exports}}]);