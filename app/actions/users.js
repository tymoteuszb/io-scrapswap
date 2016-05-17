import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import { SubmissionError } from 'redux-form';

import * as types from 'constants';

polyfill();

function makeUserRequest(method, data, api='/login') {
  return request({
    url: api,
    method: method,
    data: data,
    withCredentials: true
  });
}

function loginRequest() {
  return {
    type: types.LOGIN_REQUEST
  };
}

function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS
  };
}

function loginFailure(error) {
  return {
    type: types.LOGIN_FAILURE,
    data: {
      error: error
    }
  };
}

export function login(data) {
  return dispatch => {
    dispatch(loginRequest());
    return makeUserRequest('post', data, '/login')
    .then(response => {
      if (response.status === 200) {
        dispatch(loginSuccess());
      } else {
        dispatch(loginFailure(response.data.message));
        throw new SubmissionError(response.data.message);
      }
    })
    .catch(err => {
      dispatch(loginFailure(err.data.message));
      throw new SubmissionError(err.data.message);
    });
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
    promise: makeUserRequest('post', null, '/logout')
  }
}

export function signUp(data) {
  // return dispatch => {
  //   return makeUserRequest('post', data, '/signup')
  //     .then(response => {
  //       if (response.status === 200) {
  //         dispatch(signUpSuccess(response.data.message));
  //         dispatch(push('/'));
  //       } else {
  //         dispatch(signUpError('Oops! Something went wrong'));
  //       }
  //     })
  //     .catch(err => {
  //       dispatch(signUpError(err.data.message));
  //     });
  // };
  return {
    type: types.SIGNUP,
    promise: makeUserRequest('post', data, '/signup')
  };
}

// Log In Action Creators
function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

// Sign Up Action Creators
function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message: message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message: message
  };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data));
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(err.data.message));
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());

    return makeUserRequest('post', null, '/logout')
      .then( response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}

