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
            @submit="pay"
            >
            <a-form-item
            label="Name">
            <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{
                      required: true, message: 'Please input your name!',
                    }]
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
                    }]
                  }
                ]"
                 placeholder="your@email.com"
              />
            </a-form-item>
            <a-form-item
              label="Address">
              <a-input
                  v-decorator="[
                    'address',
                    {
                      rules: [{
                        required: true, message: 'Please input your Address!',
                      }]
                    }
                  ]"
                  placeholder="23 Suxxess pile way"
                >
                </a-input>
            </a-form-item>
            <a-form-item
              label="Address 2 (optional)">
              <a-input
                 v-decorator="['address2']"
                  placeholder="Apartment or Flat"
                >
                </a-input>
            </a-form-item>
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
                          'state',
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
                    label="Zip Code">
                    <a-input
                        v-decorator="[
                          'zip',
                          {
                            rules: [{
                              required: true, message: 'Please input country zip code!',
                            }]
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
                v-decorator="['billing-address', {valuePropName: 'checked'}]"
              >
                Shipping address is the same as my billing address
              </a-checkbox>
            </a-form-item>
            <a-form-item>
              <a-checkbox
                v-decorator="['save-info', {valuePropName: 'checked'}]"
              >
                Save this information for next time
              </a-checkbox>
            </a-form-item>
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
          :description="'Payment'"
          :currency="'USD'"
          :amount="20"
          :email="'omedale@gmail.com'"
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
import store from '@/store'
export default {
  name: 'Checkout',
  mixins: [cartMixin],
  data () {
    return {
      shippings: [],
      form: this.$form.createForm(this),
      shippingId: 0,
      shippingFee: 0
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
    pay (e) {
      e.preventDefault()
      const vm = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          vm.checkout()
        }
      })
    },
    async getCheckOutData () {
      const response = await ConfigService.getCheckOutData()
      if (response.status === 200 && response.data.tax) {
        const data = response.data
        store.commit('ADD_CHECKOUT_DATA', { data })
      }
    },
    async checkout () {
      const { token, args } = await this.$refs.checkoutRef.open()
      console.log(token)
      console.log(args)
    },
    done ({token, args}) {
      console.log(token)
      console.log(args)
    },
    opened () {
      // do stuff
    },
    closed () {
      // do stuff
    },
    canceled () {
      // do stuff
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
