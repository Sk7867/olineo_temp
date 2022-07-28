import axios from "axios";

// get All payments
export const getAllPayment = async () => {
    let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''


    const headers = {
        "Authorization": `bearer ${userToken}`
    }

    let allPayments;

    await axios.get(`${process.env.REACT_APP_BASE_URL}/payment`, { headers })
        .then(res => {
            allPayments = res.data.data
        })

    return allPayments;
}


// delete payments
export const updatePayment = async (id, body) => {
    let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''


    const headers = {
        "Authorization": `bearer ${userToken}`
    }

    let updatePayments;
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/payment/${id}`, body, { headers })
        .then(res => {
            updatePayments = res.data.data;
        })
        .catch(err => console.log(err));

    return updatePayments;
}


// delete payments
export const deletPayment = async (id) => {
    let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''


    const headers = {
        "Authorization": `bearer ${userToken}`
    }

    let dltPayments;
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/payment/${id}`, { headers })
            .then(res => {
                dltPayments = res;
            })
            .catch(err => console.log(err));
    } else {
        alert("User save!")
    }


    return dltPayments;
}