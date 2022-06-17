import { put, retry, takeLatest } from 'redux-saga/effects'
import { categoriesSuccess, categoriesFailure } from '../actions'
import FetchData from '../api/FetchData'
import { CATEGORIES_REQUEST } from '../actions/actionTypes'

// watcher + worker
export function* watchCategoriesSaga() {
  yield takeLatest(CATEGORIES_REQUEST, function* (action) {
    try {
      const data = yield retry(3, 1000, FetchData, action.payload.path);
      yield put(categoriesSuccess(data));
    } catch (e) {
      yield put(categoriesFailure(e.message));
    }
  });
}
