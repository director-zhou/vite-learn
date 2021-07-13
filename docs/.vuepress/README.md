
这个需要理解一下
absWorkingDir: process.cwd(),  https://github.com/vitejs/vite/pull/4001

为什么要flatId， 生成文件的结果如果是带/就会有问题
这个需要讲解一下，
main.js 通地 /user/ 绝对路径引入预构建不了,只能pre-bundle

再次预构建 的内容可能是写代码的时候手动加入的

加一个Missing的格式


