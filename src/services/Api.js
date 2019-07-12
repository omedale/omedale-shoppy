import axios from 'axios'
import store from '@/store'
export default () => {
  return axios.create({
    baseURL: `http://localhost:8000/`,
    headers: {
      Authorization: `Bearer ${store.state.customer.userToken}`
    }
  })
}
