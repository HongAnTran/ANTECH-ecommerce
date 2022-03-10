import {
    call,
    put,
    
} from 'redux-saga/effects'
import * as api from '../../api/api'
import productsSlice from "../../features/show-product/productsSlice"


const productsSaga =  function*(action){
   
    try {
        const products = yield call(api.getAllProducts)
        if(products){
            yield put(productsSlice.actions.getAllProductsSuccess(products.data))
        }
    } catch (error) {
        yield put(productsSlice.actions.getAllProductsFailure)
    }
}

export default  productsSaga