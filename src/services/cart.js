import Api from '@/services/Api'

 export default {
  addCart (data) {
    return Api().post(`api/shoppingcart/add`, data)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  },
  updateCart (data) {
    return Api().put(`api/shoppingcart/update/${data.item_id}`, data)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  },
  getAllCartItem (cartId) {
    return Api().get(`api/shoppingcart/${cartId}`)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  },
  generateUniqueCartId () {
    return Api().get(`api/shoppingcart/generateUniqueId`)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  },
  removeProduct (itemId) {
    return Api().delete(`api/shoppingcart/removeProduct/${itemId}`)
      .then(resp => {
        return resp
      })
      .catch(error => {
        return error.response
      })
  }
}
