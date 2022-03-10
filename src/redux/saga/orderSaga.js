import { call, put } from "redux-saga/effects";
import * as api from "../../api/api";
import billSlice from "../../pages/cartPage/billSlice";
import orderSlice from "../sliceCommon/orderSlice";

const createOrderSaga = function* (action) {
  try {
    const res = yield call(api.createOrder, action.payload);

    if (res) {
      yield put(orderSlice.actions.createOrderSuccess());

      yield put(
        billSlice.actions.removeAllProductRequest({ uid: res.data.uid })
      );
    }
  } catch (error) {
    yield put(orderSlice.actions.createOrderFailure(error));
  }
};

export const getOrderSaga = function* (action) {
  try {
    const oder = yield call(api.getOrder, action.payload);

    if (oder) {
      yield put(orderSlice.actions.getOrderSuccess(oder.data));
    }
  } catch (error) {
    yield put(orderSlice.actions.getOrderFailure(error));
  }
};


export const confirmOrderSaga = function* (action) {
  try {
    const oder = yield call(api.confirmOrder, action.payload);

    if (oder) {
      yield put(orderSlice.actions.confirmOrderSuccess(oder.data));
    }
  } catch (error) {
    yield put(orderSlice.actions.confirmOrderFailure(error));
  }
};


export const recieveOrderSaga = function* (action) {
  try {
    const oder = yield call(api.recieveOrder, action.payload);

    if (oder) {
      yield put(orderSlice.actions.recieveOrderSuccess(oder.data));
    }
  } catch (error) {
    yield put(orderSlice.actions.recieveOrderFailure(error));
  }
};

export default createOrderSaga;
