import axios from 'axios'


// ORDER INITIALIZATION +++++++++++++++++++++++++++++++++++++++
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
    shippingAddressId: data.shippingAddressId,
    coupon: data.coupon,
    type: data.type,
    storeId: data.storeId
  }
  // console.log(initBody);
  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/order/init`, JSON.stringify(initBody), { headers })
    .then(res => {
      initResponse = res.data.data.order
    })

  return initResponse
}

//Test comment to include file in commit - 01/10/2022

// ORDER PLACED +++++++++++++++++++++++++++++++++++++++++++++++++++
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

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/order`, JSON.stringify(completeBody), { headers })
    .then(res => {
      completeOrderResponse = res
    })

  return completeOrderResponse
}


//GET ALL ORDERS +++++++++++++++++++++++++++++++++++++++++++
export const getAllOrder = async (token) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  let JWT = token ? token : userToken

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${JWT}`
  }

  let allOrderResponse

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/order/`, { headers })
    .then(res => {
      allOrderResponse = res.data.data
    })
  // console.log(allOrderResponse);
  return allOrderResponse

}

// GET INDIVIDUAL ORDER Details ++++++++++++++++++++++++++++++++++++++
export const getIndiOrder = async (id) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let indiOrderResponse

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/order/details/${id}`, { headers })
    .then(res => {
      indiOrderResponse = res
      // console.log(indiOrderResponse);
    })

  return indiOrderResponse

}


//Get Individual Order Status +++++++++++++++++++++++++++++
export const getOrderStatus = async (id) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let orderStatusResponse
  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/order/status/${id}`, { headers })
    .then(res => {
      orderStatusResponse = res.data.data
      // console.log(orderStatusResponse);
    })

  return orderStatusResponse
}

//Cancel Order
export const cancelOrder = async (order_Id, itemId, query) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let data = {
    orderId: order_Id,
    itemId: [itemId],
    reason: query
  }

  let orderDeleteResponse

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/order/`, JSON.stringify(data), { headers })
    .then(res => {
      orderDeleteResponse = res
    })

  return orderDeleteResponse
}

//Payment Init
export const paymentInit = async (id) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let paymentInitResponse
  await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/init/${id}`, { headers })
    .then(res => {
      paymentInitResponse = res.data.link
      console.log(paymentInitResponse);
    })

  return paymentInitResponse
}