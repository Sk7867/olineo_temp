import axios from "axios";

//Get all cancelation data

export const getAllCancelation = async () => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Authorization": `bearer ${userToken}`
  }

  let allCancelation

  await axios.get(`${process.env.REACT_APP_BASE_URL}/cancel/admin`, { headers })
    .then(res => {
      allCancelation = res.data.data
    })

  return allCancelation
}

//Approve Cancel by admin
export const approveCancelation = async (id, charges) => {
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Authorization": `bearer ${userToken}`
  }

  let approveCancelRes

  let cancelBody = {
    cancellationId: id,
    charges: charges
  }

  console.log(cancelBody);

  await axios.post(`${process.env.REACT_APP_BASE_URL}/cancel/admin/refund`, JSON.stringify(cancelBody), { headers })
    .then(res => {
      approveCancelRes = res
      console.log(approveCancelRes);
    })

  return approveCancelRes
}
