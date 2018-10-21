function install (Vue) {
  let eventBus = new Vue()
  Object.defineProperties(eventBus, {
    on: {
      get () {
        return this.$on
      }
    },
    once: {
      get () {
        return this.$once
      }
    },
    off: {
      get () {
        return this.$off
      }
    },
    emit: {
      get () {
        return this.$emit
      }
    }
  })

  Vue.prototype.$bus = eventBus
}

export default {
  install
}