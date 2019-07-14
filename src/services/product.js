import Api from '@/services/Api'

export default {
  getProducts (page) {
    return Api().get(`api/products?page=${page}`)
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      })
  }
}
