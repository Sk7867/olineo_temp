import axios from "axios"

//Get All Banners in admin
export const getAdminBanner = async () => {
  let getAdminBannerRes

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
  }

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/banner`, { headers }).then(res => {
    getAdminBannerRes = res.data.data
  })

  return getAdminBannerRes
}

export const addBannerImage = async (image) => {
  let addBannerImageRes

  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  const bannerFormData = new FormData()

  bannerFormData.append('bannerImage', image)

  console.log(bannerFormData);
  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/admin/addbannerimage`, bannerFormData, { headers })
    .then(res => {
      addBannerImageRes = res
    })

  return addBannerImageRes
}