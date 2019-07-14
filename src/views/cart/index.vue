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
          <th scope="col">Size</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="(item, index) in data.items">
          <th scope="row">{{index}}</th>
          <td>
            <div class="item-preview">
              <img :src="item.thumbnail" :alt="item.title" class="item-thumbnail">
              <div>
                <h2 class="item-title">{{ item.title }}</h2>
                <p class="item-description">{{ item.description }}</p>
              </div>
            </div>
          </td>
          <td>
            <a-badge
              :key="size" v-for="size in item.sizes"
              :count="size"
              :numberStyle="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
          </td>
          <td> <input type="text" class="item-quantity" v-model="item.quantity"></td>
          <td>
            <span>{{ toPrice(item.price).toFormat() }}</span>
          </td>
          <td>
             <a-button shape="circle" icon="delete" />
          </td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td><h3 class="cart-line">Subtotal</h3></td>
          <td></td>
          <td></td>
           <td><span class="cart-price">{{ getSubtotal.toFormat() }}</span></td>
           <td></td>
        </tr>
        <tr>
           <th scope="row"></th>
           <td><h3 class="cart-line"> VAT ({{ data.vatRate }}%)</h3></td>
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
import Dinero from 'dinero.js'
export default {
  name: 'Cart',
  data () {
    return {
      data: {
        items: [],
        shippingPrice: 0,
        vatRate: 0
      },
      language: 'en-US'
    }
  },
  methods: {
    toPrice (amount, factor = Math.pow(10, 2)) {
      return Dinero({ amount: Math.round(amount * factor) }).setLocale(
        this.language
      )
    }
  },
  computed: {
    getShippingPrice () {
      return this.toPrice(this.data.shippingPrice)
    },
    getTaxAmount () {
      return this.getSubtotal.percentage(this.data.vatRate)
    },
    getSubtotal () {
      return this.data.items.reduce(
        (a, b) => a.add(this.toPrice(b.price).multiply(b.quantity)),
        Dinero().setLocale(this.language)
      )
    },
    getTotal () {
      return this.getSubtotal.add(this.getTaxAmount).add(this.getShippingPrice)
    }
  },
  created () {
    this.data = {
      items: [
        {
          title: 'Item 1',
          description: 'A wonderful product',
          thumbnail: 'https://fakeimg.pl/80x80',
          sizes: ['XL', 'L', 'M'],
          quantity: 3,
          price: 20.01
        },
        {
          title: 'Item 2',
          description: 'A Great product',
          thumbnail: 'https://fakeimg.pl/80x80',
          sizes: ['L'],
          quantity: 1,
          price: 2.01
        },
        {
          title: 'Item 3',
          description: 'A Good product',
          thumbnail: 'https://fakeimg.pl/80x80',
          sizes: ['S', 'M'],
          quantity: 2,
          price: 10
        }
      ],
      shippingPrice: 0,
      vatRate: 20
    }
    console.log(this.data)
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
.cart {
  box-shadow: rgba(0, 0, 0, 0.075) 0px 0.125rem 0.25rem !important;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  color: #333a45;
  border-radius: 3px;
  padding: 0.75rem;
}
input {
   border-radius: 12px !important;
   max-width: 50px !important;
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
