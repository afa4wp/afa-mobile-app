import { Reducer } from 'react';
import { Action, State } from '../@types/FormType';

const formReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_ENTRY': {
      return {
        ...state,
        entry: action.payload,
      };
    }
    case 'SET_FORM': {
      return {
        ...state,
        form: action.payload,
      };
    }
    default:
      return state;
  }
};

export default formReducer;
