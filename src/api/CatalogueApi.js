import axios from "axios"

const baseURL = "https://onlineo-backend.herokuapp.com/api"

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

export const addProductCatalogue = async (product, imagesArray) => {
  let addProductResponse

  let addProductBody = {
    name: product.name,
    ID: product.ID,
    ean: product.EAN,
    description: product.description,
    type: product.type,
    price: product.price,
    stock: product.stock,
    qty: product.stock,
    productInfo: {
      weight: product.weight,
      size: product.size,
      brand: product.brand,
      modelYear: product.modelYear
    },
    images: imagesArray
  }

  await axios.post(`${baseURL}/product/`, JSON.stringify(addProductBody), { headers })
    .then(res => {
      addProductResponse = res
    })

  return addProductResponse
}