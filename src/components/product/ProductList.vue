<template>
<div>
  <div class="products">
    <div class="row">
      <template v-for="product in products">
        <product-item @show-product-detail="showProductDetail" :key="product.id" :product="product"></product-item>
      </template>
    </div>
    <div class="row pagination-wrapper">
       <a-pagination  :defaultCurrent="1" :pageSize="20" @change="onPageChange" :current="currentPage" :total="totalProducts" />
    </div>
  </div>
  <product-detail
    :product="product"
    :showModal="showModal"
    @close-product-detail="closeProductModal"
  ></product-detail>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductItem from './ProductItem.vue'
import ProductDetail from './ProductDetail'
import productService from '@/services/product'
import store from '@/store'
export default {
  name: 'product-list',
  data () {
    return {
      current: 1,
      showModal: false,
      product: {}
    }
  },
  computed: {
    ...mapGetters(['products', 'totalProducts', 'currentPage'])
  },
  created () {
    this.getProducts()
  },
  methods: {
    onPageChange (current) {
      this.current = current
    },
    showProductDetail (product) {
      this.product = product
      this.showModal = true
    },
    closeProductModal () {
      this.showModal = false
      this.product = {}
    },
    async getProducts () {
      const response = await productService.getProducts(this.current)
      if (response.status === 200 && response.data && response.data.rows) {
        const data = response.data
        const currentPage = this.current
        store.commit('ADD_PRODUCTS', { data, currentPage })
      }
    }
  },
  components: {
    'product-item': ProductItem,
    'product-detail': ProductDetail
  }
}
</script>

<style>
.products {
  background: #e5e5e5;
  padding: 30px 0;
  padding-left: 15px;
  padding-right: 15px;
}
.pagination-wrapper {
  justify-content: center;
}
</style>
