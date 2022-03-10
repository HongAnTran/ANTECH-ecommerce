import { createSlice}  from '@reduxjs/toolkit'

export default createSlice({
    name: 'productsUser',
    initialState:{
        products: [],
        isLoading:false,
    },
    reducers:{
        getAllProductsUserRequest(state,action){
            state.isLoading = true
        },
        getAllProductsUserSuccess(state,action){
             state.products = action.payload
            state.isLoading = false
        },
        getAllProductsUserFailure(state,action){ 
            state.isLoading = false
        },
        deleteProductRequest(state,action){
                state.isLoading = true

        },
        deleteProductSuccess(state,action){

           state.products = state.products.filter(product => product._id !== action.payload)
            state.isLoading = false
            
        },
        deleteProductFailure(state,action){

            state.isLoading = false
        },

    }

})