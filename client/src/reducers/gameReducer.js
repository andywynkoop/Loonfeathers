import { GAME_STATUS, NEW_GAME, SET_TOPIC, CLOSE_SUB } from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GAME_STATUS:
      if (payload.name || Object.keys(payload).length === 0) {
        return payload;
      } else if (
        payload.data !== null &&
        payload.data.lastPlayed !== state.lastPlayed
      ) {
        return payload.data;
      } else {
        return state;
      }
    case NEW_GAME:
      return payload.data;
    case SET_TOPIC:
      return payload.data;
    case CLOSE_SUB:
      if (payload.data.joinable !== state.joinable) {
        return payload.data;
      } else {
        return state;
      }
    default:
      return state;
  }
};
