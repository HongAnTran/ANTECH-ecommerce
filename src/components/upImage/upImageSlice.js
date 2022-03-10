import { createSlice}  from '@reduxjs/toolkit'

export default  createSlice({
    name:'image',
    initialState:{ 
        images:[],
        isLoading:false,
    },
    reducers:{
      addImageRequest:(state) => {
          state.isLoading = true;
      },
      addImageSuccess:(state,action) => {
        state.images.push(action.payload);
        state.isLoading = false;
      },
      addImageFailure:(state) => {
        state.isLoading = false;
    },
    deleteImage:(state,action) => {
        state.images = state.images.filter(image => image.index !== action.payload)
    },
    deleteAllImage:(state,action) => {
      state.images = []
    }


    }
})