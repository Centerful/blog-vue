
import ProgressBar from './ProgressBar.vue'

function install (Vue, options = {}) {
  // 默认配置
  const DEFUALT_OPTIONS = {
    height: '3px',
    isShow: false,
    reStart: true
  }

  // progress 对象
  let progress = {
    $vm: null,
    init (vm) {
      // set方法
      this.$vm = vm
    },
    height (h) {
      this.$vm.PB.options.height = `${h}px`
    },
    start () {
      this.$vm.PB.options.reStart = false
      this.$vm.PB.options.isShow = false

      setTimeout(() => {
        this.$vm.PB.options.reStart = true
      }, 10)
    },
    finish () {
      this.$vm.PB.options.isShow = true
    }
  }

  // 数据拷贝.
  let progressOptions = Object.assign(DEFUALT_OPTIONS, options)

  // 创建progress的Vue状态数据,将配置赋值到Vue对象中.对Vue自定义组件提供参数.
  const ProgressBarEventBus = new Vue({
    data: {
      PB: {
        options: progressOptions
      }
    }
  })

  // 将progress的Vue对象作为全局对象(window)的一个属性.这样整个Vue应用中,无论何处都可以(Vue环境下)都可以访问该对象.
  window.ProgressBarEventBus = ProgressBarEventBus
  progress.init(ProgressBarEventBus)

  // 注册progress组件
  Vue.component('progress-bar', ProgressBar)
  // 将progress的状态管理对象暴露到Vue实例方法中.-->对外部使用者提供该插件的方法.
  Vue.prototype.$progress = progress
}

// 对外暴露 install方法.
export default {
  install
}
