import {configureStore } from '@reduxjs/toolkit'
import modalSlice from '../features/modals/modalSlice'
import createSagaMiddleware from 'redux-saga'
import currentUserSlice from '../features/modals/currentUserSlice'
import upImageSlice from '../components/upImage/upImageSlice'
import rootSaga from '../redux/saga'
import productsUserSlice from './sliceCommon/productsUserSlice'
import productsSlice from '../features/show-product/productsSlice'
import productPageSlice from '../pages/productPage/productPageSlice'
import cartUserSlice from './sliceCommon/cartUserSlice'
import billSlice from '../pages/cartPage/billSlice'
import orderSlice from './sliceCommon/orderSlice'
import notificationSlice from '../components/notification/notificationSlice'
const sagaMiddleware = createSagaMiddleware()
const store = configureStore({

    reducer:{
        modal:modalSlice.reducer,
        currentUser:currentUserSlice.reducer,
       upImage:upImageSlice.reducer,
       productsUser:productsUserSlice.reducer,
       products:productsSlice.reducer,
       productPage:productPageSlice.reducer,
       cart:cartUserSlice.reducer,
       bill:billSlice.reducer,
       order:orderSlice.reducer,
       notification:notificationSlice.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck:false
        }
    ).concat(sagaMiddleware)
    
  
})

sagaMiddleware.run(rootSaga)

export default store