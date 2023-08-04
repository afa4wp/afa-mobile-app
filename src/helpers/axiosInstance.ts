import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  isAxiosError,
} from 'axios';
import * as helperSecureStore from '../helpers/secureStore';
import { LOGGEDINFO, ACTIVEUSER } from '../constants/auth';
import * as SecureStore from 'expo-secure-store';
import { LoggedData } from '../@types/AuthTypes';
import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

// Public API instance
export const publicApi = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL: baseURL,
  });
};

// Private API instance
const getPrivateApiInstance = async (): Promise<AxiosInstance> => {
  const activeUser = await SecureStore.getItemAsync(ACTIVEUSER);
  let loggedInInfo = {} as LoggedData;

  if (activeUser) {
    loggedInInfo = await helperSecureStore.findItemById(LOGGEDINFO, activeUser);
  }

  const apiInstance = axios.create({
    baseURL: loggedInInfo.url,
  });

  apiInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${loggedInInfo.userToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return apiInstance;
};

// Function to refresh the access token using the refresh token
const refreshAccessToken = async (): Promise<string> => {
  // const { handleLogout } = useContext(AuthContext);

  try {
    const activeUser = await SecureStore.getItemAsync(ACTIVEUSER);
    let loggedInInfo = {} as LoggedData;

    if (activeUser) {
      loggedInInfo = await helperSecureStore.findItemById(
        LOGGEDINFO,
        activeUser
      );
    }

    const { userRefreshToken, url } = loggedInInfo;

    const response = await axios.post(url + '/user/tokens/refresh', {
      refresh_token: userRefreshToken,
    });

    const { access_token, refresh_token } = response.data;

    if (activeUser) {
      await helperSecureStore.updateItemById(LOGGEDINFO, loggedInInfo.id, {
        id: activeUser,
        url: loggedInInfo.url,
        userToken: access_token,
        userRefreshToken: refresh_token,
      });
    }

    return access_token;
  } catch (error) {
    // handleLogout();
    console.log('Failed to refresh access token:', error.response?.data);
    throw new Error('Failed to refresh access token');
  }
};

// Function to handle token refresh and retry API requests
const handleRequestWithTokenRefresh = async (
  url: string,
  method: string,
  data: any,
  headers: { [key: string]: string } = {}
): Promise<any> => {
  try {
    const apiInstance: AxiosInstance = await getPrivateApiInstance();
    const response = await apiInstance.request({
      url,
      method,
      params: data,
      headers: headers,
    });
    // Handle successful response
    return response;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response?.status === 403 &&
      error.response?.data?.code === 'jwt_auth_invalid_token'
    ) {
      try {
        // Token expired, refresh the access token
        const accessToken = await refreshAccessToken();
        // Retry the original API request with the new access token
        const apiInstance = await getPrivateApiInstance();
        const response = await apiInstance.request({
          url,
          method,
          data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ...headers,
          },
        });
        // Handle successful response
        return response;
      } catch (refreshError) {
        // Check if the refresh error code is "jwt_auth_invalid_token"
        if (
          isAxiosError(refreshError) &&
          refreshError.response?.data?.code === 'jwt_auth_invalid_token'
        ) {
          // Throw the refresh error
          throw refreshError;
        } else {
          // Handle other refresh token errors
          console.log('Failed to refresh access token:', refreshError);
          throw new Error('Failed to refresh access token');
        }
      }
    } else {
      // Handle other API request errors
      console.log('API request error:', error);
      throw new Error('API request error');
    }
  }
};

export const makeApiRequest = async function (
  url: string,
  method = 'GET',
  data: any = null,
  headers: { [key: string]: string } = {}
) {
  try {
    return await handleRequestWithTokenRefresh(url, method, data, headers);
  } catch (error) {
    // Handle error
    console.log('Error making API request:', error);
    throw error;
  }
};
