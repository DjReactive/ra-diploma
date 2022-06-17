import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import searchReducer from '../reducers/search'
import productsReducer from '../reducers/products'
import categoriesReducer from '../reducers/categories'
import cartReducer from '../reducers/cart'
import alertsReducer from '../reducers/alerts'
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas'

const reducer = combineReducers({
  searchItems: searchReducer,
  productsList: productsReducer,
  productCart: cartReducer,
  alertMessage: alertsReducer,
  categoriesList: categoriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(saga);
export default store;
