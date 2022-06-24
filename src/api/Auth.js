import axios from 'axios'

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

// var userInfo = {
//   id: '',
//   fullName: '',
//   mobileNumber: '',
//   email: '',
//   JWT: '',
//   dob: null,
// }

var loginRef
var signupRef
var loginEmailRef

// function update(value) {
//   let prevData = JSON.parse(sessionStorage.getItem('user'));
//   sessionStorage.setItem('user', JSON.stringify(userInfo));
//   if (value) {
//     Object.keys(value).forEach(function (val, key) {
//       prevData[val] = value[val];
//       userInfo[val] = value[val]
//     })
//     sessionStorage.setItem('user', JSON.stringify(prevData));
//   }
// }
// update()
// console.log(userInfo);

//User Login----------------
export const userLogin = async (contact) => {
  const loginData = JSON.stringify({
    "mobileNumber": `${contact}`,
  })

  let loginResponse

  await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, loginData, { headers })
    .then(res => {
      // console.log(res);
      loginResponse = res.data
      loginRef = loginResponse.userId
      // userInfo.id = loginResponse.userId
      // console.log(loginRef);
    })
    .catch(err => { console.log('Error:', err) })

  return loginResponse
}


//User Login Email--------------------
export const userLoginEmail = async (email) => {
  const loginData = JSON.stringify({
    "email": email
  })

  let loginResponse

  await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup/email`, loginData, { headers })
    .then(res => {
      loginResponse = res
      loginRef = res.data.userId
      // console.log(loginRef);
      // console.log(loginResponse);
    })

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

  await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, signUpData, { headers })
    .then(res => {
      signupResponse = res.data
      // console.log(signupResponse);

      signupRef = signupResponse.userId

      // userInfo.fullName = name
      // userInfo.mobileNumber = contact
      // userInfo.id = signupRef

      // window.sessionStorage.setItem("user", JSON.stringify(userInfo))
    })
    .catch(err => console.log('Error:', err))

  return signupResponse
}

//Verify OTP LOGIN----------------
export const verifyOtpLogin = async (otp, existingUser) => {
  let otpResponse;
  // console.log(otp, typeof (otp));

  const otpData = JSON.stringify({
    "otp": otp,
  })

  await axios.put(`${process.env.REACT_APP_BASE_URL}/user/verifyOtp/${loginRef}`, otpData, { headers })
    .then(res => {
      if (res) {
        otpResponse = res.data
        // userInfo.fullName = ''
        // userInfo.mobileNumber = ''
        // userInfo.id = ''
        // userInfo.email = ''
        // userInfo.JWT = otpResponse.JWT
        // userInfo.dob = null
        // window.sessionStorage.setItem("user", JSON.stringify(userInfo))
        // userInfo.JWT = otpResponse.JWT
        // console.log(existingUser);
        // const saveUserData = {
        //   id: userInfo.id,
        //   name: userInfo.fullName,
        //   contact: userInfo.contact,
        //   email: userInfo.email,
        //   JWT: userInfo.JWT
        // }
      }
    })
    .catch(err => console.log('Error:', err))

  // console.log(userInfo);
  return otpResponse
}

// export const verifyOtpLoginEmail = async (otp) => {
//   let otpResponse;
//   // console.log(otp, typeof (otp));

//   const otpData = JSON.stringify({
//     "otp": otp,
//   })

//   await axios.put(`${process.env.REACT_APP_BASE_URL}/user/verifyOtp/${loginRef}`, otpData, { headers })
//     .then(res => {
//       if (res) {
//         otpResponse = res.data
//         // userInfo.fullName = ''
//         // userInfo.mobileNumber = ''
//         // userInfo.id = ''
//         // userInfo.email = ''
//         // userInfo.JWT = otpResponse.JWT
//         // userInfo.dob = null
//         // window.sessionStorage.setItem("user", JSON.stringify(userInfo))
//         // userInfo.JWT = otpResponse.JWT
//         // console.log(existingUser);
//         // const saveUserData = {
//         //   id: userInfo.id,
//         //   name: userInfo.fullName,
//         //   contact: userInfo.contact,
//         //   email: userInfo.email,
//         //   JWT: userInfo.JWT
//         // }
//       }
//     })
//     .catch(err => console.log('Error:', err))

//   // console.log(userInfo);
//   return otpResponse
// }

//Verify OTP SIGNUP----------------
export const verifyOtpSignup = async (otp) => {
  let otpResponse;
  // console.log(otp, typeof (otp));

  const otpData = JSON.stringify({
    "otp": otp,
  })

  await axios.put(`${process.env.REACT_APP_BASE_URL}/user/verifyOtp/${signupRef}`, otpData, { headers })
    .then(res => {
      if (res) {
        otpResponse = res.data.JWT
        // userInfo.JWT = otpResponse.JWT
        // window.sessionStorage.setItem("user", JSON.stringify(userInfo))
        // console.log(otpResponse);
        // console.log(userInfo);

        // userInfo.JWT = otpResponse.JWT
        // console.log(existingUser);
        // const saveUserData = {
        //   id: userInfo.id,
        //   name: userInfo.fullName,
        //   contact: userInfo.contact,
        //   email: userInfo.email,
        //   JWT: userInfo.JWT
        // }
      }
    })
    .catch(err => console.log('Error:', err))

  // console.log(userInfo);
  return otpResponse
}

//GET USER DATA
export const getUser = async (JWT) => {
  let getUserResponse
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${JWT}`
  }
  // console.log(userToken);

  await axios.get(`${process.env.REACT_APP_BASE_URL}/user/myProfile`, { headers })
    .then(res => {
      if (res) {
        getUserResponse = res.data.data.user
        // userInfo.fullName = getUserResponse.fullName
        // userInfo.mobileNumber = getUserResponse.mobileNumber
        // userInfo.id = getUserResponse._id
        // userInfo.email = getUserResponse.email
        // userInfo.dob = getUserResponse.dob

        // userInfo.id = getUserResponse._id
        // userInfo.fullName = getUserResponse.fullName
        // userInfo.mobileNumber = getUserResponse.mobileNumber
        // userInfo.email = getUserResponse.email
        // window.sessionStorage.setItem("user", JSON.stringify(userInfo))
      }
    })
    .catch(err => console.log('Error:', err))
  return getUserResponse
}

