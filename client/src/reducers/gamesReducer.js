import { FETCH_GAMES } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_GAMES:
      if (state.length === action.payload.data.length) {
        return state;
      } else {
        return action.payload.data;
      }
    default:
      return state;
  }
};
