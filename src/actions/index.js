import {
  // Search
  CHANGE_SEARCH_FIELD,  SEARCH_ITEMS_REQUEST,  SEARCH_ITEMS_FAILURE,  SEARCH_ITEMS_SUCCESS,
  // Cart
  CART_ADD_ITEM,  CART_REMOVE_ITEM, CART_PURCHASE_ITEMS, CART_PURCHASE_FAILURE,
  CART_PURCHASE_SUCCESS,
  // Alert
  START_ALERT_MESSAGE,
  // Products
  GET_ITEMS_REQUEST, GET_ITEMS_FAILURE, GET_ITEMS_SUCCESS, SET_ITEMS_REQUEST,
  // Category
  CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_FAILURE,
} from'./actionTypes';

// Search
export const searchItemsRequest = search => (
  {type: SEARCH_ITEMS_REQUEST, payload: {search}, }
);
export const searchItemsFailure = error => (
  {type: SEARCH_ITEMS_FAILURE, payload: {error}, }
);
export const searchItemsSuccess = items => (
  {type: SEARCH_ITEMS_SUCCESS, payload: {items}, }
);
export const changeSearchField = search => (
  {type: CHANGE_SEARCH_FIELD, payload: {search}, }
);

// Cart
export const cartAddItem = (item, prop) => (
  {type: CART_ADD_ITEM, payload: {item, prop}, }
);
export const cartRemoveItem = id => (
  {type: CART_REMOVE_ITEM, payload: {id}, }
);
export const cartPurchaseItems = purchaseList => (
  {type: CART_PURCHASE_ITEMS, payload: {purchaseList}, }
);
export const cartPurchaseSuccess = () => (
  {type: CART_PURCHASE_SUCCESS, }
);
export const cartPurchaseFailure = error => (
  {type: CART_PURCHASE_FAILURE, payload: {error}, }
);

// Alert
export const startAlertMessage = (type, message) => (
  {type: START_ALERT_MESSAGE, payload: {type, message}, }
);

// Products
export const setItemsRequest = (url, callback, callbackErr) => (
  {type: SET_ITEMS_REQUEST, payload: {url, callback, callbackErr}, }
);
export const getItemsFailure = error => (
  {type: GET_ITEMS_FAILURE, payload: {error}, }
);
export const getItemsSuccess = items => (
  {type: GET_ITEMS_SUCCESS, payload: {items}, }
);
export const getItemsRequest = (request, callback, callbackErr) => (
  {type: GET_ITEMS_REQUEST, payload: {request, callback, callbackErr}, }
);

// Categories
export const categoriesRequest = (path) => (
  {type: CATEGORIES_REQUEST, payload: {path}, }
);
export const categoriesFailure = error => (
  {type: CATEGORIES_FAILURE, payload: {error}, }
);
export const categoriesSuccess = categories => (
  {type: CATEGORIES_SUCCESS, payload: {categories}, }
);
