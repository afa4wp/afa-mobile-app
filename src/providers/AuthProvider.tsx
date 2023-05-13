import React, { useReducer, useEffect } from 'react';
import { Action, State, User } from '../@types/AuthTypes';
import AuthContext from '../context/AuthContext';
import authReducer from '../reducers/authReducer';

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState: State = {
  isLoggedIn: false,
  userToken: null,
  isLoading: true,
  user: {} as User,
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const handleLogin = async (token: string) => {};
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
