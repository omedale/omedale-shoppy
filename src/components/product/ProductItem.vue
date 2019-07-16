<template>
<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
  <div class="product">
    <div @click="showProductDetail" class="product-link">
      <div class="product-image">
        <img
            class="img-responsive" :src="getImgUrl(product.image)">
        </div>
        <div class="card-product ">
          <div class="info-wrap">
            <a href="#" class="title">
              <div class="product-name text-center">{{product.name}}</div>
            </a>
            <div class="price-wrap text-center">
              <span v-if="product.discounted_price > 0" class="price-new discounted-product-price"> ${{product.discounted_price}}</span>
              <span v-else class="price-new discounted-product-price"> ${{product.price}}</span>
            </div>
          </div>
          <div class="flex-space-between">
            <a-button class="pull-left" type="primary" shape="circle" icon="heart" :size="'small'" />
              <span v-if="product.discounted_price > 0" class="price-new product-price"> ${{product.price}}</span>
            <a-button type="primary" class="pull-right" shape="circle" icon="shopping-cart" :size="'small'" />
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'product-item',
  props: ['product'],
  data () {
    return {
    }
  },
  methods: {
    showProductDetail () {
      this.$emit('show-product-detail', this.product)
    },
    getImgUrl (imageName) {
      return require(`../../assets/product_images/${imageName}`)
    }
  }
}
</script>

<style>
.product {
  background: #FFF;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}
.product-link {
  display: block;
  color: #3D3D3D;
  cursor: pointer;
}
.product-link:hover {
  color: #3D3D3D;
  text-decoration: none;
}
.product .product-image {
  width: 100%;
}
.product-image img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 225px;
}
.card-product {
  padding: 0px 19px 18px 19px;
}
.product-info {
  flex: 2;
}
.product-price {
  font-size: large;
  text-decoration: line-through;
}
.discounted-product-price {
  font-size: large;
  color: #1ca57a;
}
.product-name {
  color: rgba(0, 0, 0, 0.65);
}
</style>
