import axios from 'axios';
import * as Toastr from 'toastr';
// import { saveToLocalStorage, decodeToken } from '../../../../utils';
import { AUTH_PENDING, AUTH_SUCCESS, AUTH_FAILURE, ACCOUNT_FAILURE, ACCOUNT_SUCCESS } from './type';

export const authPending = () => ({
  type: AUTH_PENDING,
  payload: {
    status: 'authenticationPending',
    error: null,
    user: {},
    isAuthenticated: false
  }
});

export const authSuccess = user => ({
  type: AUTH_SUCCESS,
  payload: {
    status: 'authenticationSuccess',
    error: null,
    user,
    isAuthenticated: true
  }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: {
    status: 'authenticationFail',
    error,
    user: {},
    isAuthenticated: false
  }
});


export const accountSuccess = account => ({
  type: ACCOUNT_SUCCESS,
  payload: {
    status: 'accountSuccess',
    error: null,
    account
  }
});

export const accountFailure = error => ({
  type: ACCOUNT_FAILURE,
  payload: {
    status: 'accountFailed',
    error,
    account: {},
  }
});

export const authAction = ({
  userData,
  history,
}) => async dispatch => {
  const { type, email, password } = userData;
  dispatch(authPending());

  try {

    const response = await axios({
      method: 'post',
      url: `http://localhost:4040/api/${type}`,
      data: { email, password }
    });
    
    const { token, user } = response.data;

    localStorage.setItem('token', token);

    Toastr.success('Welcome to Transact');
    dispatch(authSuccess(user));

    return history.push('/dashboard');
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : `${error.message}. It appears you're offline`;
    Toastr.error(message);
    dispatch(authFailure(message));
  }
};

export const createAccount = ({ pin, fullName, phoneNumber }) => async dispatch => {
  try {
    const response = await axios({
      method: 'post',
      url: `http://localhost:4040/api/open_account`,
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
      },
      data: { pin, fullName, phoneNumber }
    });

    console.log(response.data)
    Toastr.success(response.data.message);
    dispatch(accountSuccess(response.data.account));
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : `${error.message}. It appears you're offline`;
    Toastr.error(message);
    dispatch(accountFailure(message));
  }
};