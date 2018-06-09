import * as actionTypes from './auth.action-types';

const initialState = {
  isLoggedIn: false,
  loginInProgress: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loginInProgress: true,
      };
    default:
      return state;
  }
}
