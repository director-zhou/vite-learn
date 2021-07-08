module.exports = {
  title: 'Vite 源码学习',
  description: '',
  base: "/vite-learn/",
  plugins: [
    require('../plugins/join/index.js')
  ],
  themeConfig: {
    nav:[ // 导航栏配置
      {text: 'GitHub', link: '/https://github.com/director-zhou/vite-learn/', target:'_blank' }      
    ],
    sidebar: [
      {
        title: '依赖预构建',
        collapsable: true,
        children: [
          ['/depedency/why1', "为什么需要预构建(一)"],
          ['/depedency/why2', "为什么需要预构建(二)"],
          ['/depedency/opportunity', "预构建触发时机"],
          ['/depedency/methodCall', "预构建执行机制"],
          ['/depedency/optimizeDeps', "预构建核心方法optimizeDeps"],
          ['/depedency/setup', "构建准备"],
          ['/depedency/autoSearch', "自动依赖搜寻"],
          ['/depedency/scanImportEntry', "确定扫描入口文件"],
          ['/depedency/scanImportStart', "如何执行扫描"],
          ['/depedency/esbuildPluginIntroduce', "esbuild插件基础介绍"],
          ['/depedency/esbuildScanPlugin', "收集依赖插件esbuildScanPlugin"],
          ['/depedency/htmlScan', "HTML入口扫描"],
          ['/depedency/pathResolve', "导入路径扫描"],
          ['/depedency/collectionDependency', "收集依赖"],
          ['/depedency/useAndperfectDeps', "利用并完善依赖"],
          ['/depedency/构建前准备工作', "构建前准备工作"],
          ['/depedency/构建文件处理esbuildDepPluginOne', "构建文件处理esbuildDepPlugin(一)"],
          ['/depedency/构建文件处理esbuildDepPluginTwo', "构建文件处理esbuildDepPlugin(二)"],
          ['/depedency/生成依赖元信息完成构建', "生成依赖元信息完成构建"]
        ]
      }
    ]
  }
}