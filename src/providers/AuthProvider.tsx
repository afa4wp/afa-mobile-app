import React, { useReducer, useEffect } from 'react';
import { Action, State, User } from '../@types/AuthTypes';
import AuthContext from '../context/AuthContext';
import authReducer from '../reducers/authReducer';
import * as SecureStore from 'expo-secure-store';
import * as helperSecureStore from '../helpers/secureStore';

const LOGGEDINFO = 'LOGGEDINFO';
interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState: State = {
  isLoggedIn: false,
  userToken: null,
  activeUser: null,
  userRefreshToken: null,
  isLoading: true,
  user: {} as User,
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleLogin = async (
    userToken: string,
    userRefreshToken: string,
    url: string,
    email: string
  ) => {
    const id = url + '@' + email;
    await SecureStore.setItemAsync('activeUser', id);
    await helperSecureStore.addItem(LOGGEDINFO, {
      id,
      userToken,
      userRefreshToken,
    });
    dispatch({
      type: 'LOGGED_IN',
      payload: id,
    });
  };

  const handleToken = async () => {};

  const handleLogout = async () => {};

  return (
    <AuthContext.Provider
      value={{ state, handleLogin, handleToken, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
