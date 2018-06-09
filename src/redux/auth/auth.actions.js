import {
  LOGIN_REQUEST,
} from './auth.action-types';

export function logIn({ email, password }) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      email,
      password,
    }
  };
}