import Api from '@/services/Api'

export default {
  getFilterConfigData () {
    return Api().get(`api/config/filter-data`)
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  },
  getCheckOutData () {
    return Api().get(`api/config/checkout-data`)
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }
}
