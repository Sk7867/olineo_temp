import axios from 'axios'

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

//Get Store Location based on user position
export const getStoreLocation = async (params) => {
  let locationResponse
  // let locationBody = {
  //   latitude: loc.coords.latitude,
  //   longitude: loc.coords.longitude
  // }

  await axios.get(`${process.env.REACT_APP_BASE_URL}/store?${params}`, { headers })
    .then(res => {
      locationResponse = res.data.data
    })
    .catch(err => { console.log('Error:', err) })

  return locationResponse
}