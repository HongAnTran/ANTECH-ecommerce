import { call, put } from "redux-saga/effects";
import * as api from "../../api/api";
import cartUserSlice from "../sliceCommon/cartUserSlice";

export const getCartSaga = function* (action) {
  try {
    const cart = yield call(api.getCart, action.payload);
    if (cart) {
      yield put(cartUserSlice.actions.getCartUserSuccess(cart.data));
    }
  } catch (error) {
    yield put(cartUserSlice.actions.getCartUserFailure(error));
  }
};
export const editQuantilyCartSaga = function* (action) {
  try {
    const cart = yield call(api.editQuantilyCart, action.payload);

    if (cart) {
      yield put(cartUserSlice.actions.editQuantitySuccess(cart.data.cart));
    }
  } catch (error) {
    yield put(cartUserSlice.actions.editQuantityFailure(error));
  }
};

export const deleteCartSaga = function* (action) {
  try {
    const cart = yield call(api.deleteCart, action.payload);

    if (cart) {
      yield put(cartUserSlice.actions.deleteProductInCartSuccess(cart.data));
    }
  } catch (error) {
    yield put(cartUserSlice.actions.deleteProductInCartFailure(error));
  }
};

export const deleteAllCartSaga = function* (action) {
  try {
    yield call(api.deleteAllCart, action.payload);

    yield put(cartUserSlice.actions.deleteAllProductInCartSuccess());

  } catch (error) {
    yield put(cartUserSlice.actions.deleteAllProductInCartFailure(error));
  }
};

const addCartSaga = function* (action) {
  try {
    const cart = yield call(api.addCart, action.payload);

    if (cart) {
      yield put(cartUserSlice.actions.addProductToCartSuccess(cart.data));
    }
  } catch (error) {
    yield put(cartUserSlice.actions.addProductToCartFailure(error));
  }
};

export default addCartSaga;
