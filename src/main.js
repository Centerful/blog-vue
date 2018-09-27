// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vue-aswesome-vue第三方图标库
// 仅引入用到的图标以减小打包体积
import 'vue-awesome/icons/'
import Icon from 'vue-awesome/components/Icon'
// 引入本地请求api
import api from './api/api.js'

// 自定义components
import Placeholder from '@/components/Placeholder'

Vue.config.productionTip = false

// 配置api
Vue.prototype.api = api

/* eslint-disable no-new */
Vue.component('icon', Icon)
Vue.component('placeholder', Placeholder)

new Vue({
  el: '#app',
  router,
  components: {
    'App': App
  },
  template: '<App/>'
})
