<template>
  <div>
    <a-modal
      title="Basic Modal"
      v-model="showModal"
      :closable="false"
      @ok="closeProductModal"
    >
      <div class="row">
        <div class="col-md-6">
           <a-carousel arrows dotsClass="slick-dots slick-thumb">
              <a slot="customPaging" slot-scope="props">
                <img :src="getImgUrl(props.i)" />
              </a>
              <div :key="item" v-for="item in 9">
                <img :src="imgUrl" />
              </div>
            </a-carousel>
        </div>
        <div class="col-md-6">
          <div class="detail-filter-item">
            <strong>{{product.name}}</strong>
          </div>
          <div class="detail-filter-item">
            <strong>{{product.price}}</strong>
          </div>
          <div class="detail-filter-item">
          <strong>Color</strong>
          <div>
            <a-radio-group :size="'small'">
              <a-radio-button value="a">&nbsp; &nbsp;</a-radio-button>
              <a-radio-button value="b">&nbsp; &nbsp;</a-radio-button>
              <a-radio-button value="c">&nbsp; &nbsp;</a-radio-button>
              <a-radio-button value="d">&nbsp; &nbsp;</a-radio-button>
            </a-radio-group>
          </div>
          </div>
          <div class="detail-filter-item">
            <strong>Size</strong>
            <div>
              <a-radio-group size="small">
                <a-radio-button value="a">Hangzhou</a-radio-button>
                <a-radio-button value="b">Shanghai</a-radio-button>
                <a-radio-button value="c">Beijing</a-radio-button>
                <a-radio-button value="d">Chengdu</a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <div class="detail-filter-item">
            <strong>Quantity</strong>
            <div>
              <a-row size="small">
                <a-col :span="3">
                  <a-button shape="circle" icon="minus" :size="'small'" />
                </a-col>
                <a-col class="mr-2 ml-2" :span="6">
                  <a-input size="small" defaultValue="0571" />
                </a-col>
                <a-col :span="3">
                  <a-button class=""  shape="circle" icon="plus" :size="'small'" />
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
  props: ['showModal', 'product'],
  data () {
    return {
      imgUrl: 'http://res.cloudinary.com/ixosft/image/upload/v1559509948/x8r1xzb68rz5plqqbtia.png'
    }
  },
  methods: {
    closeProductModal (e) {
      this.$emit('close-product-detail')
    },
    getImgUrl (i) {
      return this.imgUrl
    }
  }
}
</script>
<style scoped>
.ant-carousel {
  margin-bottom: 45px !important;
}
.ant-carousel >>> .slick-dots {
  height: auto;
  display: flex !important;
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
</style>
