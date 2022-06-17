import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_FAILURE,
  GET_ITEMS_SUCCESS,
  SET_ITEMS_REQUEST,
} from '../actions/actionTypes'

const defaultQuery = {
  path: '/items',
  categoryId: 0,
  offset: 0,
  q: '',
};
const initialState = {
  items: [], categories: [], callback: () => {},
  loading: false, error: null, query: defaultQuery,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS_REQUEST:
      return { ...state, items: [], loading: true, error: null };
    case GET_ITEMS_FAILURE:
      const {error} = action.payload;
      return { ...state, items: [], loading: false,
        callback: () => {}, error, query: defaultQuery, }
    case GET_ITEMS_SUCCESS:
      const {items} = action.payload;
      return { ...state, items, loading: false, error: null }
    case GET_ITEMS_REQUEST:
      const {request, callback, callbackErr} = action.payload;
      const { path, q, categoryId, offset, } = request;
      return { ...state, callback, callbackErr, query: {
        path, q, categoryId, offset,
      }};
    default:
      return state;
  }
}
