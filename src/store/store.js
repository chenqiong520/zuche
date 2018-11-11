import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {}
// state['base'] = '192.1.12.189:8080' // 欢姐
// state['base'] = '192.1.12.146:8080'
// state['base'] = '192.1.12.128:8080'
// state['base'] = '192.1.12.191:8080'
// state['base'] = '218.76.8.53:58080/htds'
state['base'] = '61.187.87.133:8081/htds'
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
