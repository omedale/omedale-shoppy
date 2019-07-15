<template>
  <div>
    <a-modal
      :title="product.name"
      v-model="showModal"
      :closable="false"
      @ok="closeProductModal"
    >
      <div class="row">
        <div class="col-md-6">
           <a-carousel arrows dotsClass="slick-dots slick-thumb">
              <a slot="customPaging" slot-scope="props">
                <img :src="getImg(props.i)" />
              </a>
              <div :key="image" v-for="image in images">
                <img :src="getImgUrl(image)" />
              </div>
            </a-carousel>
            <p>{{product.description}}</p>
        </div>
        <div class="col-md-6">
          <div class="detail-filter-item">
            <strong>price:</strong>
            <strong v-if="product.discounted_price > 0">${{product.discounted_price}}</strong>
             <strong v-else>${{product.price}}</strong>
          </div>
          <div class="detail-filter-item">
          <strong>Color</strong>
          <div>
            <a-radio-group :size="'small'">
              <a-radio-button :key="color.value" v-for="color in colors"  v-bind:style="{ background: `${color.value} !important` }" :value="color.value">&nbsp; &nbsp;</a-radio-button>
            </a-radio-group>
          </div>
          </div>
          <div class="detail-filter-item">
            <strong>Size</strong>
            <div>
              <a-radio-group size="small">
                <a-radio-button :key="size.value" v-for="size in sizes" :value="size.value">{{size.value}}</a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <div class="detail-filter-item">
            <strong>Quantity</strong>
            <div>
              <a-row size="small">
                <a-col :span="3">
                  <a-button shape="circle" @click="updateQuatity(-1)" icon="minus" :size="'small'" />
                </a-col>
                <a-col class="mr-2 ml-2" :span="6">
                  <a-input class="quantity" size="small" v-model="quantity" type="number" min="0" defaultValue="0" />
                </a-col>
                <a-col :span="3">
                  <a-button class="" @click="updateQuatity(1)" shape="circle" icon="plus" :size="'small'" />
                </a-col>
              </a-row>
            </div>
          </div>
           <div class="detail-filter-item">
              <a-button class="add-to-cart-btn" type="primary">Add to cart</a-button>
           </div>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="closeProductModal">Return</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: ['showModal', 'product', 'images', 'colors', 'sizes'],
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    closeProductModal (e) {
      this.$emit('close-product-detail')
    },
    getImg (i) {
      return require(`../../assets/product_images/${this.images[i]}`)
    },
    updateQuatity (value) {
      this.quantity = Math.max(0, this.quantity + value)
    },
    getImgUrl (imageName) {
      return require(`../../assets/product_images/${imageName}`)
    }
  }
}
</script>
<style scoped>
.ant-carousel {
  margin-bottom: 55px !important;
}
.ant-carousel >>> .slick-dots {
  height: auto;
  display: flex !important;
  justify-content: center;
}
.ant-carousel >>> .slick-slide img{
    border: 5px solid #FFF;
    display: block;
    margin: auto;
    max-width: 80%;
}
.ant-carousel >>> .slick-thumb {
  bottom: -45px;
}
.ant-carousel >>> .slick-thumb li {
  width: 60px;
  height: 45px;
}
.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img{
    filter: grayscale(0%);
}
.detail-filter-item{
  margin-bottom: 8px;
}
.plus-btn {
  margin-left: 0.2rem!important;
}
.ant-col-3 {
  width: unset;
}
.add-to-cart-btn {
  margin-top: 5px;
}
.ant-radio-button-wrapper:not(:first-child)::before {
  background-color: unset;
}
.quantity {
  border-radius: 12px;
  text-align: center;
}
</style>
