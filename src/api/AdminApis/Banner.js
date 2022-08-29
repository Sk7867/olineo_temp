import axios from "axios"

//Get All Banners in admin
export const getAdminBanner = async () => {
  let getAdminBannerRes

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
  }

  await axios.get(`${process.env.REACT_APP_BASE_URL}/product/banner`, { headers })
    .then(res => {
      getAdminBannerRes = res
      console.log(res);
    })

  return getAdminBannerRes
}

export const addBannerImage = (image) => {
  let addBannerImageRes

  const headers = {
    "Access-Control-Allow-origin": "*",
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${userToken}`
  }

  const bannerFormData = new FormData()

  bannerFormData.append('bannerImage', image)

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/admin/addbannerimage`, bannerFormData, { headers })
    .then(res => {
      addBannerImageRes = res
    })

  return addBannerImage
}