<template>
<div class="hello">
  <product-list></product-list>
</div>
</template>

<script>
import ProductList from '@/components/product/ProductList'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'product-list': ProductList
  }
}
</script>
