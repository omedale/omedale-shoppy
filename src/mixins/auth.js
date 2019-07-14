import CustomerService from '@/services/customer'
import store from '@/store'
export default {
  methods: {
    async authCustomer (data, authType) {
      this.errorMessage = ''
      this.loading = true
      let response = {}
      const succesCode = authType === 'register' ? 201 : 200
      if (authType === 'register') {
        response = await CustomerService.register(data)
      } else {
        response = await CustomerService.login(data)
      }
      if (response.status === succesCode && response.data.customer) {
        const customer = response.data.customer.schema
        const token = response.data.accessToken
        store.commit('UPDATE_CUSTOMER_INFO', { customer, token })
        const nextRoute = this.$route.query.redirect || '/'
        this.$router.replace(nextRoute)
      } else {
        this.errorMessage = response.data.error ? response.data.error.message : ''
      }
      this.loading = false
    }
  }
}
