import axios from 'axios';
import {
  FETCH_USER,
  NEW_GAME,
  FETCH_GAMES,
  GAME_STATUS,
  SET_TOPIC,
  SUBMIT,
  CLOSE_SUB,
  CORRECT,
  INCORRECT,
  END,
  CREATE_USER
} from './types';

export const fetchUser = () => async dispatch => {
  //redux thunk gives direct access to dispatch (this function);controls what gets returned
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const newGame = (name, displayName, _id) => {
  const request = axios.post('/api/game', { name, displayName, _id });
  return {
    type: NEW_GAME,
    payload: request
  };
};

export const fetchGames = () => {
  const request = axios.get('/api/game');
  return {
    type: FETCH_GAMES,
    payload: request
  };
};

export const gameStatus = name => {
  const request = axios.get(`/api/game/status?id=${name}`);
  return {
    type: GAME_STATUS,
    payload: request
  };
};

export const setGame = game => {
  return {
    type: GAME_STATUS,
    payload: game
  };
};

export const joinGame = name => async dispatch => {
  const res = await axios.post('/api/game/join', { name });
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const setTopic = (_id, topic) => {
  const request = axios.post('/api/game/topic', { _id, topic });
  return {
    type: SET_TOPIC,
    payload: request
  };
};

export const submit = (_id, submission) => {
  const request = axios.post('/api/game/submit', { _id, submission });

  return {
    type: SUBMIT,
    payload: request
  };
};
export const close = _id => {
  const request = axios.post('/api/game/close', { _id });

  return {
    type: CLOSE_SUB,
    payload: request
  };
};
export const correctGuess = (_id, submission, guesser) => {
  const request = axios.post('/api/game/correct', {
    _id,
    submission,
    guesser
  });

  return {
    type: CORRECT,
    payload: request
  };
};
export const incorrectGuess = _id => {
  const request = axios.post('/api/game/incorrect', { _id });
  return {
    type: INCORRECT,
    payload: request
  };
};

export const end = _id => {
  const request = axios.post('/api/game/end', { _id });
  return {
    type: END,
    payload: request
  };
};

export const createUser = (username, hash) => {
  const request = axios.post('/api/auth/loon', { username, hash });

  return {
    type: CREATE_USER,
    payload: request
  };
};
