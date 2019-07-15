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
    },
    REMOVE_CART (state, { itemId }) {
      const index = state.carts.findIndex(cart => parseInt(cart.item_id) === parseInt(itemId))
      state.carts.splice(index, 1)
    }
  },
  actions: {},
  getters: {
    carts: state => state.carts,
    cartId: state => state.cartId,
    totalItem: state => state.carts.length,
    isValidCartId: state => state.isValidCartId
  }
}
