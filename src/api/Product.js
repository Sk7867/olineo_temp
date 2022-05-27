import axios from 'axios'

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

//GET ALL PRODUCTS DATA
export const getAllProducts = async () => {
  let allProductsResponse

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product`, { headers })
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
  let indiProductResponse
  // console.log(query);

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product?${query}`, { headers })
    .then(res => {
      indiProductResponse = res.data.data.products
    })

  return indiProductResponse
}