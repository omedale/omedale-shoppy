import { mapGetters } from 'vuex'
import Dinero from 'dinero.js'
import CartService from '@/services/cart'
import store from '@/store'
export default {
  data () {
    return {
      language: 'en-US',
      shippingPrice: 0,
      loading: false,
      shippingFee: 0
    }
  },
  computed: {
    ...mapGetters(['cartId', 'carts', 'totalItem', 'currentTaxRate', 'currentTaxId', 'regions']),
    getShippingPrice () {
      return this.toPrice(this.shippingPrice)
    },
    getTaxAmount () {
      return this.getSubtotal.percentage(this.currentTaxRate)
    },
    getSubtotal () {
      return this.carts.reduce(
        (cum, item) => cum.add(this.toPrice(parseFloat(item.discounted_price) > 0
          ? parseFloat(item.discounted_price) : parseFloat(item.price)).multiply(item.quantity)),
        Dinero().setLocale(this.language)
      )
    },
    getTotal () {
      const shippingFee = this.toPrice(this.shippingFee)
      return this.getSubtotal.add(this.getTaxAmount).add(this.getShippingPrice).add(shippingFee)
    }
  },
  methods: {
    toPrice (amount, factor = Math.pow(10, 2)) {
      return Dinero({ amount: Math.round(amount * factor) }).setLocale(
        this.language
      )
    },
    async addOrUpdateCart (data, quantity) {
      this.loading = true
      this.errorMessage = ''
      let response = {}
      const item = this.getItem(data)
      if (item.length) {
        const newQuantity = item[0].quantity + quantity
        if (newQuantity <= 0) {
          const itemId = item[0].item_id
          response = await CartService.removeProduct(itemId)
          if (response.status === 200 && response.data) {
            store.commit('REMOVE_CART', { itemId })
          }
          return
        }
        const updateParams = {
          item_id: item[0].item_id,
          quantity: newQuantity
        }
        response = await CartService.updateCart(updateParams)
      } else {
        response = await CartService.addCart(data)
      }
      if (response.status === 200 && response.data) {
        const carts = response.data
        store.commit('ADD_CARTS', { carts })
      }
      this.errorMessage = ''
      this.loading = false
    },
    getItem (data) {
      return this.carts.filter(item =>
        (parseInt(item.product_id) === parseInt(data.product_id)) &&
        (item.attributes === data.attributes))
    }
  }
}
