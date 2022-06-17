import { put, retry, takeEvery, take } from 'redux-saga/effects'
import { setItemsRequest, getItemsSuccess, getItemsFailure, getRequest } from '../actions'
import { getUrlLink } from '../api/Functions'
import { Fetching } from '../api/FetchData'
import { GET_ITEMS_REQUEST, SET_ITEMS_REQUEST } from '../actions/actionTypes'

function createFullUrlString(paramsObj) {
  const paramsUrl = getUrlLink({
    q: paramsObj.q,
    categoryId: paramsObj.categoryId,
    offset: paramsObj.offset,
  });
  return `${paramsObj.path}${paramsUrl && ('?' + paramsUrl)}`;
}

// watcher + worker
export function* watchGetItemsUrlSaga() {
  while (true) {
    const action = yield take(({type, payload}) =>
      type === GET_ITEMS_REQUEST && payload.request
    );
    const url = createFullUrlString(action.payload.request);
    yield put(setItemsRequest(url, action.payload.callback, action.payload.callbackErr));
  }
}

// watcher + worker
export function* watchItemsRequestSaga() {
  yield takeEvery(SET_ITEMS_REQUEST, function* ({payload}) {
    try {
      const data = yield retry(3, 1000, Fetching, payload.url, payload.callback, payload.callbackErr);
      yield put(getItemsSuccess(data));
    } catch (e) {
      yield put(getItemsFailure(e.message));
    }
  });
}
