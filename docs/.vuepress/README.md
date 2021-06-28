# 1112323232

## vite在什么时机触发预构建。
## vite是通过什么方式寻到需要预构建目标的。
## 那些Api和预构建有着关联性。



import 'ant-design-vue/a' 这样里面的内容会加载时预构建
import 'ant-design-vue/a.vue' 这样就不会就会先前被抓到


可以通地@别名进行优化