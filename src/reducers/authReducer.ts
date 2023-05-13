import { Reducer } from 'react';
import { Action, State } from '../@types/AuthTypes';

const authReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload,
      };
    }
    case 'LOGGED_OUT': {
      return {
        ...state,
        isLoggedIn: false,
        userToken: action.payload,
      };
    }
    case 'RESTORE_TOKEN': {
      return {
        ...state,
        userToken: action.payload.userToken,
        isLoggedIn: action.payload.isLoggedIn,
        isLoading: false,
      };
    }
    case 'FETCH_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
