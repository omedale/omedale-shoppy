import axios from 'axios'
import store from '@/store'
export default () => {
  return axios.create({
    baseURL: `https://omedale-shop.herokuapp.com/`,
    headers: {
      'API-KEY': `Bearer ${store.state.customer.token}`
    }
  })
}
