import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {
    getAllProductsRequest(state, action) {
      state.isLoading = true;
    },
    getAllProductsSuccess(state, action) {
      state.products = action.payload;

      state.isLoading = false;
    },
    getAllProductsFailure(state, action) {
      state.isLoading = false;
    },
  },
});
