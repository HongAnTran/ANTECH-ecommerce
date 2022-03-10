import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "currentUser",
  initialState: {
    user: {
      name: "",
      email: "",
      phoneNumber: null,
      address: [],
      photoURL: null,
      uid: null,
      isSeller: false,
      deliveryAddress:'',
    },
    isLoading: false,
  },
  reducers: {
    setCurrentUserRequired: (state, action) => {
      state.isLoading = true;
    },
    setCurrentUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setCurrentUserFailure: (state, action) => {
      state.user = {};
      state.isLoading = false;
    },
    editUserRequest(state, action) {
      state.isLoading = true;
      state.user = { ...state.user };
    },
    editUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    editUserFailure: (state, action) => {
      state.isLoading = false;
      state.user = { ...state.user };
    },
  },
});
