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
- [ ] 取消front-end中以mock形式获得数据,修改为通过restful方式从back-end获得数据
- [ ] 本地下载并使用MongoDB.
- [ ] node集成mongoose,编写models.
