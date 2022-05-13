import axios from "axios"

const baseURL = "https://onlineo-backend.herokuapp.com/api"

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

export const addProductCatalogue = async (
  product,
  imagesArray,
  productTypeSelected,
  L1Selected,
  L2Selected,
  L3Selected,
  discountedPrice,
  discountGiven,
  comboEAN,
  containerEAN
) => {
  let addProductResponse

  let addProductBody = {
    dynamicHeader: product.heading,
    name: product.name,
    ean: product.EAN,
    description: product.description,
    type: productTypeSelected,
    stock: product.stock,
    qty: product.stock,
    hierarchyL1: L1Selected,
    hierarchyL2: L2Selected,
    hierarchyL3: L3Selected,
    modelNo: product.modelNumber,
    brand: product.brand,
    color: product.color,
    HSN: product.HSN,
    images: imagesArray,
    inwardDate: product.inwardDate,
    productInfo: {
      weight: product.weight,
      size: product.size,
      brand: product.brand,
      modelYear: product.modelYear,
      modelNo: product.modelNumber,
      color: product.color,
    },
    price: {
      mrp: product.MRP,
      mop: product.MOP,
      discountedPrice: discountedPrice
    },
    discount: {
      flatDiscount: discountGiven,
      combo: comboEAN,
      conetainer: containerEAN
    }
  }
  console.log(addProductBody);

  await axios.post(`${baseURL}/product/`, JSON.stringify(addProductBody), { headers })
    .then(res => {
      addProductResponse = res
    })

  return addProductResponse
}

//Delete Product From Catalogue
export const deleteProductCatalogue = async (id) => {
  let deleteProductResponse
  await axios.delete(`${baseURL}/product/${id}`, { headers })
    .then(res => {
      deleteProductResponse = res
    })

  return deleteProductResponse
}


//Update Product From Catalogue
export const updateProductCatalogue = async (id) => {
  let updateProductResponse
  let updateProductBody = {}
  await axios.patch(`${baseURL}/product/${id}`, JSON.stringify(updateProductBody), { headers })
    .then(res => {
      updateProductResponse = res
    })

  return updateProductResponse
}