import FancyBox from './FancyBox.vue'

function install (Vue, /*options = {}*/) {
  let fancyBox = {
    $vm: null,
    init (vm) {
      this.$vm = vm
    },
    // 打开灯箱
    // imgs可以是String类型，也可以是数组类型
    // String与一个元素的数组做相同处理
    open (imgs, index) {
      if (!imgs) return 
      if (Array.isArray(imgs)) {
        this.$vm.params.imgs = imgs
        this.$vm.params.index = index
      } else {
        this.$vm.params.imgs = [imgs]
        this.$vm.params.index = 0
      }
      this.$vm.params.flag = true
    },
    // 主动关闭灯箱
    close () {
      this.$vm.params.imgs = null
      this.$vm.params.flag = false
      this.$vm.params.index = 0
    },
    // 前一张图片
    prev () {
      this.$vm.params.index = (this.$vm.params.index === 0) ? (this.$vm.params.imgs.length - 1) : (this.$vm.params.index - 1)
    },
    // 后一张图片
    next () {
      this.$vm.params.index = (this.$vm.params.index === this.$vm.params.imgs.length - 1) ? 0 : (this.$vm.params.index + 1)
    },
    // 设置灯箱的主题
    theme (color) {

    }
  }
  // 默认参数
  const DEFUALT_OPTIONS = {
    flag: false,
    imgs: null,
    index: 0
  }
  const FancyBoxDataConnector = new Vue({
    data: {
      params: DEFUALT_OPTIONS
    }
  })
  window.FancyBoxDataConnector = FancyBoxDataConnector
  Vue.component('fancy-box', FancyBox)
  fancyBox.init(FancyBoxDataConnector)
  Vue.prototype.$fancyBox = fancyBox
}

export default {
  install
}
