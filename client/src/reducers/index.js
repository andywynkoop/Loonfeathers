import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gamesReducer from './gamesReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  auth: authReducer,
  games: gamesReducer,
  game: gameReducer
});
