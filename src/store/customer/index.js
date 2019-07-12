import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    customer: null,
    token: null
  },
  mutations: {
    UPDATE_CUSTOMER_INFO (state, { customer, token }) {
      state.customer = customer
      state.token = token
    }
  },
  actions: {},
  getters: {
    customer: state => state.customer,
    customerToken: state => state.token
  }
}
