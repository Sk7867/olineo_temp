import axios from "axios";

export const getQuiry = async () => {
    let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''


    const headers = {
        "Authorization": `bearer ${userToken}`
    }

    let allQuirys;

    await axios.get(`${process.env.REACT_APP_BASE_URL}/user/admin/query`, { headers })
        .then(res => {
            allQuirys = res.data.data
        })

    return allQuirys;
}