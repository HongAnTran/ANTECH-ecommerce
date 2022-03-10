import axios from "axios";

const URL = "http://localhost:5000";

//api user
export const createUser = (payload) => axios.post(`${URL}/users`, payload);

export const getCurrentUser = (payload) =>
  axios.get(`${URL}/users/current`, { params: { uid: payload } });

export const editUser = (payload) => axios.post(`${URL}/users/edit`, payload);

//api image
export const postImage = (payload) => axios.post(`${URL}/images`, payload);

export const deleteImage = (payload) =>
  axios.post(`${URL}/images/delete`, payload);

export const deleteImages = (payload) =>
  axios.post(`${URL}/images/delete/multiple`, payload);

//api products
export const postProduct = (payload) => axios.post(`${URL}/products`, payload);

export const getProductsUser = (payload) =>
  axios.get(`${URL}/products/user`, { params: { uid: payload } });

export const getAllProducts = () => axios.get(`${URL}/products`);

export const deleteProductsUser = (payload) =>
  axios.delete(`${URL}/products/${payload}`);

export const getProduct = (payload) =>
  axios.get(`${URL}/products/page`, { params: { productId: payload } });

export const getShop = (payload) =>
  axios.get(`${URL}/products/shop`, { params: { uid: payload } });
  export const getRates = (payload) =>
  axios.get(`${URL}/rate/product`, { params: { productId: payload } });

  export const filterRates = (payload) =>
  axios.get(`${URL}/rate/filter`, { params: { productId: payload.productId,option:payload.option } });
  export const likeRate = (payload) =>
  axios.post(`${URL}/rate/like`,payload);
  export const likeProduct = (payload) =>
  axios.post(`${URL}/products/like`,payload);


export const getCart = (payload) =>
  axios.get(`${URL}/cart/user`, { params: { uid: payload } });

export const addCart = (payload) => axios.post(`${URL}/cart/add`, payload);

export const editQuantilyCart = (payload) =>
  axios.put(`${URL}/cart/quantily`, payload);

export const deleteCart = (payload) =>
  axios.post(`${URL}/cart/delete`, payload);

export const deleteAllCart = (payload) =>
  axios.post(`${URL}/cart/delete/all`, payload);

////////////
export const getBill = (payload) =>
  axios.get(`${URL}/bill/user`, { params: { uid: payload } });

export const handleAddBill = (payload) =>
  axios.post(`${URL}/bill/add`, payload);

export const handleSubBill = (payload) =>
  axios.post(`${URL}/bill/sub`, payload);

export const addAllBill = (payload) => axios.post(`${URL}/bill/all`, payload);

export const removeAllBill = (payload) =>
  axios.post(`${URL}/bill/remove`, payload);

export const addressBill = (payload) =>
  axios.post(`${URL}/bill/address`, payload);

export const addQuantilyBill = (payload) =>
  axios.put(`${URL}/bill/quantily`, payload);

export const freeShipBill = (payload) =>
  axios.post(`${URL}/bill/freeShip`, payload);

// order
export const createOrder = (payload) =>
  axios.post(`${URL}/order/create`, payload);

export const getOrder = (payload) => {
  if (payload.uid) {
    return axios.get(`${URL}/order/get`, {
      params: { uid: payload.uid, type: payload.type },
    });
  } else if (payload.seller) {
    return axios.get(`${URL}/order/get`, {
      params: { seller: payload.seller, type: payload.type },
    });
  }
};
export const confirmOrder = (payload) =>
  axios.post(`${URL}/order/confirm`, payload);

  export const recieveOrder = (payload) =>
  axios.post(`${URL}/order/recieve`, payload);

  export const createRate = (payload) => 
  axios.post(`${URL}/rate/create`, payload);