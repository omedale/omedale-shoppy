import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import customer from './customer'
import product from './product'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  modules: {
    customer,
    product
  },
  state: {},
  mutations: {},
  actions: {}
})
