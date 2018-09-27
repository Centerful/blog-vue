# Blog-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
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