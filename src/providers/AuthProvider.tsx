import React, { useReducer, useEffect } from 'react';
import { Action, State, User } from '../@types/AuthTypes';
import AuthContext from '../context/AuthContext';
import authReducer from '../reducers/authReducer';
import * as SecureStore from 'expo-secure-store';
import * as helperSecureStore from '../helpers/secureStore';
import { LOGGEDINFO, ACTIVEUSER } from '../constants/auth';
import { form_type_me } from '../services/user';
interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState: State = {
  isLoggedIn: false,
  activeUser: null,
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
    await SecureStore.setItemAsync(ACTIVEUSER, id);
    await helperSecureStore.addItem(LOGGEDINFO, {
      id,
      userToken,
      userRefreshToken,
      url,
    });
    dispatch({
      type: 'LOGGED_IN',
      payload: id,
    });
  };

  const handleToken = async () => {
    let activeUser;
    try {
      activeUser = await SecureStore.getItemAsync(ACTIVEUSER);
      if (activeUser) {
        const loggedInInfo = await helperSecureStore.findItemById(
          LOGGEDINFO,
          activeUser
        );
        if (!loggedInInfo) {
          await SecureStore.deleteItemAsync(ACTIVEUSER);
        }
      }
    } catch (error) {
      activeUser = null;
    } finally {
      dispatch({
        type: 'RESTORE_TOKEN',
        payload: {
          isLoggedIn: activeUser ? true : false,
          activeUser: activeUser ? activeUser : null,
        },
      });
    }
  };

  const handleLogout = async () => {
    let activeUser = await SecureStore.getItemAsync(ACTIVEUSER);
    await SecureStore.deleteItemAsync(ACTIVEUSER);
    if (activeUser) {
      await helperSecureStore.deleteItemById(LOGGEDINFO, activeUser);
    }
    dispatch({
      type: 'LOGGED_OUT',
      payload: null,
    });
  };

  const handleUser = async () => {
    const user = await form_type_me('cf7');
    console.log(user);
    dispatch({
      type: 'FETCH_USER',
      payload: user,
    });
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      handleToken();
    };

    bootstrapAsync();
  }, []);
  return (
    <AuthContext.Provider
      value={{ state, handleLogin, handleToken, handleLogout, handleUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
