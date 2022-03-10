import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "order",
  initialState: {
    order: [],
    isLoadingOrder: false,
    isCreated: true,
  },
  reducers: {
    createOrderRequest: (state, action) => {
      state.isLoadingOrder = true;
      state.order = [...state.order];
      state.isCreated = false;
    },

    createOrderSuccess: (state, action) => {
      state.order = [...state.order];
      state.isLoadingOrder = false;
      state.isCreated = true;
    },
    createOrderFailure: (state, action) => {
      state.isLoadingOrder = false;
      state.order = [...state.order];
      state.isCreated = true;
    },
    getOrderRequest: (state, action) => {
      state.order = [...state.order];
      state.isLoadingOrder = true;
    },
    getOrderSuccess: (state, action) => {
      state.order = action.payload;
      state.isLoadingOrder = false;
    },
    getOrderFailure: (state, action) => {
      state.order = [...state.order];
      state.isLoadingOrder = false;
    },
    confirmOrderRequest: (state, action) => {
      state.order = [...state.order];
      state.isLoadingOrder = true;
    },
    confirmOrderSuccess: (state, action) => {
      state.order = action.payload;
      state.isLoadingOrder = false;
    },
    confirmOrderFailure: (state, action) => {
      state.order = [...state.order];
      state.isLoadingOrder = false;
    },
    recieveOrderRequest: (state, action) => {
      state.order = [...state.order];
      state.isLoadingOrder = true;
      state.isCreated = false;
    },
    recieveOrderSuccess: (state, action) => {
      state.order = action.payload;
      state.isLoadingOrder = false;
      state.isCreated = true;
    },
    recieveOrderFailure: (state, action) => {
      state.order = [...state.order];
      state.isLoadingOrder = false;
      state.isCreated = true;
    },
  },
});
