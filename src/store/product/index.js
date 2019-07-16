import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    products: [],
    currentPage: 1,
    totalProducts: null,
    filterByDepartmentIds: [],
    filterByCategoryIds: [],
    filterByPriceRange: [0, 0],
    searchWord: ''
  },
  mutations: {
    ADD_PRODUCTS (state, { data, currentPage }) {
      state.products = data && data.rows ? data.rows : []
      state.totalProducts = data && data.count ? data.count : 1
      state.currentPage = currentPage
    },
    UPDATE_SEARCH_WORD (state, { searchWord }) {
      state.searchWord = searchWord
    },
    UPDATE_FILTERS (state, { departmentIds, categoryIds, priceRange }) {
      state.filterByCategoryIds = categoryIds
      state.filterByDepartmentIds = departmentIds
      state.filterByPriceRange = priceRange
    },
    CLEAR_FILTER (state) {
      state.filterByCategoryIds = []
      state.filterByDepartmentIds = []
      state.filterByPriceRange = [0, 0]
    }
  },
  actions: {},
  getters: {
    products: state => state.products,
    currentPage: state => state.currentPage,
    totalProducts: state => state.totalProducts,
    filterByDepartmentIds: state => state.filterByDepartmentIds,
    filterByCategoryIds: state => state.filterByCategoryIds,
    filterByPriceRange: state => state.filterByPriceRange,
    searchWord: state => state.searchWord
  }
}
