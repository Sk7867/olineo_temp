import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const baseURL = "https://onlineo-backend.herokuapp.com/api"

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

var userInfo = {
  id: '',
  fullName: '',
  mobileNumber: '',
  email: '',
  JWT: '',
}

var userRef

function update(value) {
  let prevData = JSON.parse(sessionStorage.getItem('user'));
  Object.keys(value).forEach(function (val, key) {
    prevData[val] = value[val];
  })
  sessionStorage.setItem('user', JSON.stringify(prevData));
}

//User Login----------------
export const userLogin = async (contact) => {
  const loginData = JSON.stringify({
    "mobileNumber": `${contact}`,
  })

  let loginResponse

  await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, loginData, { headers })
    .then(res => {
      console.log(res);
      loginResponse = res.data
      userRef = loginResponse.userId
    }
    )
    .catch(err => { console.log('Error:', err) })

  return loginResponse
}

//User Signup---------------
export const userSignUp = async (contact, name) => {
  const signUpData = JSON.stringify(
    {
      "mobileNumber": `${contact}`,
      "fullName": `${name}`
    }
  )

  let signupResponse

  await axios.post(`${baseURL}/user/signup`, signUpData, { headers })
    .then(res => {
      signupResponse = res.data
      userRef = signupResponse.userId
      userInfo.fullName = name
      userInfo.mobileNumber = contact
      window.sessionStorage.setItem("user", JSON.stringify(userInfo))
      // console.log(userRef);
    })
    .catch(err => console.log('Error:', err))

  return signupResponse
}

//Verify OTP----------------
export const verifyOtp = async (otp) => {
  let otpResponse;
  // console.log(otp, typeof (otp));

  const otpData = JSON.stringify({
    "otp": otp,
  })

  await axios.put(`${baseURL}/user/verifyOtp/${userRef}`, otpData, { headers })
    .then(res => {
      if (res) {
        otpResponse = res.data
        userInfo.JWT = otpResponse.JWT
        window.sessionStorage.setItem("user", JSON.stringify(userInfo))
        getUser()
        // const saveUserData = {
        //   id: userInfo.id,
        //   name: userInfo.fullName,
        //   contact: userInfo.contact,
        //   email: userInfo.email,
        //   JWT: userInfo.JWT
        // }
      }
    })

  // console.log(userInfo);
  return otpResponse
}

//GET USER DATA
export const getUser = async () => {
  let getUserResponse
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.get(`${baseURL}/user/myProfile`, { headers })
    .then(res => {
      if (res) {
        getUserResponse = res.data.data.user
        userInfo.id = getUserResponse._id
        userInfo.fullName = getUserResponse.fullName
        userInfo.mobileNumber = getUserResponse.mobileNumber
        window.sessionStorage.setItem("user", JSON.stringify(userInfo))
      }
    })
    .catch(err => console.log('Error:', err))
  return getUserResponse

}

//SAVE USER-------------------------------
export const saveUser = async (userData) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  // console.log(userData);

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }
  userInfo.fullName = userData.user_Full_Name
  userInfo.mobileNumber = userData.user_ph_Number
  userInfo.email = userData.user_Email

  let resUser;

  await axios.put(`${process.env.REACT_APP_BASE_URL}/user/updateProfile`, JSON.stringify(userInfo), { headers })
    .then(res => {
      resUser = res.data
      window.sessionStorage.setItem("user", JSON.stringify(userInfo))
    })
    .catch(err => console.log('Error:', err))

  return resUser
}

//LOGOUT USER----------------------------
export const logOutUser = async () => {

  let user = JSON.parse(sessionStorage.getItem('user'))

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${user.JWT}`
  }

  let response

  await axios.post(`${baseURL}/`, { headers })
    .then(res => {
      if (res) {
        window.sessionStorage.clear()
        window.location.href = '/'
      }
    })
    .catch(err => console.log('Error:', err))

  return response
}