import {
    call,
    put,
    
} from 'redux-saga/effects'
import * as api from '../../api/api'
import billSlice from '../../pages/cartPage/billSlice'


const addBillSaga =  function*(action){
   
    try {
        const bill  = yield call(api.handleAddBill,action.payload)
      
        if(bill){
            yield put(billSlice.actions.handleBillAddSuccess(bill.data[0]))
        }
    } catch (error) {
        yield put(billSlice.actions.handleBillAddFailure(error))
    }
}

export const subBillSaga =  function*(action){
   
    try {
        const bill  = yield call(api.handleSubBill,action.payload)
      
        if(bill){
            yield put(billSlice.actions.handleBillSubSuccess(bill.data[0]))
        }
    } catch (error) {
        yield put(billSlice.actions.handleBillSubFailure(error))
    }
}


export const addAllBillSaga =  function*(action){
   
    try {
        const bill  = yield call(api.addAllBill,action.payload)
      
        if(bill){
            yield put(billSlice.actions.addAllProductSuccess(bill.data[0]))
        }
    } catch (error) {
        yield put(billSlice.actions.addAllProductFailure(error))
    }
}



export const removeAllBillSaga =  function*(action){
   
    try {
        const bill  = yield call(api.removeAllBill,action.payload)
      
        if(bill){
            yield put(billSlice.actions.removeAllProductSuccess(bill.data[0]))
        }
    } catch (error) {
        yield put(billSlice.actions.removeAllProductFailure(error))
    }
}



export const addressBillSaga =  function*(action){
   
    try {
        const address =  yield call(api.addressBill,action.payload)
      
        if(address){
            yield put(billSlice.actions.handleAddressSuccess(address.data))
        }
    } catch (error) {
        yield put(billSlice.actions.handleAddressFailure(error))
    }
}

 export const getBillSaga =  function*(action){
   
    try {
        const  bill = yield call(api.getBill,action.payload)
     

      
        if(bill){
            yield put(billSlice.actions.getBillSuccess(bill.data[0]))
        }
    } catch (error) {
        yield put(billSlice.actions.getBillFailure(error))
    }
}


export const addQuantilySaga =  function*(action){
   
    try {
        const bill  = yield call(api.addQuantilyBill,action.payload)
        if(bill){
            yield put(billSlice.actions.addQuantitySuccess(bill.data))
        }
    } catch (error) {
        yield put(billSlice.actions.addQuantityFailure(error))
    }
}


export const freeShipBillSaga =  function*(action){
   
    try {
        const bill  = yield call(api.freeShipBill,action.payload)
        if(bill){
            yield put(billSlice.actions.handleFreeShipSuccess(bill.data))
        }
    } catch (error) {
        yield put(billSlice.actions.handleAddressFailure(error))
    }
}




export default  addBillSaga