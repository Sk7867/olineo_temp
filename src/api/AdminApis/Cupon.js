import axios from "axios"

export const getCupon = async () => {
    let cuponResponse;

    await axios.get(`${process.env.REACT_APP_BASE_URL}/product/coupon`)
        .then(res => {
            cuponResponse = res.data;
        })

    return cuponResponse
}
export const getSingleCupon = async (code) => {
    let cuponResponse;

    await axios.get(`${process.env.REACT_APP_BASE_URL}/product/coupon/${code}`)
        .then(res => {
            cuponResponse = res.data;
        })

    return cuponResponse;
}

export const addCupon = async (data) => {
    let cuponResponse

    await axios.post(`${process.env.REACT_APP_BASE_URL}/product/coupon`, data)
        .then(res => {
            cuponResponse = res.data;
        })

    return cuponResponse
}

export const updateCupon = async (id, data) => {
    let cuponResponse;
    console.log("Input Data:", data);

    await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/coupon/${id}`, data)
        .then(res => {
            cuponResponse = res.data;
        })

    return cuponResponse
}