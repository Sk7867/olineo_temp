import axios from 'axios'

const baseURL = "https://onlineo-backend.herokuapp.com/api"

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

//GET ALL PRODUCTS DATA
export const getAllProducts = async () => {
  let allProductsResponse

  await axios.get(`${baseURL}/product`, { headers })
    .then(res => {
      allProductsResponse = res.data.data
      // console.log(allProductsResponse);
    })

  return allProductsResponse
}


//GET INDIVIDUAL PRODUCT
export const getIndiProduct = async (id) => {
  let indiProductResponse

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`, { headers })
    .then(res => {
      indiProductResponse = res.data.data.product
      // console.log(indiProductResponse);
    })

  return indiProductResponse
}

//GET SEARCHED PRODUCT
export const getSearchedProduct = async (query) => {
  let indiProductResponse = true
  console.log(query);

  // await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`, { headers })
  //   .then(res => {
  //     indiProductResponse = res.data.data.product
  //     // console.log(indiProductResponse);
  //   })

  return indiProductResponse
}