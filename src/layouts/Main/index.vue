<template>
<div>
  <header-component></header-component>
  <section class="">
    <div class="container">
      <filter-component></filter-component>
      <router-view />
    </div>
  </section>
  <footer-component></footer-component>
</div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Filter from '@/components/common/Filter'
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    'header-component': Header,
    'footer-component': Footer,
    'filter-component': Filter
  }
}
</script>
