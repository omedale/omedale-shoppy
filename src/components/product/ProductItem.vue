<template>
<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
  <div class="product">
    <router-link :to="'/cart'" class="product-link">
      <div class="product-image">
        <img
            class="img-responsive" :src="product.image" alt="">
        </div>
        <div class="card-product ">
          <div class="info-wrap">
            <a href="#" class="title">
              <div class="text-center">{{product.name}}</div>
            </a>
            <div class="price-wrap text-center">
              <span class="price-new"> ${{product.price}}</span>
            </div>
          </div>
          <div class="flex-space-between">
            <a-button class="pull-left" type="primary" shape="circle" icon="heart" :size="'small'" />
            <a-button type="primary" class="pull-right" shape="circle" icon="shopping-cart" :size="'small'" />
          </div>
        </div>
    </router-link>
    <div class="">

     </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'product-item',
  props: ['product']
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
</style>
