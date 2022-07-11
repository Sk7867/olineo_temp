import axios from 'axios'

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

var userInfo = {
  id: '',
  fullName: '',
  mobileNumber: '',
  email: '',
  JWT: '',
  dob: null,
  addressData: [],
  cartData: []
}

// function update(value) {
//   let prevData = JSON.parse(sessionStorage.getItem('user'));
//   Object.keys(value).forEach(function (val, key) {
//     prevData[val] = value[val];
//   })
//   sessionStorage.setItem('user', JSON.stringify(prevData));
// }

//GET CART DATA
export const getCartData = async (token) => {
  let cartDataResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  let JWT = token ? token : userToken
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${JWT}`
  }

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/cart/`, { headers })
    .then(res => {
      if (res) {
        cartDataResponse = res.data.data
      }
    })
    .catch(err => console.log('Error:', err))

  return cartDataResponse
}

export const addToCart = async (id) => {
  let addToCartResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/cart/${id}`, {}, { headers })
    .then(res => {
      if (res) {
        addToCartResponse = res
      }
    })
    .catch(err => console.log('Error:', err))

  return addToCartResponse
}

export const removeFromCart = async (id) => {
  let removeFromCartResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/cart/${id}`, { headers })
    .then(res => {
      if (res) {
        removeFromCartResponse = res
      }
    })
    .catch(err => console.log('Error:', err))

  return removeFromCartResponse
}

