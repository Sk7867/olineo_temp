import axios from 'axios'

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
  token: '',
}

//User Login----------------
export const userLogin = async (contact) => {
  const loginData = JSON.stringify({
    mobileNumber: `${contact}`,
  })

  let loginResponse

  await axios.post(`${process.env.REACT_APP_BASE_URL}/user/sendotp`, loginData, { headers })
    .then(res => {
      console.log(res);
    }
    )
    .catch(err => { console.log('Error:', err) })

  return loginResponse
}

//User Signup---------------
export const userSignUp = async (contact, name) => {
  const signUpData = JSON.stringify({
    mobileNumber: `${contact}`,
    fullName: `${name}`
  })

  let signupResponse

  await axios.post(`${process.env.REACT_APP_BASE_URL}`, signUpData, { headers })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log('Error:', err))

  return signupResponse
}

//Verify OTP----------------
export const verifyOtp = async (contact, otp) => {
  let otpResponse;

  const otpData = JSON.stringify({
    mobileNumber: `${contact}`,
    otp: `${otp}`,
  })

  await axios.post(`${process.env.REACT_APP_BASE_URL}`, otpData, { headers })
    .then(res => {
      console.log(res);
      // if(res) {
      //   otpResponse = res.data
      //   userInfo.token = otpResponse.token
      //   window.sessionStorage.setItem("user", JSON.stringify(userInfo))
      //   const saveUserData = {
      //     id: userInfo.id,
      //     name: userInfo.name,
      //     contact: userInfo.contact,
      //     email: userInfo.email,
      //   }
      // }
    })
}

//SAVE USER-------------------------------
export const saveUser = async (userData) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).token : ''

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
    "Authorization": `Bearer ${user.token}`
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