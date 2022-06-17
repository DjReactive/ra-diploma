import {
  START_ALERT_MESSAGE,
} from '../actions/actionTypes'

const initialState = {
  type: 'danger', message: '',
};

export default function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case START_ALERT_MESSAGE:
      const {type, message} = action.payload;
      return { type, message }
    default:
      return state;
  }
}
