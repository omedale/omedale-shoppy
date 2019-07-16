<template>
<div>
  <div class="cart">
    <h1 class="title">
      Order
    </h1>
  </div>
  <div class="table-wrapper">
    <table class="table table-borderless text-nowrap">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Attributes</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.item_id" v-for="(item, index) in carts">
          <th scope="row">{{(index + 1)}}</th>
          <td>
            <div class="item-preview">
              <img :src="getImgUrl(item.thumbnail)" :alt="item.name" class="item-thumbnail">
              <div>
                <h2 class="item-title">{{ item.name }}</h2>
                <p class="item-description">{{ item.description }}</p>
              </div>
            </div>
          </td>
          <td>
            <div v-if="(item.attributes).split(',')[0]">
              <a-badge
                :key="attribute" v-for="attribute in (item.attributes).split(',')"
                :count="attribute"
                :numberStyle="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
              </div>
          </td>
          <td>
            <a-row size="small">
              <a-col :span="3">
                <a-button :disabled="loading"  shape="circle" @click="updateQuatity(item, -1)" icon="minus" :size="'small'" />
              </a-col>
              <a-col class="mr-2 ml-2" :span="6">
                <a-input class="quantity" size="small" :disabled="true" v-model="item.quantity" type="number" min="0" defaultValue="0" />
              </a-col>
              <a-col :span="3">
                <a-button :disabled="loading" class="" @click="updateQuatity(item, 1)" shape="circle" icon="plus" :size="'small'" />
              </a-col>
            </a-row>
          </td>
          <td>
            <span v-if="item.discounted_price > 0">{{ toPrice(item.discounted_price).toFormat() }}</span>
             <span v-else>{{ toPrice(item.price).toFormat() }}</span>
          </td>
          <td>
             <a-button @click="removeItem(item.item_id)"  shape="circle" icon="delete" />
          </td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td><h3 class="cart-line">Subtotal</h3></td>
          <td></td>
          <td></td>
           <td><span class="cart-price"> {{ getSubtotal.toFormat() }}</span></td>
           <td></td>
        </tr>
        <tr>
           <th scope="row"></th>
           <td><h3 class="cart-line"> Tax ({{ currentTaxRate }}%)</h3></td>
           <td></td>
           <td></td>
           <td> <span class="cart-price">{{ getTaxAmount.toFormat() }}</span></td>
           <td></td>
        </tr>
        <tr>
           <th scope="row"></th>
           <td><h3 class="cart-line"> Total</h3></td>
           <td></td>
           <td></td>
           <td> <span class="cart-price">{{ getTotal.toFormat() }}</span></td>
           <td></td>
        </tr>
      </tbody>
    </table>
    <div class="action-buttons-center">
      <a-button-group>
        <a-button  type="primary">
          <router-link class="anchor-button " :to="'/'">
            <a-icon type="left" />Back to Shop
          </router-link>
        </a-button>
        <a-button  type="primary">
          <router-link class="anchor-button " :to="'/checkout'">
            Checkout<a-icon type="right" />
           </router-link>
        </a-button>
      </a-button-group>
    </div>
  </div>
</div>
</template>

<script>
import cartMixin from '@/mixins/cart'
import CartService from '@/services/cart'
import ConfigService from '@/services/config'
import store from '@/store'
export default {
  name: 'Cart',
  mixins: [cartMixin],
  methods: {
    getImgUrl (imageName) {
      return require(`../../assets/product_images/${imageName}`)
    },
    updateQuatity (item, value) {
      const data = {
        item_id: item.item_id,
        product_id: item.product_id,
        attributes: item.attributes
      }
      this.addOrUpdateCart(data, value)
    },
    async removeItem (itemId) {
      const response = await CartService.removeProduct(itemId)
      if (response.status === 200 && response.data) {
        store.commit('REMOVE_CART', { itemId })
      }
    },
    async getCheckOutData () {
      const response = await ConfigService.getCheckOutData()
      if (response.status === 200 && response.data.tax) {
        const data = response.data
        store.commit('ADD_CHECKOUT_DATA', { data })
      }
    }
  },
  created () {
    this.getCheckOutData()
  }
}
</script>

<style scoped>
.table-wrapper {
  overflow: auto;
  height: auto;
}
.ant-btn-group > .ant-btn:last-child:not(:first-child), .ant-btn-group > span:last-child:not(:first-child) > .ant-btn, .ant-btn-group > .ant-btn:first-child:not(:last-child), .ant-btn-group > span:first-child:not(:last-child) > .ant-btn{
  border-radius: 12px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  text-transform: uppercase;
  font-size: 110%;
  font-weight: normal;
}
.quantity {
  border-radius: 12px;
  text-align: center;
}
.language {
  margin: 0 2px;
  font-size: 60%;
  color: rgba(#333a45, 0.6);
  text-decoration: underline;
  cursor: pointer;
}
.items {
  margin: 0;
  padding: 0;
  list-style: none;
}
input {
   border-radius: 12px !important;
   max-width: 50px !important;
}
.cart {
  box-shadow: rgba(0, 0, 0, 0.075) 0px 0.125rem 0.25rem !important;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  color: #333a45;
  border-radius: 3px;
  padding: .75rem;
}
.cart-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
  font-size: inherit;
  font-weight: normal;
  color: rgba(51, 58, 69, 0.8);
  font-weight: bold;
}
.cart-price {
  color: #333a45;
}
.cart-total {
  font-size: 130%;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 2px solid rgba(51, 58, 69, 0.1);
}
.item-preview {
  display: flex;
  align-items: center;
}
.item-thumbnail {
  margin-right: 20px;
  border-radius: 3px;
}
.item-title {
  margin: 0 0 10px 0;
  font-size: inherit;
}
.item-description {
  margin: 0;
  color: rgba(51, 58, 69, 0.6);
}
.item-quantity {
  max-width: 30px;
  font-size: inherit;
  color: rgba(51, 58, 69, 0.8);
  border: 2px solid rgba(51, 58, 69, 0.1);
  border-radius: 3px;
  text-align: center;
}
</style>
