import {
  SEARCH_ITEMS_REQUEST,
  SEARCH_ITEMS_FAILURE,
  SEARCH_ITEMS_SUCCESS,
  CHANGE_SEARCH_FIELD,
} from '../actions/actionTypes'

const initialState = {
  items: [], loading: false, error: null, tap: false, search: '',
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEMS_REQUEST:
      return { ...state, items: [], loading: true, error: null };
    case SEARCH_ITEMS_FAILURE:
      const {error} = action.payload;
      return { ...state, items: [], loading: false, error }
    case SEARCH_ITEMS_SUCCESS:
      const {items} = action.payload;
      return { ...state, items, loading: false, error: null }
    case CHANGE_SEARCH_FIELD:
      const {search} = action.payload;
      return { ...state, search, };
    default:
      return state;
  }
}
