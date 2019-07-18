<template>
<div class="main-app">
  <header-component></header-component>
  <section class="main-content">
    <div class="container  content-wrapper">
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
<style scoped>
  .content-wrapper {
    margin-top: 100px;
  }
  @media screen and (max-width: 992px) {
    .content-wrapper {
      margin-top: 140px;
    }
  }
  .main-app {
    position: relative;
    height: 100vh;
  }
  .main-content {
    height: 95vh;
    overflow-y: scroll;
  }
</style>
