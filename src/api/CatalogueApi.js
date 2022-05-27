import axios from "axios"

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

export const addProductCatalogue = async (
  product,
  technicalDetailsTable,
  dynamicHeader,
  url,
  imagesArray,
  galleryImagesArray,
  L1Selected,
  L2Selected,
  L3Selected,
  discountedPrice,
  classificationSelected,
  flatDiscountDetails,
  comboOfferDetails,
  containerDetails,
  alternateProds,
  bankOffers
) => {
  let addProductResponse

  let addProductBody = {
    dynamicHeader: dynamicHeader,
    name: product.name,
    ean: product.EAN,
    slug: url,
    description: product.description,
    type: L2Selected,
    stock: product.stock,
    qty: product.stock,
    hierarchyL1: L1Selected,
    hierarchyL2: L2Selected,
    hierarchyL3: L3Selected,
    classification: classificationSelected,
    modelNo: technicalDetailsTable.modelNumber,
    brand: technicalDetailsTable.brand,
    color: technicalDetailsTable.color,
    HSN: product.HSN,
    images: imagesArray,
    gallery: galleryImagesArray,
    inwardDate: product.inwardDate,
    productInfo: technicalDetailsTable,
    price: {
      mrp: product.MRP,
      mop: product.MOP,
      discountPrice: discountedPrice
    },
    discount: {
      flatDiscount: flatDiscountDetails,
      combo: comboOfferDetails,
      conetainer: containerDetails
    },
    altProduct: alternateProds,
    offers: bankOffers
  }
  // console.log(addProductBody);

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/`, JSON.stringify(addProductBody), { headers })
    .then(res => {
      addProductResponse = res
    })

  return addProductResponse
}

export const addBulkOrder = async (order) => {
  let addProductResponse
  // console.log(order);

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/`, JSON.stringify(order), { headers })
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
export const updateProductCatalogue = async (
  product,
  technicalDetailsTable,
  dynamicHeader,
  url,
  imagesArray,
  galleryImagesArray,
  L1Selected,
  L2Selected,
  L3Selected,
  discountedPrice,
  classificationSelected,
  flatDiscountDetails,
  comboOfferDetails,
  containerDetails,
  alternateProds,
  bankOffers
) => {
  let updateProductResponse
  let updateProductBody = {
    dynamicHeader: dynamicHeader,
    name: product.name,
    ean: product.EAN,
    slug: url,
    description: product.description,
    type: L2Selected,
    stock: product.stock,
    qty: product.stock,
    hierarchyL1: L1Selected,
    hierarchyL2: L2Selected,
    hierarchyL3: L3Selected,
    classification: classificationSelected,
    modelNo: technicalDetailsTable.modelNumber,
    brand: technicalDetailsTable.brand,
    color: technicalDetailsTable.color,
    HSN: product.HSN,
    images: imagesArray,
    gallery: galleryImagesArray,
    inwardDate: product.inwardDate,
    productInfo: technicalDetailsTable,
    price: {
      mrp: product.MRP,
      mop: product.MOP,
      discountPrice: discountedPrice
    },
    discount: {
      flatDiscount: flatDiscountDetails,
      combo: comboOfferDetails,
      conetainer: containerDetails
    },
    altProduct: alternateProds,
    offers: bankOffers
  }
  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/${product.ID}`, JSON.stringify(updateProductBody), { headers })
    .then(res => {
      updateProductResponse = res
    })

  return updateProductResponse
}