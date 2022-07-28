import axios from "axios"

//GET ALL ADMIN ORDERS +++++++++++++++++++++++++++++++++++++++++++
export const getAdminAllOrder = async () => {
    let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

    const headers = {
        "Access-Control-Allow-origin": "*",
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userToken}`
    }

    let allOrderResponse

    await axios.get(`${process.env.REACT_APP_BASE_URL}/product/admin/order`, { headers })
        .then(res => {
            allOrderResponse = res.data.data
            console.log(allOrderResponse);
        })
        .catch(err => console.log(err));

    return allOrderResponse

}

//GET INDIV ORDERS +++++++++++++++++++++++++++++++++++++++++++
export const getAdminIndOrder = async (id) => {
    let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

    const headers = {
        "Access-Control-Allow-origin": "*",
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userToken}`
    }

    let indOrderResponse

    await axios.get(`${process.env.REACT_APP_BASE_URL}/product/admin/order/${id}`, { headers })
        .then(res => {
            indOrderResponse = res.data.data
            console.log(indOrderResponse);
        })
        .catch(err => console.log(err));

    return indOrderResponse

}
//DELET INDIV ORDERS +++++++++++++++++++++++++++++++++++++++++++
export const deletAdminIndOrder = async (id) => {
    let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''

    const headers = {
        "Access-Control-Allow-origin": "*",
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userToken}`
    }
    let deletOrderResponse;
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/admin/order/${id}`, { headers })
            .then(res => {
                deletOrderResponse = res;
            })
            .catch(err => console.log(err));
    } else {
        alert("User save!")
    }


    return deletOrderResponse;

}