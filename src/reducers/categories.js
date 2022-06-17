import {
  CATEGORIES_REQUEST,
  CATEGORIES_FAILURE,
  CATEGORIES_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
  categories: [], loading: false, error: null, path: '/categories',
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return { ...state, items: [], loading: true, error: null };
    case CATEGORIES_FAILURE:
      const {error} = action.payload;
      return { ...state, categories: [], loading: false, error }
    case CATEGORIES_SUCCESS:
      const {categories} = action.payload;
      return { ...state, categories, loading: false, error: null }
    default:
      return state;
  }
}
