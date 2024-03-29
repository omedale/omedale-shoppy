import { mapGetters } from 'vuex'
import ProductService from '@/services/product'
import store from '@/store'
export default {
  computed: {
    ...mapGetters(['departments', 'categories', 'sizes', 'colors', 'totalItem',
      'filterByPriceRange', 'isProductLoading', 'filterByCategoryIds', 'filterByDepartmentIds', 'searchWord',
      'isValidCartId'])
  },
  data () {
    return {
      searchKeys: ''
    }
  },
  methods: {
    async findProducts (searchQuery = '', type) {
      const filter = {
        department_ids: this.filterByDepartmentIds,
        category_ids: this.filterByCategoryIds,
        price_range: this.filterByPriceRange
      }
      let response = {}
      if (type === 'ALL_PRODUCTS') {
        response = await ProductService.getProducts(this.current, filter)
      } else {
        response = await ProductService.searchProducts(this.current, searchQuery, filter)
      }
      if (response.status === 200 && response.data && response.data.rows) {
        const data = response.data
        const currentPage = this.current
        store.commit('ADD_PRODUCTS', { data, currentPage })
      }
      const query = this.searchWord ? { q: this.searchWord, page: this.current } : { page: this.current }
      this.$router.push({ query: query })
      this.isLoading = false
    },
    resetUrl () {
      this.$router.replace({ 'query': null })
    },
    updateSearchParams () {
      if (this.$router.history.current.query.q) {
        const searchWord = this.$router.history.current.query.q
        this.searchKeys = searchWord
        store.commit('UPDATE_SEARCH_WORD', { searchWord })
      } else {
        const searchWord = ''
        store.commit('UPDATE_SEARCH_WORD', { searchWord })
      }
    }
  }
}
