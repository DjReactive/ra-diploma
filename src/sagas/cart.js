import { put, retry, takeLatest } from 'redux-saga/effects'
import { cartPurchaseFailure, cartPurchaseSuccess } from '../actions'
import FetchData from '../api/FetchData'
import { CART_PURCHASE_ITEMS } from '../actions/actionTypes'

// watcher + worker
export function* watchCartOrderSaga() {
  yield takeLatest(CART_PURCHASE_ITEMS, function* ({payload}) {
    try {
      const data = yield retry(3, 1000, FetchData, '/order', {
        method: 'POST',
        body: JSON.stringify(payload.purchaseList),
      });
      yield put(cartPurchaseSuccess(data));
    } catch (e) {
      yield put(cartPurchaseFailure(e.message));
    }
  });
}
