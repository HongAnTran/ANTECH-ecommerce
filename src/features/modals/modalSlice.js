import { createSlice}  from '@reduxjs/toolkit'

export default  createSlice({
    name:'modal',
    initialState:{ 
        modalLogin: false,
        modalRegister: false,
    },
    reducers:{
    onModalChange: (state)=> {  
            state.modalLogin = true
     },
     closeModalChange: (state)=>{
         state.modalLogin = false
     },
     closeRegisterModal:(state)=>{ 
        state.modalRegister = false
     },
     swapModal:(state)=>{
        state.modalLogin = !state.modalLogin
        state.modalRegister = !state.modalRegister
     }
    }
})
