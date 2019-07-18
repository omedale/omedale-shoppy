<template>
  <div class="container">
      <div class="py-5 text-center">
         <h2>Checkout</h2>
      </div>
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart</span>
            <span class="badge badge-secondary badge-pill">{{totalItem}}</span>
          </h4>
          <ul class="list-group mb-3">
            <li :key="item.item_id" v-for="item in carts" class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">{{ item.name }}</h6>
                <small class="text-muted">Quantity ({{ item.quantity }})</small>
              </div>
              <span  v-if="item.discounted_price > 0" class="text-muted">{{ toPrice(item.discounted_price).toFormat() }}</span>
              <span  v-else class="text-muted">{{ toPrice(item.price).toFormat() }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Tax</span>
              <strong>{{ getTaxAmount.toFormat() }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Shipping fee</span>
              <strong>$ {{ shippingFee }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>{{ getTotal.toFormat() }}</strong>
            </li>
          </ul>
        </div>
        <div class="col-md-8 order-md-1">
          <h4 class="mb-3">Billing address</h4>
           <a-form
            :form="form"
            @submit="makeOrder"
            >
            <a-form-item
            label="Name">
            <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{
                      required: true, message: 'Please input your name!',
                    }],
                    initialValue: (customer.name || '')
                  }
                ]"
                placeholder="Name"
              >
              </a-input>
            </a-form-item>
            <a-form-item
              label="Email"
              >
              <a-input
                v-decorator="[
                  'email',
                  {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                      required: true, message: 'Please input your E-mail!',
                    }],
                    initialValue: (customer.email || '')
                  }
                ]"
                 placeholder="your@email.com"
              />
            </a-form-item>
             <a-row>
                <a-col :span="12">
                  <a-form-item
                    label="Address">
                    <a-input
                        v-decorator="[
                          'address',
                          {
                            rules: [{
                              required: true, message: 'Please input your Address!',
                            }],
                            initialValue: (customer.address_1 || '')
                          }
                        ]"
                        placeholder="23 Suxxess pile way"
                      >
                      </a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item
                    label="Address 2 (optional)">
                    <a-input
                      v-decorator="['address2', {initialValue: (customer.address_1 || '')}]"
                        placeholder="Apartment or Flat"
                      >
                      </a-input>
                  </a-form-item>
                </a-col>
             </a-row>
             <a-row>
                <a-col :span="12">
                  <a-form-item
                    label="City">
                    <a-input
                        v-decorator="[
                          'city',
                          {
                            rules: [{
                              required: true, message: 'Please input city!',
                            }],
                            initialValue: (customer.city || '')
                          }
                        ]"
                        placeholder="New York"
                      >
                      </a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item
                    label="Country">
                    <a-input
                        v-decorator="[
                          'country',
                          {
                            rules: [{
                              required: true, message: 'Please input country!',
                            }],
                            initialValue: (customer.country || '')
                          }
                        ]"
                        placeholder="USA"
                      >
                      </a-input>
                  </a-form-item>
                </a-col>
             </a-row>
             <a-row>
                <a-col :span="10">
                  <a-form-item
                    label="Region"
                    has-feedback
                    >
                      <a-select
                        @change="getShipping"
                        v-decorator="[
                          'region',
                          {rules: [{ required: true, message: 'Please select your region!' }]}
                        ]"
                        placeholder="Please select a region"
                      >
                        <a-select-option :key="region.shipping_region_id" v-for="region in regions" :value="JSON.stringify(region)">
                          {{region.shipping_region}}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    label="Shipping"
                    has-feedback
                    >
                      <a-select
                        v-decorator="[
                          'shipping',
                          {rules: [{ required: true, message: 'Please select shipping!' }]}
                        ]"
                        placeholder="Please select shipping"
                        @change="setShipping"
                      >
                        <a-select-option :key="shipping.shipping_id" v-for="shipping in shippings" :value="JSON.stringify(shipping)">
                          {{ shipping.shipping_type }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                   <a-form-item
                    label="Postal Code">
                    <a-input
                        v-decorator="[
                          'zip',
                          {
                            rules: [{
                              required: true, message: 'Please input country postal code!',
                            }],
                            initialValue: (customer.postal_code || '')
                          }
                        ]"
                        placeholder="23401"
                      >
                      </a-input>
                  </a-form-item>
                </a-col>
             </a-row>
            <a-form-item>
              <a-checkbox
                v-decorator="['saveInfo', {valuePropName: 'checked'}]"
              >
                Save this information for next time
              </a-checkbox>
            </a-form-item>
            <a-alert v-if="errorMessage" :message="errorMessage" type="error" showIcon />
            <a-form-item>
               <div class="action-buttons-space-between">
                 <a-button  class="action-button"  type="primary">
                    <router-link class="anchor-button " :to="'/cart'">
                    Back to cart
                    </router-link>
                  </a-button>
                  <a-button
                    type="primary"
                    html-type="submit"
                    class="action-button"
                  >
                    Place order
                  </a-button>
              </div>
            </a-form-item>
           </a-form>
        </div>
      </div>
      <div>
        <vue-stripe-checkout
          ref="checkoutRef"
          :image="'https://fakeimg.pl/80x80'"
          :name="'Omedale'"
          :description="description"
          :currency="'USD'"
          :amount="totalPayableAmount"
          :email="customer.email || ''"
          :allow-remember-me="false"
          @done="done"
          @opened="opened"
          @closed="closed"
          @canceled="canceled"
        ></vue-stripe-checkout>
    </div>
