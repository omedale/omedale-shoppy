<template>
<div>
  <header class="section-header">
    <section class="section-wrapper">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-sm-12">
            <a-input-search placeholder="input search text" @search="onSearch" enterButton="Search" :size="'small'" />
          </div>
          <div class="col-lg-6 col-sm-12">
            <div class="float-right no-gutters py-1">
              <a href="#" class="">
                  <a-icon type="shopping-cart" />
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </header>
</div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    onSearch (value) {
      console.log(value)
    }
  }
}
</script>
