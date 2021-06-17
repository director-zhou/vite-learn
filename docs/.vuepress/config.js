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
          ['/depedency/why1', "为什么vite需要预构建(一)"],
          ['/depedency/why2', "为什么vite需要预构建(二)"]
        ]
      }
    ]
  }
}