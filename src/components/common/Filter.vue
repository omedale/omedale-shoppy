<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="filter-item">
          <strong>Departments:</strong>
          <div>
            <a-select :size="'small'" mode="multiple" v-model="departmentIds" style="width: 100%" placeholder="Please select">
              <a-select-option :value="department.department_id" v-for="department in departments" :key="department.name">{{ department.name }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="filter-item">
          <strong>Categories:</strong>
          <div>
            <a-select :size="'small'" v-model="categoryIds"  mode="multiple" style="width: 100%" placeholder="Please select">
              <a-select-option :value="category.category_id" v-for="category in categories" :key="category.name">{{ category.name }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="filter-item">
          <strong>Price:</strong>
          <div class="price-wrapper">
            <input min="0" v-model="minPrice" class="form-control price-input form-control-sm" placeholder="Min" type="number">
            <span class="px-2"> - </span>
            <input min="0" v-model="maxPrice" class="form-control price-input form-control-sm" placeholder="Max" type="number">
            <a-button :disabled="isLoading" @click="setFilter" type="primary" class="ml-2" icon="filter" :size="'small'">
              <span v-if="isLoading">Please Wait...</span>
              <span v-else>Filter</span>
            </a-button>
            <a-button v-if="showResetFilter" @click="clearFilter" class="ml-2 reset-button" icon="delete" :size="'small'">
              <span>Reset</span>
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigService from '@/services/config'
import productMixin from '@/mixins/product'
import store from '@/store'
export default {
  name: 'filter',
  mixins: [productMixin],
  data () {
    return {
      categoryIds: [],
      departmentIds: [],
      isLoading: false,
      maxPrice: 0,
      minPrice: 0,
      current: 1
    }
  },
  computed: {
    showResetFilter () {
      return (this.filterByPriceRange[0] > 0 || this.filterByPriceRange[1] > 0 ||
        this.filterByCategoryIds.length ||
        this.filterByDepartmentIds.length)
    }
  },
  methods: {
    async getFilterData () {
      const response = await ConfigService.getFilterConfigData()
      if (response.status === 200 && response.data.attributes) {
        const data = response.data
        store.commit('ADD_CONFIG', { data })
        if (!this.isValidCartId) {
          const status = true
          const cartId = data.cart_id
          store.commit('UPDATE_CART_CONFIG', { cartId, status })
        }
        this.minPrice = this.filterByPriceRange[0]
        this.maxPrice = this.filterByPriceRange[1]
        this.categoryIds = this.categories.filter(category =>
          this.filterByCategoryIds.includes(category.category_id)).map(cat => cat.category_id)
        this.departmentIds = this.departments.filter(department =>
          this.filterByDepartmentIds.includes(department.department_id)).map(dept => dept.department_id)
      }
    },
    setFilter () {
      this.resetUrl()
      this.isLoading = true
      const priceRange = [Math.max(0, this.minPrice), Math.max(0, this.maxPrice)]
      const categoryIds = this.categoryIds
      const departmentIds = this.departmentIds
      store.commit('UPDATE_FILTERS', { departmentIds, categoryIds, priceRange })
      const findType = this.searchWord ? 'SEARCH_PRODUCTS' : 'ALL_PRODUCTS'
      this.findProdcut(this.searchWord, findType)
    },
    clearFilter () {
      this.resetUrl()
      this.maxPrice = 0
      this.minPrice = 0
      this.categoryIds = []
      this.departmentIds = []
      store.commit('CLEAR_FILTER')
      const findType = this.searchWord ? 'SEARCH_PRODUCTS' : 'ALL_PRODUCTS'
      this.findProdcut(this.searchWord, findType)
    }
  },
  created () {
    this.getFilterData()
  }
}
</script>
<style scoped>
  input {
    border-radius: 12px !important;
    width: 90px;
  }
  .ant-select {
    min-width: 120px !important;
  }
  .reset-button {
     border-radius: 12px;
  }
</style>
