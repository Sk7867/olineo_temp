import axios from 'axios'

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

export const getAllWishlistItems = async () => {
  let allWishlistResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/wishlist/`, { headers })
    .then(res => {
      if (res) {
        allWishlistResponse = res.data.data
        // console.log(allWishlistResponse);
      }
    })
    .catch(err => console.log('Error:', err))

  return allWishlistResponse
}

export const addToWishlist = async (id) => {
  let addToWishlistResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  // console.log(token);

  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/wishlist/${id}`, {}, { headers })
    .then(res => {
      if (res) {
        addToWishlistResponse = res
        // console.log(addToWishlistResponse);
      }
    })
    .catch(err => console.log('Error:', err))

  return addToWishlistResponse
}

export const deleteFromWishlist = async (id) => {
  let deleteFromWishlistResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/wishlist/${id}`, { headers })
    .then(res => {
      if (res) {
        deleteFromWishlistResponse = res
        // console.log(deleteFromWishlistResponse);
      }
    })
    .catch(err => console.log('Error:', err))

  return deleteFromWishlistResponse
}

export const deleteAllWishlistItems = async () => {
  let deleteAllWishlistResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/wishlist/`, { headers })
    .then(res => {
      if (res) {
        deleteAllWishlistResponse = res
        // console.log(deleteAllWishlistResponse);
      }
    })
    .catch(err => console.log('Error:', err))

  return deleteAllWishlistResponse
}