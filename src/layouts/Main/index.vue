<template>
<div>
  <header-component></header-component>
  <section class="">
    <div class="container">
      <router-view />
    </div>
  </section>
  <footer-component></footer-component>
</div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
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
    'footer-component': Footer
  }
}
</script>
