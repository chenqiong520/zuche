import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {}
state['base'] = '47.92.236.235:8081/carbase'
state['url'] = ''

const getters = {}
getters['base'] = (state) => state.base
getters['url'] = (state) => state.url

const actions = {
  edit_imgUrl ({commit}, url) {
    return commit('EDIT_IMGURL', url)
  }
}

const mutations = {
  EDIT_IMGURL (state, url) {
    state.url = url
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
