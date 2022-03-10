import { call, put } from "redux-saga/effects";
import * as api from "../../api/api";
import productsSlice from "../sliceCommon/productsUserSlice";

const productsUserSaga = function* (action) {
  try {
    const products = yield call(api.getProductsUser, action.payload);
    if (products) {
      yield put(productsSlice.actions.getAllProductsUserSuccess(products.data));
    }
  } catch (error) {
    yield put(productsSlice.actions.getAllProductsUserFailure);
  }
};

export const deleteProductsSaga = function* (action) {
  try {
    const products = yield call(api.deleteProductsUser, action.payload);
    if (products) {
      yield put(productsSlice.actions.deleteProductSuccess(products.data._id));
    }
  } catch (error) {
    yield put(productsSlice.actions.deleteProductFailure);
  }
};

export default productsUserSaga;
