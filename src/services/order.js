import Api from '@/services/Api'

export default {
  order (data) {
    return Api().post(`api/orders`, data)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  },
  charge (data) {
    return Api().post(`api/stripe/charge`, data)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  }
}
