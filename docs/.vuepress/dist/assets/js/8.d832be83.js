(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{371:function(s,t,a){"use strict";a.r(t);var e=a(45),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"文档介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文档介绍"}},[s._v("#")]),s._v(" 文档介绍")]),s._v(" "),a("p",[s._v('如果没有找到相应的缓存，Vite 将抓取你的源码，并自动寻找引入的依赖项（即 "bare import"，表示期望从 node_modules 解析），并将这些依赖项作为预构建包的入口点。预构建通过 esbuild 执行，所以它通常非常快。')]),s._v(" "),a("p",[s._v("在服务器已经启动之后，如果遇到一个新的依赖关系导入，而这个依赖关系还没有在缓存中，Vite 将重新运行依赖构建进程并重新加载页面。")]),s._v(" "),a("blockquote",[a("p",[s._v("理解文档函意。")])]),s._v(" "),a("ol",[a("li",[s._v("vite 预构建会构建项目中构建node_modules包中的内容")]),s._v(" "),a("li",[s._v("通过esbuild打包的方式, 写入打包入口, 打包中通过esbuild插件抓取相关引入包来收集依赖。")])]),s._v(" "),a("h2",{attrs:{id:"扫描器入口函数scanimports"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#扫描器入口函数scanimports"}},[s._v("#")]),s._v(" 扫描器入口函数scanImports")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" deps"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Record"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" string"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" missing"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Record"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" string"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("newDeps"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" deps"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" missing "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("await")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scanImports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    deps "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" newDeps\n    missing "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[a("code",[s._v("scanImports")]),s._v(" 是扫描器入口, 从这里正式开启扫描。")]),s._v(" "),a("blockquote",[a("p",[s._v("deps, missing 变量理解")])]),s._v(" "),a("p",[a("code",[s._v("deps")]),s._v("变量扫描后需要预构建的依赖,同时在"),a("code",[s._v("node_modules")]),s._v("中寻找到了。\n"),a("code",[s._v("missing")]),s._v("变量存放的扫描后的依赖但是并没在"),a("code",[s._v("node_modules")]),s._v("中寻找到。")]),s._v(" "),a("blockquote",[a("p",[s._v("newDeps 参数理解")])]),s._v(" "),a("p",[a("code",[s._v("newDeps")]),s._v("是"),a("code",[s._v("optimizeDeps")]),s._v("构建入口方法传入的参数,如果存在"),a("code",[s._v("newDeps")]),s._v("说明是在服务器启动后,加载新的资源时,遇到一个新的依赖关系时, 此时这个依赖关系并没有被启动前扫描到,将会再次调用"),a("code",[s._v("optimizeDeps")]),s._v("传入 "),a("strong",[s._v("(最终的依赖关系 => 已知的依赖和新的依赖)")])]),s._v(" "),a("p",[s._v("所以当没有"),a("code",[s._v("newDeps")]),s._v("时, 将进行依赖扫描, 得"),a("code",[s._v("deps")]),s._v(" 和 "),a("code",[s._v("missing")])]),s._v(" "),a("h2",{attrs:{id:"扫描流程图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#扫描流程图"}},[s._v("#")]),s._v(" 扫描流程图")])])}),[],!1,null,null,null);t.default=n.exports}}]);