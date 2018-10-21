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
// 占位符
import Placeholder from '@/components/common/Placeholder'
// 加载 进度条插件
import Progressbar from '@/plugin/progressbar'
// 加载waves插件
import Waves from '@/plugin/waves'
// 加载Event bus插件.
import bus from '@/plugin/bus'

Vue.config.productionTip = false

// 配置api
Vue.prototype.api = api

/* eslint-disable no-new */
Vue.component('icon', Icon)
Vue.component('placeholder', Placeholder)

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
