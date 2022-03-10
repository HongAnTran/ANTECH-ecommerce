import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "bill",
  initialState: {
    bill: {
      _id: "",
      discount: 0,
      productsBill: [],
      productsTotal: [],
      address: {},
      tempCost: 0,
      total: 0,
      shipPriceTotal: 0,
      freeShip: false,
    },
    isloading: false,
  },
  reducers: {
    getBillRequest: (state, action) => {
      state.isloading = true;
      state.bill = { ...state.bill };
    },
    getBillSuccess: (state, action) => {
      state.bill = action.payload;
      state.isloading = false;
    },
    getBillFailure: (state, action) => {
      state.isloading = false;
      state.bill = { ...state.bill };
    },

    handleBillAddRequest: (state, action) => {
      state.bill = { ...state.bill };

      state.isloading = true;
    },
    handleBillAddSuccess: (state, action) => {
      state.isloading = false;
      state.bill = action.payload;
    },
    handleBillAddFailure: (state, action) => {
      state.bill = { ...state.bill };

      state.isloading = false;
    },

    handleBillSubRequest: (state, action) => {
      state.bill = { ...state.bill };

      state.isloading = true;
    },
    handleBillSubSuccess: (state, action) => {
      state.bill = action.payload;

      state.isloading = false;
    },
    handleBillSubFailure: (state, action) => {
      state.bill = { ...state.bill };

      state.isloading = false;
    },
    addAllProductRequest: (state, action) => {
      state.bill = { ...state.bill };
      state.isloading = true;
    },
    addAllProductSuccess: (state, action) => {
      state.isloading = false;
      state.bill = action.payload;
    },
    addAllProductFailure: (state, action) => {
      state.isloading = false;
      state.bill = { ...state.bill };
    },
    removeAllProductRequest: (state, action) => {
      state.bill = { ...state.bill };
      state.isloading = true;
    },
    removeAllProductSuccess: (state, action) => {
      state.isloading = false;
      state.bill = action.payload;
    },
    removeAllProductFailure: (state, action) => {
      state.isloading = false;
      state.bill = { ...state.bill };
    },

    handleAddressRequest: (state, action) => {
      state.bill = { ...state.bill };
    },
    handleAddressSuccess: (state, action) => {
      state.bill.address = action.payload;
    },
    handleAddressFailure: (state, action) => {
      state.bill = { ...state.bill };
    },
    addQuantityRequest: (state, action) => {
      state.bill = { ...state.bill };
      state.isloading = true;
    },
    addQuantitySuccess: (state, action) => {
      state.isloading = false;
      state.bill = action.payload;
    },
    addQuantityFailure: (state, action) => {
      state.bill = { ...state.bill };
      state.isloading = false;
    },
    handleFreeShipRequest: (state, action) => {
      state.bill = { ...state.bill };
    },
    handleFreeShipSuccess: (state, action) => {
      state.bill = action.payload;
    },
    handleFreeShipFailure: (state, action) =>{
      state.bill = { ...state.bill };
    },

  },
});
