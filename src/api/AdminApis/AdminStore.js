import axios from "axios"

export const addStoreBulk = async (stores) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let addStoreBulkRes
  await axios.post(`${process.env.REACT_APP_BASE_URL}/store/`, JSON.stringify(stores), { headers })
    .then(res => {
      addStoreBulkRes = res
    })

  return addStoreBulkRes
}

export const getAllStore = async () => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let getStore

  await axios.get(`${process.env.REACT_APP_BASE_URL}/store/`, { headers })
    .then(res => {
      getStore = res.data.data
    })

  return getStore
}

export const getIndiStore = async (id) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let getStore

  await axios.get(`${process.env.REACT_APP_BASE_URL}/store/${id}`, { headers })
    .then(res => {
      getStore = res
    })

  return getStore
}

export const updateIndiStore = async (id, data) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let updateStoreRes

  await axios.patch(`${process.env.REACT_APP_BASE_URL}/store/${id}`, JSON.stringify(data), { headers })
    .then(res => {
      updateStoreRes = res
    })

  return updateStoreRes
}

export const deleteIndiStore = async (id) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  let deleteStoreRes

  await axios.delete(`${process.env.REACT_APP_BASE_URL}/store/${id}`, { headers })
    .then(res => {
      deleteStoreRes = res
    })

  return deleteStoreRes
}