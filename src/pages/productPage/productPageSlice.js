import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "productPage",
  initialState: {
    product: {},
    isLoadingProduct: false,
    shop:{}, 
    rates: [],
  },
  reducers: {
    getProductRequest: (state, action) => {
      state.isLoadingProduct = true;
    },
    getProductSuccess: (state, action) => {
        state.product = action.payload
      state.isLoadingProduct = false;
    },
    getProductFailure: (state, action) => {
      state.isLoadingProduct = true;
    },
    getShopRequest: (state, action) => {
      state.shop = {}

    },
    getShopSuccess: (state, action) => {
      state.shop = action.payload
    

    },
    getShopFailure: (state, action) => {
      state.shop = {}
    },
    getRatesRequest: (state, action) => {
      state.rates = [...state.rates]

    },
    getRatesSuccess: (state, action) => {
      state.rates = action.payload

    },
    getRatesFailure: (state, action) => {
      state.rates = [...state.rates]

    },
    filterRatesRequest: (state, action) => {
        state.rates = [...state.rates]
    },
    filterRatesSuccess: (state, action) =>{
      state.rates = action.payload
  },
  filterRatesFailure: (state, action) =>{
    state.rates = [...state.rates]
  
  },
  likeRateRequest: (state, action) => {
    state.rates = [...state.rates]
  },

  likeRateSuccess: (state, action) => {
    state.rates = action.payload
  }, 
  likeRateFailure: (state, action) => {
    state.rates = [...state.rates]
  },
  likeProductRequest: (state, action) => {
    state.product = { ...state.product}

  },
  likeProductSuccess: (state, action) => {
    state.product = action.payload

  },
  likeProductFailure: (state, action) => {
    state.product = { ...state.product}
  },


}

  
});
