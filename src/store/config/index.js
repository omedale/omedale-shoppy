import Vue from 'vue'
import Vuex from 'vuex'

 Vue.use(Vuex)

 export default {
  state: {
    categories: [],
    departments: [],
    attributes: []
  },
  mutations: {
    ADD_CONFIG (state, { data }) {
      state.categories = (data && data.categories.length) ? data.categories : []
      state.departments = data && data.departments ? data.departments : []
      state.attributes = data && data.attributes ? data.attributes : []
    }
  },
  actions: {},
  getters: {
    colors: state => {
      const attribute = state.attributes.filter(attribute => attribute.name === 'Color')
      return attribute.length ? attribute[0].attribute_values : []
    },
    sizes: state => {
      const attribute = state.attributes.filter(attribute => attribute.name === 'Size')
      return attribute.length ? attribute[0].attribute_values : []
    },
    departments: state => state.departments,
    categories: state => state.categories
  }
}
