import axios from "axios";

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  "Content-Type": "application/json",
  "Access-Control-Allow-origin": "*",
};

//GET ALL PRODUCTS DATA
export const getAllProducts = async (query) => {
  let allProductsResponse;

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product?${query}`, { headers }).then((res) => {
    allProductsResponse = res.data.data;
    // console.log(allProductsResponse);
  });

  return allProductsResponse;
};

//GET INDIVIDUAL PRODUCT
export const getIndiProduct = async (id) => {
  let indiProductResponse;

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`, { headers }).then((res) => {
    indiProductResponse = res.data.data.product;
    // console.log(indiProductResponse);
  });

  return indiProductResponse;
};

//GET SEARCHED PRODUCT
export const getSearchedProduct = async (query) => {
  let searchedProductRes;
  // console.log(query);

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product?${query}`, { headers }).then((res) => {
    searchedProductRes = res.data.data;
  });

  return searchedProductRes;
};

//Get Product Serviceability
export const getProductServiceability = async (zip, prodArray) => {
  let productServiceabilityRes

  let serviceBody = {
    location: zip,
    items: prodArray
  }

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/order/checkServiceability/`, JSON.stringify(serviceBody), { headers })
    .then(res => {
      productServiceabilityRes = res.data.data.items
    })

  return productServiceabilityRes
}

//Get all interested product leads
//Pass query with api call for store wise leads
export const getAllInterestedProds = async (query) => {
  let getAllInterestedProdsRes
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/interested-product?${query}`, { headers })
    .then(res => {
      getAllInterestedProdsRes = res
    })

  return getAllInterestedProdsRes
}

//Add Product Interested
export const addProductInterested = async (storeCode, prodId) => {
  let addProdInterestedRes = true

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let interestedProdBody = {
    storeId: storeCode,
    productId: prodId
  }

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/interested-product/`, JSON.stringify(interestedProdBody), { headers })
    .then(res => {
      addProdInterestedRes = res
      console.log(addProdInterestedRes);
    })

  return addProdInterestedRes
}

//Remove interested Product lead
export const removeInterestedProduct = async (id) => {
  let removeInterestedProductRes

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/interested-product/${id}`, { headers })
    .then(res => {
      removeInterestedProduct = res
    })

  return removeInterestedProductRes
}