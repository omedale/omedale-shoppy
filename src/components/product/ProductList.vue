<template>
<div>
  <div class="products">
    <div class="container">
      <template v-for="product in products">
        <product-item @show-product-detail="showProductDetail" :key="product.id" :product="product"></product-item>
      </template>
    </div>
    <div class="row pagination-wrapper">
       <a-pagination  :defaultCurrent="1" :pageSize="10" @change="onPageChange" :current="current" :total="500" />
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
import ProductItem from './ProductItem.vue'
import ProductDetail from './ProductDetail'
export default {
  name: 'product-list',
  data () {
    return {
      current: 10,
      showModal: false,
      product: {},
      products: [{
        id: 'cghvjh567898',
        name: 'Vehoooo jchdkbhn 3cjbih kfbr3ckj cehbkjn bcrekjncik',
        manufacturer: {
          name: 'Nissan'
        },
        price: 200,
        image: 'https://taaimages.s3.eu-west-2.amazonaws.com/1539772138.jpg'
      }]
    }
  },
  created () {
    console.log(this.products)
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
  background: #F7F8FB;
  padding: 30px 0;
}
.pagination-wrapper {
  justify-content: center;
}
</style>
