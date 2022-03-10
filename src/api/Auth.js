import axios from 'axios'

const baseURL = "https://onlineo-backend.herokuapp.com/api"

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

var userInfo = {
  id: '',
  name: '',
  contact: '',
  email: '',
  JWT: '',
}

var userRef

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
      // console.log(userRef);
    })
    .catch(err => console.log('Error:', err))

  return signupResponse
}

//Verify OTP----------------
export const verifyOtp = async (otp) => {
  let otpResponse;
  console.log(otp, typeof (otp));

  const otpData = JSON.stringify({
    "otp": otp,
  })

  await axios.put(`${baseURL}/user/verifyOtp/${userRef}`, otpData, { headers })
    .then(res => {
      console.log(res);
      if (res) {
        otpResponse = res.data
        userInfo.JWT = otpResponse.JWT
        window.sessionStorage.setItem("user", JSON.stringify(userInfo))
        const saveUserData = {
          id: userInfo.id,
          name: userInfo.name,
          contact: userInfo.contact,
          email: userInfo.email,
          JWT: userInfo.JWT
        }
      }
    })

  console.log(userInfo);
  return otpResponse
}

//SAVE USER-------------------------------
export const saveUser = async (userData) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  console.log(userData);

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let resUser;

  await axios.post(`${process.env.REACT_APP_BASE_URL}`, JSON.stringify(userData), { headers })
    .then(res => {
      resUser = res.data
    })
    .catch(err => console.log('Error:', err))

  return resUser
}

//LOGOUT USER----------------------------
export const logoutUser = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'))

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${user.JWT}`
  }

  let response

  await axios.post(`${process.env.REACT_APP_BASE_URL}`, {}, { headers })
    .then(res => {
      if (res) {
        sessionStorage.clear()
        window.location.href = '/'
      }
    })
    .catch(err => console.log('Error:', err))

  return response
}