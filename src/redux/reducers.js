import { combineReducers } from 'redux';
import { AUTH_PENDING, AUTH_SUCCESS, AUTH_FAILURE, ACCOUNT_FAILURE, ACCOUNT_SUCCESS } from './type';

const authInitialState = {
    error: null,
    isAuthenticated: false,
    user: {},
    status: 'rest'
};

const accountInitialState = {
  error: null,
  account: {},
  status: 'rest'
};

const authTypes = [AUTH_PENDING, AUTH_FAILURE, AUTH_SUCCESS];
const accountTypes = [ACCOUNT_FAILURE, ACCOUNT_SUCCESS];
const authReducer = (state = authInitialState, { type, payload }) => {
  return authTypes.includes(type) ? { ...state, ...payload } : state;
};

const accountReducer = (state = accountInitialState, { type, payload }) => {
  return accountTypes.includes(type) ? { ...state, ...payload } : state;
};

export default combineReducers({
    authReducer,
    accountReducer
});