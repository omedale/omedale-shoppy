import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    products: [],
    currentPage: 1,
    totalProducts: null
  },
  mutations: {
    ADD_PRODUCTS (state, { data, currentPage }) {
      state.products = data && data.rows ? data.rows : []
      state.totalProducts = data && data.count ? data.count : 1
      state.currentPage = currentPage
    }
  },
  actions: {},
  getters: {
    products: state => state.products,
    currentPage: state => state.currentPage,
    totalProducts: state => state.totalProducts
  }
}