//SAVE USER-------------------------------
export const saveUser = async (userData, selectedDay) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let saveUserBody = {
    fullName: userData.user_Full_Name,
    email: userData.user_Email,
    dob: selectedDay,
    pincode: userData.user_Pin_Code
  }

  console.log(saveUserBody);
  let saveUserResponse;

  await axios.put(`${process.env.REACT_APP_BASE_URL}/user/updateProfile`, JSON.stringify(saveUserBody), { headers })
    .then(res => {
      saveUserResponse = res.data
      // window.sessionStorage.setItem("user", JSON.stringify(userInfo))
      getUser(userToken)
    })
    .catch(err => console.log('Error:', err))

  return saveUserResponse
}

//UPDATE USER INFO
export const updateUser = async (userData) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''


  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  // update({ fullName: userData.user_Full_Name })
  // update({ mobileNumber: userData.user_ph_Number })
  // update({ email: userData.user_Email })
  // update({ dob: userBirthDate })
  // userInfo.fullName = userData.user_Full_Name
  // userInfo.mobileNumber = userData.user_ph_Number
  // userInfo.email = userData.user_Email
  // userInfo.dob = userBirthDate


  let updateUserResponse;
  const newData = Object.keys(userData).reduce((accumulator, key) => {
    // Copy all except emoji
    if (key !== "profilePic") {
      accumulator[key] = userData[key]
    }
    return accumulator
  }, {})

  console.log(newData);
  // await axios.put(`${process.env.REACT_APP_BASE_URL}/user/updateProfile`, JSON.stringify(newData), { headers })
  //   .then(res => {
  //     updateUserResponse = res.data
  //     // window.sessionStorage.setItem("user", JSON.stringify(userInfo))
  //     getUser(userToken)
  //   })
  // .catch(err => console.log('Error:', err))

  return updateUserResponse

}

//GET USER PROFILE PIC
export const getUserPic = async (JWT) => {
  let userPicResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${JWT}`
  }

  await axios.get(`${process.env.REACT_APP_BASE_URL}/user/photo`, { headers })
    .then(res => {
      userPicResponse = res.data.locataion
      // console.log(userPicResponse);
    })

  return userPicResponse
}


//SAVE/UPDATE USER PROFILE PIC
export const saveUserPic = async (pic) => {
  let savePicResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${userToken}`
  }

  // let newPic = {
  //   locataion: pic
  // }

  const formData = new FormData()


  formData.append('photo', pic)

  console.log(pic);
  // console.log(newPic);
  await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/addphoto`, formData, { headers })
    .then(res => {
      savePicResponse = res
      // console.log(userPicResponse);
    })

  return savePicResponse
}



//UPDATE USER MOBILE NUMBER
export const updateMobileNumber = async (userData) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''


  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  // update({ mobileNumber: userData.user_ph_Number })
  // userInfo.mobileNumber = userData.user_ph_Number


  // window.sessionStorage.setItem("user", JSON.stringify(userInfo))
}

//LOGOUT USER----------------------------
export const logOutUser = async () => {

  let user = JSON.parse(sessionStorage.getItem('user')).JWT

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${user}`
  }

  let response

  // update({ fullName: '' })
  // update({ id: '' })
  // update({ mobileNumber: '' })
  // update({ email: '' })
  // update({ dob: null })
  // update({ JWT: '' })


  // userInfo.JWT = ''
  // userInfo.id = ''
  // userInfo.fullName = ''
  // userInfo.mobileNumber = ''
  // userInfo.email = ''
  // userInfo.dob = null
  // sessionStorage.setItem("user", JSON.stringify(userInfo))

  // await axios.post(`${process.env.REACT_APP_BASE_URL}/`, { headers })
  //   .then(res => {
  //     if (res) {
  //       sessionStorage.setItem("user", JSON.stringify(userInfo))
  //     }
  //   })
  //   .catch(err => console.log('Error:', err))

  return response
}

export const getUserLocation = () => {

  let userLocationResponse

  const onSuccess = (position) => {
    userLocationResponse = position
  }

  const onError = (error) => {
    userLocationResponse = error
  }

  // if (!('geolocation' in navigator)) {
  //   userLocationResponse = {
  //     code: 0,
  //     message: 'Geolocation not supported'
  //   }
  // }

  console.log(userLocationResponse);

  navigator.geolocation.getCurrentPosition(onSuccess, onError)
}