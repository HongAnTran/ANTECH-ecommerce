import getCurrentSaga,{ editCurrentUserSaga } from "./currentSaga"
import imageSaga from "./imageSaga"
import productsUserSaga,{ deleteProductsSaga } from "./productsUserSaga"
import productsSaga from "./productsSaga"
import productPageSaga,{ getShopSaga ,getRatesSaga ,filterRatesSaga,likeRateSaga,likeProductSaga} from "./productPageSaga"
import addCartSaga from './cartSaga'
import { getCartSaga , editQuantilyCartSaga ,deleteCartSaga ,deleteAllCartSaga} from "./cartSaga"
import {
    takeLatest,
    takeEvery
} from 'redux-saga/effects'
import currentUserSlice from '../../features/modals/currentUserSlice'
import upImageSlice from '../../components/upImage/upImageSlice'
import productsUserSlice from "../sliceCommon/productsUserSlice"
import productsSlice from "../../features/show-product/productsSlice"
import productPageSlice from "../../pages/productPage/productPageSlice"
import cartUserSlice from "../sliceCommon/cartUserSlice"
import billSlice from '../../pages/cartPage/billSlice'
import orderSlice from "../sliceCommon/orderSlice"
import addBillSaga , { getBillSaga ,subBillSaga , addAllBillSaga 
     ,removeAllBillSaga , addressBillSaga
      ,addQuantilySaga ,freeShipBillSaga} from "./billSaga"
import createOrderSaga , { getOrderSaga , confirmOrderSaga ,recieveOrderSaga ,} from "./orderSaga"



function* rootSaga() {
        /// sage for user
    yield takeLatest(currentUserSlice.actions.setCurrentUserRequired,getCurrentSaga)
    yield takeLatest(currentUserSlice.actions.editUserRequest,editCurrentUserSaga)

        // saga for cart/checkout
    yield takeLatest(cartUserSlice.actions.getCartUserRequest,getCartSaga)
    yield takeLatest(cartUserSlice.actions.addProductToCartRequest,addCartSaga)
    yield takeEvery(cartUserSlice.actions.editQuantityRequest,editQuantilyCartSaga)
    yield takeEvery(cartUserSlice.actions.deleteProductInCartRequest,deleteCartSaga)
    yield takeLatest(cartUserSlice.actions.deleteAllProductInCartRequest,deleteAllCartSaga)

        // saga upload images
    yield takeEvery(upImageSlice.actions.addImageRequest,imageSaga)
    
            // saga for product
    yield takeLatest(productsUserSlice.actions.getAllProductsUserRequest,productsUserSaga)
    yield takeEvery(productsUserSlice.actions.deleteProductRequest,deleteProductsSaga)
    yield takeLatest(productsSlice.actions.getAllProductsRequest,productsSaga)
    
    // saga for product page
    yield takeLatest(productPageSlice.actions.getProductRequest,productPageSaga)
    yield takeLatest(productPageSlice.actions.getShopRequest,getShopSaga)
    yield takeLatest(productPageSlice.actions.getRatesRequest,getRatesSaga)
    yield takeLatest(productPageSlice.actions.filterRatesRequest,filterRatesSaga)
    yield takeLatest(productPageSlice.actions.likeRateRequest,likeRateSaga)
    yield takeLatest(productPageSlice.actions.likeProductRequest,likeProductSaga)


    // bill saga
    yield takeEvery(billSlice.actions.handleBillAddRequest,addBillSaga)
    yield takeEvery(billSlice.actions.handleBillSubRequest,subBillSaga)
    yield takeLatest(billSlice.actions.addAllProductRequest,addAllBillSaga)
    yield takeLatest(billSlice.actions.removeAllProductRequest,removeAllBillSaga)
    yield takeEvery(billSlice.actions.addQuantityRequest,addQuantilySaga)
    yield takeLatest(billSlice.actions.getBillRequest,getBillSaga)
    yield takeLatest(billSlice.actions.handleAddressRequest,addressBillSaga)
    yield takeLatest(billSlice.actions.handleFreeShipRequest,freeShipBillSaga)
  


    // order saga 
    yield takeLatest(orderSlice.actions.createOrderRequest,createOrderSaga)
    yield takeLatest(orderSlice.actions.getOrderRequest,getOrderSaga)
    yield takeEvery(orderSlice.actions.confirmOrderRequest,confirmOrderSaga)
    yield takeEvery(orderSlice.actions.recieveOrderRequest,recieveOrderSaga)
}

export default rootSaga