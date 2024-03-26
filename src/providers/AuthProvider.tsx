import React, { useReducer, useEffect } from 'react';
import { Action, State, User } from '../@types/AuthTypes';
import AuthContext from '../context/AuthContext';
import authReducer from '../reducers/authReducer';
import * as SecureStore from 'expo-secure-store';
import * as helperSecureStore from '../helpers/secureStore';
import { LOGGEDINFO, ACTIVEUSER, FORM_TYPE } from '../constants/auth';
import { formTypeMe } from '../services/user';
interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState: State = {
  isLoggedIn: false,
  activeUser: null,
  isLoading: true,
  user: {} as User,
  formType: null,
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleLogin = async (
    userToken: string,
    userRefreshToken: string,
    url: string,
    email: string
  ) => {
    try {
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
    } catch (error) {
      await SecureStore.deleteItemAsync(ACTIVEUSER);
      throw error;
    }
    
  };

  const handleToken = async () => {
    let activeUser;
    let formType;
    try {
      formType = await SecureStore.getItemAsync(FORM_TYPE);
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
          formType: formType ? formType : null,
        },
      });
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync(FORM_TYPE);
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

  const handleUser = async (formType: string) => {
    const user = await formTypeMe(formType);
    dispatch({
      type: 'FETCH_USER',
      payload: user,
    });
  };

  const updateFormType = async (formType: string) => {
    await SecureStore.setItemAsync(FORM_TYPE, formType);
    dispatch({
      type: 'UPDATE_FORM_TYPE',
      payload: formType,
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
      value={{
        state,
        handleLogin,
        handleToken,
        handleLogout,
        handleUser,
        updateFormType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
