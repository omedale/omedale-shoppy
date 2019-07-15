import Vue from 'vue'
import Vuex from 'vuex'

 Vue.use(Vuex)

 export default {
  state: {
    carts: [],
    cartId: null,
    isValidCartId: false
  },
  mutations: {
    UPDATE_CART_CONFIG (state, { cartId, status }) {
      state.cartId = cartId
      state.isValidCartId = status
    },
    ADD_CARTS (state, { carts }) {
      state.carts = carts
    }
  },
  actions: {},
  getters: {
    carts: state => state.carts,
    cartId: state => state.cartId,
    isValidCartId: state => state.isValidCartId
  }
}
