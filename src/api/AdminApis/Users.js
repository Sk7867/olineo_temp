// get all users

import axios from "axios";

export const allUsers = async (query) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''


  const headers = {
    "Authorization": `bearer ${userToken}`
  }

  let allUsers;

  await axios.get(`${process.env.REACT_APP_BASE_URL}/user/admin?${query}`, { headers })
    .then(res => {
      allUsers = res.data.data
    })

  return allUsers;
}

// get Single user

export const singleUSer = async (id) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''


  const headers = {
    "Authorization": `bearer ${userToken}`
  }

  let singleUserRes;

  await axios.get(`${process.env.REACT_APP_BASE_URL}/user/admin/${id}`, { headers })
    .then(res => {
      singleUserRes = res.data.data
    })

  return singleUserRes;
}

//   Update User Info

export const updateUseer = async (id, Body) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Authorization": `bearer ${userToken}`
  }
  let updateUser;
  await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/admin/${id}`, Body, { headers })
    .then(res => {
      updateUser = res.data.data;
    })
  return updateUser;
}

// delet user

export const deletUser = async (id) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Authorization": `bearer ${userToken}`
  }

  let dltuser;
  let text = "Are you sure for delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/admin/${id}`, { headers })
      .then(res => {
        dltuser = res;
      })
  } else {
    alert("User save!")
  }


  return dltuser;
}