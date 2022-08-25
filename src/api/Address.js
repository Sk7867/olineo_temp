import axios from 'axios'

var userInfo = {
  id: '',
  fullName: '',
  mobileNumber: '',
  email: '',
  JWT: '',
  dob: null,
  addressData: [],
  cartData: []
}

// function update(value) {
//   let prevData = JSON.parse(sessionStorage.getItem('user'));
//   Object.keys(value).forEach(function (val, key) {
//     prevData[val] = value[val];
//   })
//   sessionStorage.setItem('user', JSON.stringify(prevData));
// }

//SAVE ADDRESS
export const saveAddress = async (addressData, defaultAdd) => {
  let saveAddressResponse
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let saveAddressBody = {
    "customerName": addressData.user_Full_Name,
    "phone": addressData.user_ph_Number,
    "address_line1": addressData.user_Address,
    "city": addressData.user_City,
    "state": addressData.user_State,
    "zip": addressData.user_Pincode,
    "landMark": addressData.user_Landmark,
    "isDefault": defaultAdd
  }

  await axios.post(`${process.env.REACT_APP_BASE_URL}/user/address/`, JSON.stringify(saveAddressBody), { headers })
    .then(res => {
      // console.log(res);
      saveAddressResponse = res
    })
    .catch(err => console.log('Error:', err))

  return saveAddressResponse
}

//GET ADDRESS
export const getAddress = async (JWT) => {
  let getAddressResponse
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  let tokenUsed = JWT ? JWT : userToken
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${tokenUsed}`
  }

  await axios.get(`${process.env.REACT_APP_BASE_URL}/user/address/`, { headers })
    .then(res => {
      getAddressResponse = res.data.data
      // console.log(getAddressResponse);
      // update({ addressData: getAddressResponse })
    })
    .catch(err => console.log('Error:', err))

  return getAddressResponse
}

//DELETE ADDRESS
export const deleteAddress = async (addressID) => {
  let deleteAddressResponse
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/address/${addressID}`, { headers })
    .then(res => {
      deleteAddressResponse = res
    })
    .catch(err => console.log(err))

  return deleteAddressResponse
}

//EDIT ADDRESS
export const editAddress = async (addressID, addressData, defaultAdd) => {
  let editAddressResponse
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let editAddressBody = {
    "customerName": addressData.user_Full_Name,
    "phone": addressData.user_ph_Number,
    "address_line1": addressData.user_Address,
    "city": addressData.user_City,
    "state": addressData.user_State,
    "zip": addressData.user_Pincode,
    "landMark": addressData.user_Landmark,
    "isDefault": defaultAdd
  }

  console.log(addressID);

  await axios.put(`${process.env.REACT_APP_BASE_URL}/user/address/${addressID}`, JSON.stringify(editAddressBody), { headers })
    .then(res => {
      // console.log(res);
      editAddressResponse = res
    })
    .catch(err => console.log('Error:', err))

  return editAddressResponse
}

//SET AS DEFAULT ADDRESS
export const setAddressDefault = async (addressId) => {
  let setDefaultAddressResponse
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let defaultBody = {
    "isDefault": true
  }

  await axios.put(`${process.env.REACT_APP_BASE_URL}/user/address/${addressId}`, JSON.stringify(defaultBody), { headers })
    .then(res => {
      // console.log(res);
      setDefaultAddressResponse = res
    })
    .catch(err => console.log('Error:', err))

  return setDefaultAddressResponse
}