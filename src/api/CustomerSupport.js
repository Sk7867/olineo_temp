import axios from 'axios'

const baseURL = "https://onlineo-backend.herokuapp.com/api"

// const headers = {
//   "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
//   'Content-Type': 'application/json',
//   "Access-Control-Allow-origin": "*"
// }

export const writeToUS = async (queryData) => {
  let writeToUSResponse

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  const queryBody = JSON.stringify({
    "name": queryData.fullName,
    "email": queryData.email,
    "query": queryData.query,
  })

  await axios.post(`${baseURL}/user/costomersupport`, queryBody, { headers })
    .then(res => {
      writeToUSResponse = res
    })
    .catch(err => console.log('Error:', err))

  return writeToUSResponse
}