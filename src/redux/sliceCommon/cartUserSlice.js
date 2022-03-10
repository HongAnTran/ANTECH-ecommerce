import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "cartUser",
  initialState: {
    cart: [],
    isLoading: false,
  },
  reducers: {
    getCartUserRequest: (state, action) => {
      state.isLoading = true;
    },
    getCartUserSuccess: (state, action) => {
      state.cart = action.payload;

      state.isLoading = false;
    },
    getCartUserFailure: (state, action) => {
      state.cart = [...state.cart];
      state.isLoading = false;
    },
    addProductToCartRequest: (state, action) => {
      state.cart = [...state.cart];
    },
    addProductToCartSuccess: (state, action) => {
      state.cart = action.payload;
    },
    addProductToCartFailure: (state, action) => {
      state.cart = [...state.cart];
    },

    editQuantityRequest: (state, action) => {
      state.cart = [...state.cart];
    },
    editQuantitySuccess: (state, action) => {
      state.cart = action.payload;
    },
    editQuantityFailure: (state, action) => {
      state.cart = [...state.cart];
    },

    deleteProductInCartRequest: (state, action) => {
      state.cart = [...state.cart];
    },
    deleteProductInCartSuccess: (state, action) => {
      state.cart = action.payload;
    },
    deleteProductInCartFailure: (state, action) => {
      state.cart = [...state.cart];
    },
    deleteAllProductInCartRequest: (state, action) => {
      state.cart = [...state.cart];

    },
    deleteAllProductInCartSuccess: (state, action) => {
      state.cart = []
    },
    deleteAllProductInCartFailure: (state, action) => {
      state.cart = [...state.cart];

    },
  },
});
