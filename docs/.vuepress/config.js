module.exports = {
  title: 'Vite 源码学习',
  description: '',
  themeConfig: {
    // nav:[ // 导航栏配置
    //   {text: '前端基础', link: '/dependency/' }      
    // ],
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
          ['/depedency/scanImportStart', "开始扫描入口"]
        ]
      }
    ]
  }
}