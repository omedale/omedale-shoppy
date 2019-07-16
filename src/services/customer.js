import Api from '@/services/Api'

export default {
  login (data) {
    return Api().post(`api/customer/login`, data)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  },
  register (data) {
    return Api().post(`api/customer`, data)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  },
  updateAddress (data) {
    return Api().put(`api/customers/address`, data)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  }
}
