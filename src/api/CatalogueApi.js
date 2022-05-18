import axios from "axios"

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

export const addProductCatalogue = async (
  product,
  dynamicHeader,
  imagesArray,
  galleryImagesArray,
  L1Selected,
  L2Selected,
  L3Selected,
  classificationSelected,
  discountedPrice,
  flatDiscountDetails,
  comboOfferDetails,
  containerDetails
) => {
  let addProductResponse
  console.log(galleryImagesArray);

  let addProductBody = {
    dynamicHeader: dynamicHeader,
    name: product.name,
    ean: product.EAN,
    description: product.description,
    type: L2Selected,
    stock: product.stock,
    qty: product.stock,
    hierarchyL1: L1Selected,
    hierarchyL2: L2Selected,
    hierarchyL3: L3Selected,
    classification: classificationSelected,
    modelNo: parseInt(product.modelNumber),
    brand: product.brand,
    color: product.color,
    HSN: product.HSN,
    images: imagesArray,
    gallery: galleryImagesArray,
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
      flatDiscount: flatDiscountDetails,
      combo: comboOfferDetails,
      conetainer: containerDetails
    }
  }
  console.log(addProductBody);

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/`, JSON.stringify(addProductBody), { headers })
    .then(res => {
      addProductResponse = res
    })

  return addProductResponse
}

//Delete Product From Catalogue
export const deleteProductCatalogue = async (id) => {
  let deleteProductResponse
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/${id}`, { headers })
    .then(res => {
      deleteProductResponse = res
    })

  return deleteProductResponse
}


//Update Product From Catalogue
export const updateProductCatalogue = async (id) => {
  let updateProductResponse
  let updateProductBody = {}
  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/${id}`, JSON.stringify(updateProductBody), { headers })
    .then(res => {
      updateProductResponse = res
    })

  return updateProductResponse
}