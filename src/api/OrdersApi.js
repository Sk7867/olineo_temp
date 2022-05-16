import axios from 'axios'
const baseURL = "https://onlineo-backend.herokuapp.com/api"

export const initOrder = async (data) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  let initResponse

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let initBody = {
    productId: data.productId,
    quantity: data.quantity,
    shippingAddressId: data.shippingAddressId
  }

  await axios.post(`${baseURL}/product/order/init`, JSON.stringify(initBody), { headers })
    .then(res => {
      initResponse = res
    })

  return initResponse
}

export const completeOrder = async (id) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  let completeOrderResponse

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let completeBody = {
    orderId: id
  }

  await axios.post(`${baseURL}/product/order/init`, JSON.stringify(completeBody), { headers })
    .then(res => {
      completeOrderResponse = res
    })

  return completeOrderResponse
}

