# Blog-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


```
Project
├── build                     构建脚本目录
│ ├── build.js                生产环境构建（编译打包）脚本
│ ├── check-version.js        检查node、npm等版本
│ ├── dev-client.js           开发服务器热重载脚本，主要用来实现开发阶段页面自动刷新
│ ├── dev-server.js           运行本地开发服务器
│ ├── utils.js                构建相关工具方法，主要用来处理css类文件的loader
│ ├── vue-loader.conf.js      处理vue中的样式
│ ├── vebpack.base.conf.js    webpack基本配置
│ ├── vebpack.dev.conf.js     webpack开发环境配置
│ └── vebpack.prod.conf.js    webpack生产环境配置
│
├── config                    项目配置
│ ├── dev.env.js              开发环境变量
│ ├── index.js                项目配置文件
│ └── prod.env.js             生产环境变量
│
├── dist                      使用生产环境配置构建项目，构建好的目录放到该目录
│ ├── dev.env.js              开发环境变量
│ ├── index.js                项目配置文件
│ ├── prod.env.js             生产环境变量
│ └── test.env.js             测试环境变量
│
├── node_modules              node的依赖包
│
├── src                       项目源码目录
│ ├── api
│ │  └── api.js               接口文件
│ ├── assets                  资源目录，这里的资源会被webpack构建
│ │  ├── css                  第三方css文件，全局css文件
│ │  ├── fonts                字体
│ │  ├── less                 全局less
│ │  ├── sass                 全局sass
│ │  └── images               图片
│ ├── components              组件目录
│ ├── directive               自定义指令
│ ├── http
│ │  └── http.js              接口请求封装
│ ├── libs                    工具箱
│ │  └── util.js              常用工具类
│ ├── locale                  语言配置
│ ├── mock                    mock数据目录
│ ├── views                   页面目录
│ ├── router                  前端路由
│ │ └── index.js
│ ├── vuex                    vuex状态管理
│ │  └── store.js
│ ├── App.vue                 根组件
│ └── main.js                 入口js文件
│
├── static                    纯静态资源，不会被webpack构建
│
├── index.html                入口页面
│
├── .babelrc                  ES6语法编译配置
│
├── .editorconfig             定义代码格式
│
├── .gitignore                git 上传需要忽略的文件
│
├── .postcssrc.js             指定使用的 css 预编译器，默认配置了 autoprefixer
│
├── package.json              项目基本信息
│
└── README.md                 项目介绍
```


#Roadmap(大方向)

- 前端文档
    + [ ] 色彩风格设计稿 -> **遥遥无期**
    + [ ] 网站布局及交互性设计稿(该稿中确定网站布局规范以及组件交互方式) -> **遥遥无期**
    + [x] 页面原型设计稿 -> **使用墨刀软件完成**
    + [x] 技术选型/学习/上手 -> **vue技术栈 + webpack + axios**
    + [ ] 前端功能接口列表

- 前端开发
    + [x] 博客页面
    + [x] 专栏页面
    + [x] Feed页面
    + [ ] 评论组件
    + [x] 登录注册页面
    + [ ] 计划页面 -> **遥遥无期**
    + [ ] 个人主页
    + [ ] admin管理页面 -> **遥遥无期**
    + [ ] 页面动效,ui等
    + [ ] 编写页面其他组件,页面方方面面完善


- 后端文档
    + [ ] 数据库设计文档(数据模型)
    + [ ] 技术选型/学习/上手 -> **先使用express+mongoDB搭建demo版,正式环境使用springBoot+mysql**
    + [ ] 总体功能架构图,数据存储图
    + [ ] 组件关系图与组件操作列表,依赖服务于提供服务(接口卡)
    + [ ] 代码元信息文档(参考自营手续费功能时写的文档)

- 后端开发
    + [ ] Auth模块
    + [ ] Column模块
    + [ ] Blog模块
    + [ ] Feed模块
    + [ ] Plan模块 -> **遥遥无期**
    + [ ] Chat模块
    + [ ] Common模块
    + [ ] Admin模块

#细节
- [x] 将项目中的固定图片资源放在src/assets/img目录下.
- [ ] 组件style样式清理一下,过时无用的样式删掉.重复的样式合并一下,公共样式抽取到单独的css文件中.保持各个组件style的作用域为scoped.
- [ ] css -> scss.
- [x] 编写login.vue,register.vue.
- [ ] api.js扩展为使用fetch,async函数,await同步修饰符,promise对象的ajax请求,真实的请求后端服务器json数据.->是否需要nginx代理?
- [ ] 页面基础元素使用material design风格.
- [x] 编写vue-waves插件,使用现成的waves.js库,封装成vue插件.[参考github上vue-waves项目](https://github.com/Teddy-Zhu/vue-waves)
- [x] 编写vue-event bus插件.[参考github项目](https://github.com/yangmingshan/vue-bus)
- [ ] vue-event bus插件提供了一个通用的vue实例,各个组件都将事件添加到该实例上.这样事件在各个组件中,没有进行统一管理.参考vuex改进一下.
- [ ] 实现一个简单的vuex-demo,基于flux架构.
- [ ] 多组件的复杂交互行为的数据需要放在vuex中,还有一些全局数据.例如:用户数据.
- [x] 了解下 vm.$on,$emit,$dis...
- [ ] edit的题图hover上去要会变色,click后可以更换题图.
- [ ] 调整editor选中颜色,语法校验
- [ ] div高度变化时添加过渡效果
- [ ] 夜晚主题
- [ ] 研究下图片上传问题,使用七牛图片云服务?
- [ ] feed页面UI根据google+的风格进行调整.-UI优化可以放在后端搭建完成后.
- [ ] 各页面的交互功能还需再完善,可用一点.
- [ ] 编写button,input,select,弹窗,提示等控件的ui.
- [ ] 使用node.js+MongoDB编写后端接口.
- [ ] 使用springboot开发后端.
- [ ] 使用svg图标代替vue-awsome
- [ ] editor目前是simple版本不支持复选框,修改为完整版的.
- [x] 取消front-end中以mock形式获得数据,修改为通过restful方式从back-end获得数据
- [ ] 本地下载并使用MongoDB.
- [ ] node集成mongoose,编写models.
- [ ] axios的POST,PUT,PATCH,DELETE方法封装一下,分为query(URL问号后边参数),form(body中,x-www-urlencoded),json(application/json)
- [ ] 集成i18n
- [ ] 写一个方法,将vue的data对象,copy成普通的js-data对象.
- [ ] 研究下SSR,可以解决F5刷新时的白屏问题.-->使用Nuxt.js-vue的通用应用框架.掘金是未登陆的用户采用SSR.
- [ ] 研究下前端缓存,几乎全部的js/css都可以缓存起来.
- [ ] css预处理器使用stylus吧.基于node.js编译.
- [ ] 使用vue的Vuetify库(material-design风格),UI组件自己实现累不说还不规范没有复用性.
- [ ] webpack的配置需要详细了解一下,dev/production环境config配置,插件的使用,优化等.
- [ ] 应用的图标从vue-awesome修改为google material icons. 将应用内需要使用到的图标打包成单个svg文件.参考svg打包demo.
- [ ] 做一个google-material-icons的vue插件.
- [ ] html-使用vuetify框架重构,css使用stylus重构.
- [ ] 目前使用material design 图标后边，自己集成svg，vuetify使用自定义图标集。
- [ ] 权限不足时，重定向到登录页面。
- [ ] 取消页面中超链接的使用，至少取消直接包含文本的超链接--使用span代替
- [ ] 编辑器的语法校验关掉。
