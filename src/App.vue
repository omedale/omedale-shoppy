<template>
  <div id="app">
    <div class="row">
      <div>
        <a-button type="primary">Primary</a-button>
        <a-button>Default</a-button>
        <a-button type="dashed">Dashed</a-button>
        <a-button type="danger">Danger</a-button>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
