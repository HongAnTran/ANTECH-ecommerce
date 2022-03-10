import { call, put } from "redux-saga/effects";
import * as api from "../../api/api";
import productPageSlice from "../../pages/productPage/productPageSlice";

const productPageSaga = function* (action) {
  try {
    const product = yield call(api.getProduct, action.payload);
    if (product) {
      yield put(productPageSlice.actions.getProductSuccess(product.data[0]));
    }
  } catch (error) {
    yield put(productPageSlice.actions.getProductFailure(error));
  }
};

export const getShopSaga = function* (action) {
  try {
    const shop = yield call(api.getShop, action.payload);
    if (shop) {
      yield put(productPageSlice.actions.getShopSuccess(shop.data[0]));
    }
  } catch (error) {
    yield put(productPageSlice.actions.getShopFailure(error));
  }
};
export const getRatesSaga = function* (action) {
  try {
    const rates = yield call(api.getRates, action.payload);
    if (rates) {
      yield put(productPageSlice.actions.getRatesSuccess(rates.data));
    }
  } catch (error) {
    yield put(productPageSlice.actions.getRatesFailure(error));
  }
};
export const filterRatesSaga = function* (action) {
  try {
    const rates = yield call(api.filterRates, action.payload);
    if (rates) {
      yield put(productPageSlice.actions.filterRatesSuccess(rates.data));
    }
  } catch (error) {
    yield put(productPageSlice.actions.filterRatesFailure(error));
  }
};
export const likeRateSaga = function* (action) {
  try {
    const rates = yield call(api.likeRate, action.payload);
    if (rates) {
      yield put(productPageSlice.actions.likeRateSuccess(rates.data));
    }
  } catch (error) {
    yield put(productPageSlice.actions.likeRateFailure(error));
  }
};
export const likeProductSaga = function* (action) {
  try {
    const product = yield call(api.likeProduct, action.payload)
    if (product) {
      yield put(productPageSlice.actions.likeProductSuccess(product.data));
    }
  } catch (error) {
    yield put(productPageSlice.actions.likeProductFailure(error));
  }
};



export default productPageSaga;
