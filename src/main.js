// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入material design 图标
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入material design ui库
import Vuetify from 'vuetify'
// 引入自定义stylus
import './assets/css/main.styl'
// 引入国际化.
import zhHans from 'vuetify/es5/locale/zh-Hans'
// 引入vue-aswesome-vue第三方图标库
// 仅引入用到的图标以减小打包体积
import 'vue-awesome/icons/'
import Icon from 'vue-awesome/components/Icon'
// 引入本地请求api
import api_mock from '@/api/api-mock.js'
// 连接服务器端的api
import api from '@/api/api.js'
import blog from '@/api/blog.js'
import comment from '@/api/comment.js'
import common from '@/api/common.js'
// 引入自己写的工具类.
import utils from '@/utils/utils.js'

// 自定义components
// 占位符
import Placeholder from '@/components/common/Placeholder'
// 加载 进度条插件
import Progressbar from '@/plugin/progressbar'
// 灯箱插件
import FancyBox from '@/plugin/FancyBox'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import FormConfirmDialog from '@/components/common/FormConfirmDialog'
import PromptDialog from '@/components/common/PromptDialog'
import SnackBar from '@/components/common/SnackBar'

// 加载waves插件
import Waves from '@/plugin/waves'
// 加载Event bus插件.
import bus from '@/plugin/bus'

Vue.config.productionTip = false

// 配置api,api_mock
Vue.prototype.api = api
Vue.prototype.$blog = blog
Vue.prototype.$comment = comment
Vue.prototype.$common = common

Vue.prototype.utils = utils

/* eslint-disable no-new */
Vue.component('icon', Icon)
Vue.component('placeholder', Placeholder)
Vue.component('ConfirmDialog', ConfirmDialog)
Vue.component('promptDialog', PromptDialog)
Vue.component('SnackBar', SnackBar)
Vue.component('FormConfirmDialog', FormConfirmDialog)




Vue.use(Vuetify, {
  // 设置图标是material design
  iconfont: 'mdi',
  // 设置组件i18n为中文
  lang: {
    locales: { 'zh-Hans': zhHans },
    current: 'zh-Hans'
  }
})

Vue.use(Progressbar)
Vue.use(FancyBox)
Vue.use(Waves)
Vue.use(bus)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  /*
  下面的代码与上面的代码显示效果一致.
  components: {
    'App': App
  },
  template: '<App/>'
  */
})
