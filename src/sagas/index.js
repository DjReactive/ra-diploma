import { spawn } from 'redux-saga/effects'
import { watchCartOrderSaga } from './cart'
import { watchChangeSearchSaga, watchSearchItemsSaga } from './search'
import { watchItemsRequestSaga, watchGetItemsUrlSaga } from './products'
import { watchCategoriesSaga } from './categories'

export default function* saga() {
  // Search
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchItemsSaga);
  // Category
  yield spawn(watchCategoriesSaga);
  //Products
  yield spawn(watchGetItemsUrlSaga);
  yield spawn(watchItemsRequestSaga);
  // Cart Order
  yield spawn(watchCartOrderSaga);
}
