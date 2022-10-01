import axios from 'axios'

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

export const getSaveForLater = async () => {
  let getSFLRes

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/saveforlater/`, { headers })
    .then(res => {
      if (res) {
        getSFLRes = res.data.data
      }
    })
    .catch(err => console.log('Error:', err))

  return getSFLRes
}

export const addSaveForLaterItem = async (id) => {
  let addSFLRes
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/saveforlater/${id}`, {}, { headers })
    .then(res => {
      if (res) {
        addSFLRes = res
      }
    })
    .catch(err => console.log('Error:', err))

  return addSFLRes
}

export const deleteSaveForLaterItem = async (id) => {
  let deleteSFLRes

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/saveforlater/${id}`, { headers })
    .then(res => {
      deleteSFLRes = res
    })

  return deleteSFLRes
}

export const deleteSaveForLaterAllItems = async () => {
  let deleteSFLALLRes

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/saveforlater`, { headers })
    .then(res => {
      deleteSFLALLRes = res
    })

  return deleteSFLALLRes
}