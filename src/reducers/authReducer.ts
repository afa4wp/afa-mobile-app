import { Reducer } from 'react';
import { Action, State } from '../@types/AuthTypes';

const authReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      return {
        ...state,
        isLoggedIn: true,
        id: action.payload,
      };
    }
    case 'LOGGED_OUT': {
      return {
        ...state,
        isLoggedIn: false,
        formType: null,
        activeUser: action.payload,
      };
    }
    case 'RESTORE_TOKEN': {
      return {
        ...state,
        activeUser: action.payload.activeUser,
        isLoggedIn: action.payload.isLoggedIn,
        formType: action.payload.formType,
        isLoading: false,
      };
    }
    case 'FETCH_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'UPDATE_FORM_TYPE': {
      return {
        ...state,
        formType: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
