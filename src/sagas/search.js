import { put, retry, takeLatest, debounce } from 'redux-saga/effects'
import { searchItemsRequest, searchItemsSuccess, searchItemsFailure } from '../actions'
import { FetchSearch } from '../api/FetchData'
import {
  CHANGE_SEARCH_FIELD,
  SEARCH_ITEMS_REQUEST,
} from '../actions/actionTypes'

function filterChangeSearchAction({type, payload}) {
  return type === CHANGE_SEARCH_FIELD
}

// wather + worker
export function* watchChangeSearchSaga() {
  yield debounce(500, filterChangeSearchAction, function* (action) {
    yield put(searchItemsRequest(action.payload.search));
  });
}

// wather + worker
export function* watchSearchItemsSaga() {
  yield takeLatest(SEARCH_ITEMS_REQUEST, function* (action) {
    try {
      const data = yield retry(3, 1000, FetchSearch, action.payload.search);
      yield put(searchItemsSuccess(data));
    } catch (e) {
      yield put(searchItemsFailure(e.message));
    }
  });
}
