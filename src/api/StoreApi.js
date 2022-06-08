import axios from 'axios'

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*"
}

//Get Store Location based on user position
export const storeLocation = async (loc) => {
  let locationResponse
  let locationBody = {
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude
  }

  console.log(locationBody);


  // await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, JSON.stringify(locationBody), { headers })
  //   .then(res => {
  //     locationResponse = res
  //   })
  //   .catch(err => { console.log('Error:', err) })

  return locationResponse
}