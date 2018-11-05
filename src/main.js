// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入material design 图标
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
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
// 引入自己写的工具类.
import utils from '@/utils/utils.js'

// 自定义components
// 占位符
import Placeholder from '@/components/common/Placeholder'
// 加载 进度条插件
import Progressbar from '@/plugin/progressbar'
// 加载waves插件
import Waves from '@/plugin/waves'
// 加载Event bus插件.
import bus from '@/plugin/bus'

Vue.config.productionTip = false

// 配置api,api_mock
Vue.prototype.api = api
Vue.prototype.utils = utils

/* eslint-disable no-new */
Vue.component('icon', Icon)
Vue.component('placeholder', Placeholder)

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
Vue.use(Waves)
Vue.use(bus)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
  /*
  下面的代码与上面的代码显示效果一致.
  components: {
    'App': App
  },
  template: '<App/>'
  */
})
