import Vue from 'vue'
import Vuex from 'vuex'

 Vue.use(Vuex)

 export default {
  state: {
    categories: [],
    departments: [],
    attributes: [],
    shipping_regions: [],
    tax: []
  },
  mutations: {
    ADD_CONFIG (state, { data }) {
      state.categories = (data && data.categories.length) ? data.categories : []
      state.departments = data && data.departments ? data.departments : []
      state.attributes = data && data.attributes ? data.attributes : []
    },
    ADD_CHECKOUT_DATA (state, { data }) {
      state.tax = data.tax
      state.shipping_regions = data.shipping_regions.filter(item => item.shipping_region_id !== 1)
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
    categories: state => state.categories,
    currentTaxRate: state => state.tax.length > 1 ? state.tax[0].tax_percentage : 0,
    currentTaxId: state => state.tax.length > 1 ? state.tax[0].tax_id : null,
    regions: state => state.shipping_regions
  }
}
