import 'node-waves/dist/waves.css'
import Waves from 'node-waves'

function install (Vue, options = { name: 'waves' }) {
  Vue.directive(options.name, {
    inserted (el, binding) {
      var classes = Object.keys(binding.modifiers).map(function(val) {
        return 'waves-' + val
      })
      Waves.attach(el, classes)
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
