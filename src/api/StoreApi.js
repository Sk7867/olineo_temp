import axios from 'axios'

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

//Get Store Location based on user position
export const getStoreLocation = async (ean, quantity, pin) => {
  let locationResponse
  // let locationBody = {
  //   latitude: loc.coords.latitude,
  //   longitude: loc.coords.longitude
  // }

  const findStoreBody = {
    eancode: ean,
    qty: quantity,
    pincode: pin
  }

  console.log(findStoreBody);

  await axios.post(`${process.env.REACT_APP_BASE_URL}/store/findstore`, JSON.stringify(findStoreBody), { headers })
    .then(res => {
      locationResponse = res.data.data
    })
    .catch(err => { console.log('Error:', err) })

  return locationResponse
}

//Search store using Pincodes
export const getStoreUsingPincode = async (zip) => {
  let getStoreUsingPincodesRes

  let serviceBody = {
    location: zip,
    items: []
  }

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/order/checkServiceability/`, JSON.stringify(serviceBody), { headers })
    .then(res => {
      getStoreUsingPincodesRes = res.data
    })

  return getStoreUsingPincodesRes
}

//Get Store Inventory
export const getStoreInventory = async (id) => {
  let getStoreInventoryRes

  if (id) {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/store/getStoreInventory/${id}`, { headers })
      .then(res => {
        getStoreInventoryRes = res.data
      })
  }

  return getStoreInventoryRes
}