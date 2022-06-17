import Storage from '../api/Storage'
import { compareValues } from '../api/Functions'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_PURCHASE_ITEMS,
  CART_PURCHASE_FAILURE,
  CART_PURCHASE_SUCCESS,
} from '../actions/actionTypes'

const storage = new Storage('items', []);
const initialState = { items: storage.get(), error: null, loading: false, success: false, }

export default function cartReducer(state = initialState, action) {
  let newState = state;
  const items = storage.get();
  switch (action.type) {
    case CART_ADD_ITEM:
      const {item, prop: {count, size}} = action.payload;
      let newItem = JSON.parse(JSON.stringify(item));
      delete newItem.sizes;
      newItem.size = size;
      const cartItem = items.find(o => compareValues(o, newItem, 'count'));
      storage.set(cartItem ?
        (items.map(o => o.id === newItem.id ? ({ ...o, count: o.count + count }) : o)) :
        [...items, { ...newItem, count }]
      );
      break;
    case CART_REMOVE_ITEM:
      const {id} = action.payload;
      storage.set(newState.items.filter(o => o.id !== id));
      break;
    case CART_PURCHASE_ITEMS:
      newState = { ...newState, loading: true, error: null, success: false, }
      break;
    case CART_PURCHASE_SUCCESS:
      storage.set([]);
      newState = { ...newState, loading: false, success: true, }
      break;
    case CART_PURCHASE_FAILURE:
      const {error} = action.payload;
      newState = { ...newState, loading: false, error, }
      break;
    default:
      break;
  }
  return { ...newState, items: storage.get() };
}
