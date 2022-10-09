import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

export const findStore = async (storeId, cb) => {
  await axios
    .get(`${process.env.REACT_APP_IFD_BASE_URL}/store/${storeId}`, { headers })
    .then((res) => {
      console.log(res);
      return cb(null, res.data);
    })
    .catch((err) => cb(err, null));
};

export const getDayGraph = async (query, cb) => {
  await axios
    .get(`https://olineospinandwin.tk/day-graph?${query}`, { headers })
    .then((res) => {
      return cb(null, res.data.data);
    })
    .catch((err) => cb(err, null));
};

export const getProductGraph = async (query, cb) => {
  await axios
    .get(`https://olineospinandwin.tk/product-graph?${query}`, { headers })
    .then((res) => {
      return cb(null, res.data.data);
    })
    .catch((err) => cb(err, null));
};
