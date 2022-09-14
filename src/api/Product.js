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
