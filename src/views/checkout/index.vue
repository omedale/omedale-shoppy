<template>
  <div class="container">
      <div class="py-5 text-center">
         <h2>Checkout</h2>
      </div>
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart</span>
            <span class="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Product name</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$12</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Second product</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$8</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Third item</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span class="text-success">-$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$20</strong>
            </li>
          </ul>

           <form class="card p-2">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Promo code">
              <div class="input-group-append">
                <button type="submit" class="btn btn-secondary">Redeem</button>
              </div>
            </div>
          </form>
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
                    label="Country"
                    has-feedback
                    >
                      <a-select
                        v-decorator="[
                          'country',
                          {rules: [{ required: true, message: 'Please select your country!' }]}
                        ]"
                        placeholder="Please select a country"
                        @change="getStates"
                      >
                        <a-select-option :key="country.countryName" v-for="country in countries" :value="JSON.stringify(country)">
                          {{country.countryName}}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                <a-col :span="8">
                  <a-form-item
                    label="State"
                    has-feedback
                    >
                      <a-select
                        v-decorator="[
                          'state',
                          {rules: [{ required: true, message: 'Please select your state!' }]}
                        ]"
                        placeholder="Please select a state"
                      >
                        <a-select-option :key="state.adminName1" v-for="state in states" :value="JSON.stringify(state)">
                          {{ state.adminName1 }}
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
          :cardnumber="'4242 4242 4242 4242'"
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
import Geonames from 'geonames.js'
const geonames = new Geonames({username: 'omedale', lan: 'en', encoding: 'JSON'})
export default {
  name: 'Checkout',
  data () {
    return {
      countries: [],
      states: []
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    pay (e) {
      e.preventDefault()
      const vm = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          vm.checkout()
        }
      })
    },
    async getStates (value) {
      const country = JSON.parse(value)
      const response = await geonames.children({geonameId: country.geonameId})
      if (response.geonames) {
        this.states = response.geonames
      }
    },
    async setCountries () {
      const response = await geonames.countryInfo({})
      if (response.geonames) {
        this.countries = response.geonames
      }
    },
    async checkout () {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      const { token, args } = await this.$refs.checkoutRef.open()
      console.log(token)
      console.log(args)
    },
    closed () {
      // do stuff
    },
    canceled () {
      // do stuff
    },
    done ({token, args}) {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      // do stuff...
      console.log(token)
      console.log(args)
    },
    opened () {
      // do stuff
    }
  },
  mounted () {
    this.setCountries()
  }
}
</script>
<style scoped>
  .action-button {
    width: 130px;
  }
</style>
