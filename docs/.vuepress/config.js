module.exports = {
  title: 'Vite 源码学习',
  description: '',
  base: "/vite-learn/",
  plugins: [
    require('../plugins/join/index.js')
  ],
  themeConfig: {
    nav:[ // 导航栏配置
      {text: 'GitHub', link: '//github.com/director-zhou/vite-learn/', target:'_blank' }      
    ],
    sidebar: [
      {
        title: '依赖预构建',
        collapsable: true,
        children: [
          ['/depedency/为什么需要预构建一', "为什么需要预构建(一)"],
          ['/depedency/为什么需要预构建二', "为什么需要预构建(二)"],
          ['/depedency/预构建触发时机', "预构建触发时机"],
          ['/depedency/预构建执行逻辑', "预构建执行逻辑"],
          ['/depedency/预构建核心方法optimizeDeps', "预构建核心方法optimizeDeps"],
          ['/depedency/构建准备', "构建准备"],
          ['/depedency/自动依赖搜寻', "自动依赖搜寻"],
          ['/depedency/确定扫描入口文件', "确定扫描入口文件"],
          ['/depedency/如何执行扫描', "如何执行扫描"],
          ['/depedency/esbuild插件基础介绍', "esbuild插件基础介绍"],
          ['/depedency/收集依赖插件esbuildScanPlugin', "收集依赖插件esbuildScanPlugin"],
          ['/depedency/HTML入口扫描', "HTML入口扫描"],
          ['/depedency/导入路径扫描', "导入路径扫描"],
          ['/depedency/收集依赖', "收集依赖"],
          ['/depedency/利用并完善依赖', "利用并完善依赖"],
          ['/depedency/构建前准备工作', "构建前准备工作"],
          ['/depedency/构建文件处理esbuildDepPluginOne', "构建文件处理esbuildDepPlugin(一)"],
          ['/depedency/构建文件处理esbuildDepPluginTwo', "构建文件处理esbuildDepPlugin(二)"],
          ['/depedency/生成依赖元信息完成构建', "生成依赖元信息完成构建"]
        ]
      }
    ]
  }
}