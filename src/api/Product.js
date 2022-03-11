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

  await axios.get(`${baseURL}/product/getAllProduct`, { headers })
    .then(res => {
      allProductsResponse = res.data.styles.styleList
      console.log(allProductsResponse);
    })

  return allProductsResponse
}
