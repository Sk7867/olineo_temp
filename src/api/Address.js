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
export const saveAddress = async (addressData) => {
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
    "landMark": addressData.user_Landmark
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
export const getAddress = async () => {
  let getAddressResponse
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
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