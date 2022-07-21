import axios from "axios";

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  "Content-Type": "application/json",
  "Access-Control-Allow-origin": "*",
};

//GET COUPON
export const getCoupon = async () => {
  let getCouponResponse

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/coupon`, { headers })
    .then(res => {
      getCouponResponse = res
    })

  return getCouponResponse
}

export const checkCoupon = async (code) => {
  let checkCouponRes

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/coupon/${code}`, { headers })
    .then(res => {
      checkCouponRes = res
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    })

  return checkCouponRes
}

//Add coupon to product
export const addCoupon = async (couponOffersHold, products) => {
  let addCouponBody = {
    code: couponOffersHold.couponName,
    discount: couponOffersHold.value,
    maxAmount: couponOffersHold.upTo,
    expire: couponOffersHold.to,
    products: [...products]
  }
  console.log(addCouponBody);

  let addCouponResponse
  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/coupon`, JSON.stringify(addCouponBody), { headers })
    .then(res => {
      addCouponResponse = res
    })

  return addCouponResponse
}

//Update Coupon
export const updateCoupon = async (id) => {
  let updateCouponBody = {
    discount: ''
  }
  let updateCouponResponse

  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/coupon/${id}`, JSON.stringify(updateCouponBody), { headers })
    .then(res => {
      updateCouponResponse = res
    })

  return updateCouponResponse
}

//Delete Coupon
export const deleteCoupon = async (id) => {
  let deleteCouponResponse

  await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/coupon/${id}`, { headers })
    .then(res => {
      deleteCouponResponse = res
    })

  return deleteCouponResponse
}