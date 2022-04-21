import axios from 'axios'

const baseURL = "https://onlineo-backend.herokuapp.com/api"

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
export const getCartData = async () => {
  let cartDataResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.get(`${baseURL}/product/cart/`, { headers })
    .then(res => {
      if (res) {
        cartDataResponse = res.data.data

        console.log(cartDataResponse);
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
    "authorization": `bearer ${userToken}`
  }
  console.log(id);
  console.log(userToken);

  await axios.patch(`${baseURL}/product/cart/${id}`, { headers })
    .then(res => {
      if (res) {
        addToCartResponse = res
        console.log(addToCartResponse);
      }
    })
    .catch(err => console.log('Error:', err))

  return addToCartResponse
}