</div>
</template>
<script>
import cartMixin from '@/mixins/cart'
import ConfigService from '@/services/config'
import OrderService from '@/services/order'
import CustomerService from '@/services/customer'
import CartService from '@/services/cart'
import store from '@/store'
export default {
  name: 'Checkout',
  mixins: [cartMixin],
  data () {
    return {
      shippings: [],
      form: this.$form.createForm(this),
      shippingId: 0,
      shippingFee: 0,
      errorMessage: '',
      loading: false,
      description: 'My shop order payment'
    }
  },
  computed: {
    totalPayableAmount () {
      return this.getTotal.getAmount()
    }
  },
  methods: {
    getShipping (region) {
      const currentRegion = JSON.parse(region)
      this.shippings = currentRegion.shippings
    },
    setShipping (shipping) {
      const shippingData = JSON.parse(shipping)
      this.shippingId = shippingData.shipping_id
      this.shippingFee = shippingData.shipping_cost
    },
    makeOrder (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.loading = true
          this.errorMessage = ''
          if (values.saveInfo) {
            this.updateAddress(values)
          }
          this.checkout()
        }
      })
    },
    async updateAddress (values) {
      const regionData = JSON.parse(values.region)
      const shippingData = JSON.parse(values.shipping)
      const customerAddress = {
        address_1: values.address,
        address_2: values.address2,
        city: values.city,
        region: regionData.shipping_region,
        postal_code: values.zip,
        country: values.country,
        shipping_region_id: shippingData.shipping_region_id
      }
      const response = await CustomerService.updateAddress(customerAddress)
      if (response.status === 200 && response.data.customer_id) {
        const customer = response.data
        store.commit('UPDATE_CUSTOMER', { customer })
      }
    },
    async createOrder (data, token) {
      const response = await OrderService.order(data)
      if (response.status === 200 && response.data.orderId) {
        const data = {
          stripeToken: token,
          order_id: response.data.orderId,
          'description': this.description,
          'amount': Math.round(this.getTotal.getAmount() / 100)
        }
        this.chargeCustomer(data)
      } else {
        this.errorMessage = 'An error occur, please try again later'
        // eslint-disable-next-line
        return
      }
    },
    async resetCart () {
      const response = await CartService.generateUniqueCartId()
      if (response.status === 200 && response.data.cart_id) {
        const status = true
        const cartId = response.data.cart_id
        const carts = []
        store.commit('UPDATE_CART_CONFIG', { cartId, status })
        store.commit('ADD_CARTS', { carts })
        this.$router.replace('/')
      }
    },
    async getCheckOutData () {
      const response = await ConfigService.getCheckOutData()
      if (response.status === 200 && response.data.tax) {
        const data = response.data
        store.commit('ADD_CHECKOUT_DATA', { data })
      }
    },
    async chargeCustomer (data) {
      const response = await OrderService.charge(data)
      if (response.data && response.status === 'succeeded') {
      }
    },
    async checkout () {
      await this.$refs.checkoutRef.open()
    },
    done ({ token, args }) {
      const data = {
        cart_id: this.cartId,
        shipping_id: this.shippingId,
        tax_id: this.currentTaxId
      }
      this.createOrder(data, token.id)
      this.resetCart()
      this.loading = false
      this.errorMessage = ''
    },
    opened () {
      // do stuff
    },
    closed () {
      this.loading = false
      this.errorMessage = ''
    },
    canceled () {
      this.loading = false
      this.errorMessage = ''
    }
  },
  created () {
    if (this.regions.length === 0) {
      this.getCheckOutData()
    }
  }
}
</script>
<style scoped>
  .action-button {
    width: 130px;
  }
</style>
