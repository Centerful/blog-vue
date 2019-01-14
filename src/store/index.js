import Vue from 'vue'
import Vuex from 'vuex'
import edit from './modules/edit'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    edit
  },
  strict: debug,
  // 根节点存放的数据状态，例如：当前配色，以及不同配色下每个组件对应的配色。
  state: {
  },
  // plugins: debug ? [createLogger()] : []
})