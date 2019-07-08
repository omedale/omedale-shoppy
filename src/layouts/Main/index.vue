<template>
<div class="hello">
  <div>
    <router-link to="/customer/login">
      <h3>Home</h3>
    </router-link>
  </div>
  <h2>MainLayout</h2>
  <router-view />
</div>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
