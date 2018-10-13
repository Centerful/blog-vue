import './lib/waves.css'
import Waves from './lib/waves.js'

function install (Vue, options = { name: 'wave' }) {
  Vue.directive(options.name, {
    inserted (el, binding) {

    }
  })
  Vue.mixin({
    created () {
      Waves.init(options)
    }
  })
}

export default {
  install
}
