import { changeSearchField } from '../actions'
import { useNavigate } from 'react-router-dom'

export function searchChangeValue(evt, dispatch) {
  const {target: {value}} = evt;
  dispatch(changeSearchField(value));
}

export function searchFormSubmit(search = '', callback = () => {}) {
  if (search.trim() === '') return false;

  const params = new URLSearchParams({q: search})
  callback(`/catalog?${params}`);
  return true;
}
