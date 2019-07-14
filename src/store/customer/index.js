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
    }
  },
  actions: {},
  getters: {
    customer: state => state.customer,
    customerToken: state => state.token,
    isTokenValid: state => {
      const now = moment()
      const next24Hour = state.tokenExpIN ? new Date(state.tokenExpIN) : null
      const isValid = next24Hour ? now.diff(moment(new Date(next24Hour)), 'days') : null
      return isValid === 0
    }
  }
}
