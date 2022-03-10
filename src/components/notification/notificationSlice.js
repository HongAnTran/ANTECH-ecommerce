import { createSlice } from "@reduxjs/toolkit";


export default createSlice({
    name:'notification',
    initialState:{
        isNotification:false,
        message:'',
        status:'',
    },
    reducers:{
        showNotification:(state, action)=>{
                state.isNotification = true;
              state.message = action.payload.message

        },
        hidenNotification:(state, action)=>{
            state.isNotification = false;
        }

    }
})