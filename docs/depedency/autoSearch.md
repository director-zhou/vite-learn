## 文档介绍

如果没有找到相应的缓存，Vite 将抓取你的源码，并自动寻找引入的依赖项（即 "bare import"，表示期望从 node_modules 解析），并将这些依赖项作为预构建包的入口点。预构建通过 esbuild 执行，所以它通常非常快。

在服务器已经启动之后，如果遇到一个新的依赖关系导入，而这个依赖关系还没有在缓存中，Vite 将重新运行依赖构建进程并重新加载页面。


> 理解文档函意。

1. vite 预构建会构建项目中构建node_modules包中的内容
2. 通过esbuild打包的方式, 写入打包入口, 打包中通过esbuild插件抓取相关引入包来收集依赖。


## 扫描器入口函数scanImports

```js
  let deps: Record<string, string>, missing: Record<string, string>
  if (!newDeps) {
    ;({ deps, missing } = await scanImports(config))
  } else {
    deps = newDeps
    missing = {}
  }
```

`scanImports` 是扫描器入口, 从这里正式开启扫描。

> deps, missing 变量理解

`deps`变量扫描后需要预构建的依赖,同时在`node_modules`中寻找到了。
`missing`变量存放的扫描后的依赖但是并没在`node_modules`中寻找到。

> newDeps 参数理解

`newDeps`是`optimizeDeps`构建入口方法传入的参数,如果存在`newDeps`说明是在服务器启动后,加载新的资源时,遇到一个新的依赖关系时, 此时这个依赖关系并没有被启动前扫描到,将会再次调用`optimizeDeps`传入 **(最终的依赖关系 => 已知的依赖和新的依赖)**

所以当没有`newDeps`时, 将进行依赖扫描, 得`deps` 和 `missing`


## 扫描流程图