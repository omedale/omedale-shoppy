import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import customer from './customer'
import product from './product'
import config from './config'
import cart from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  modules: {
    customer,
    product,
    config,
    cart
  },
  state: {},
  mutations: {},
  actions: {}
})
