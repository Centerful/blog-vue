import Vue from 'vue'
import common from '@/api/common'

const vue = Vue.prototype

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  async imageUpload ({commit, state}, img_input_id) {
    let res = await common.imageUpload('imageInput')
    if (res.code != 0) {
      this.$bus.emit('prompt', res.message)
      return
    }
    return res.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}