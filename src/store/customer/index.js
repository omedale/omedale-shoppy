import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default {
  state: {
    customer: null,
    token: null,
    tokenExpIN: null
  },
  mutations: {
    UPDATE_CUSTOMER_INFO (state, { customer, token }) {
      state.customer = customer
      state.token = token
      state.tokenExpIN = customer ? moment.utc().add(1, 'day').format('YYYY,MM-DD HH:mm:ss') : null
    },
    UPDATE_CUSTOMER (state, { customer }) {
      state.customer = customer
    }
  },
  actions: {},
  getters: {
    customer: state => state.customer,
    customerToken: state => state.token,
    isTokenValid: state => {
      const now = moment(new Date())
      const next24Hour = state.tokenExpIN ? new Date(state.tokenExpIN) : null
      return now < moment(new Date(next24Hour))
    }
  }
}
