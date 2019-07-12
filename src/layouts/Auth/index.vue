<template>
  <a-layout>
    <a-layout-content>
      <div
        :class="[$style.layout]"
      >
        <div :class="$style.header">
          <div :class="$style.logo">
            <router-link to="/">
              Home
            </router-link>
          </div>
        </div>
        <div :class="$style.content">
          <router-view/>
        </div>
        <div :class="[$style.footer, 'text-center']">
          <p>&copy; 2019 Omedale. All rights reserved.</p>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: 'AuthLayout',
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" module>
@import "./style.module.scss";
</style>
