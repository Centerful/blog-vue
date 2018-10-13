memo: 将项目中的固定图片资源放在src/assets/img目录下.

1.组件style样式清理一下,过时无用的样式删掉.重复的样式合并一下,公共样式抽取到单独的css文件中.保持各个组件style的作用域为scoped.

2.css -> scss.

3.编写edit.vue

4.编写login.vue,register.vue.

5.api.js扩展为使用fetch,async函数,await同步修饰符,promise对象的ajax请求,真实的请求后端服务器json数据.->是否需要nginx代理?

6.页面基础元素使用material design风格.

7.编写vue-waves插件,使用现成的waves.js库,封装成vue插件.参考github上vue-waves的项目[https://github.com/Teddy-Zhu/vue-waves]

8.了解下 vm.$on,$emit,$dis...