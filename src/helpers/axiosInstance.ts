import axios, { AxiosInstance, isAxiosError } from 'axios';
import * as helperSecureStore from '../helpers/secureStore';
import { LOGGEDINFO, ACTIVEUSER } from '../constants/auth';
import * as SecureStore from 'expo-secure-store';
import { LoggedData } from '../@types/AuthTypes';

// Public API instance
export const publicApi = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL,
  });
};

// Public API instance

const privateApi = async () => {
  try {
    const all = await helperSecureStore.getAllItems(LOGGEDINFO);
    //console.log(all);
    const activeUser = await SecureStore.getItemAsync(ACTIVEUSER);
    let loggedInInfo = {} as LoggedData;

    if (activeUser) {
      loggedInInfo = await helperSecureStore.findItemById(
        LOGGEDINFO,
        activeUser
      );
    }
    const apiInstance = axios.create({
      baseURL: loggedInInfo.url,
    });

    apiInstance.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = `Bearer ${loggedInInfo.userToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return apiInstance;
  } catch (error) {
    return error;
  }
};

// Variable to track if a token refresh request is already in progress
let isRefreshing = false;
// Array to store the requests that are waiting for token refresh
let refreshSubscribers: Array<Function> = [];

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
  if (!isRefreshing) {
    isRefreshing = true;
    console.log('atualizando o token');
    try {
      const activeUser = await SecureStore.getItemAsync(ACTIVEUSER);
      let loggedInInfo = {} as LoggedData;

      if (activeUser) {
        loggedInInfo = await helperSecureStore.findItemById(
          LOGGEDINFO,
          activeUser
        );
      }
      const refreshToken = await loggedInInfo.userRefreshToken; // Retrieve the refresh token from storage
      const response = await axios.post(
        loggedInInfo.url + '/user/tokens/refresh',
        {
          refresh_token: refreshToken,
        }
      );

      const { access_token, refresh_token } = response.data;
      // Store the new access tokens securely
      if (activeUser) {
        await helperSecureStore.updateItemById(LOGGEDINFO, loggedInInfo.id, {
          id: activeUser,
          url: loggedInInfo.url,
          userToken: access_token,
          userRefreshToken: refresh_token,
        });
      }

      // Resolve all the pending requests with the new access token
      refreshSubscribers.forEach((subscriber) => subscriber(access_token));
      refreshSubscribers = [];
    } catch (error) {
      // Handle refresh token request error
      throw new Error('Failed to refresh access token');
    } finally {
      isRefreshing = false;
    }
  }

  // Return a promise that resolves with the new access token or waits for the refresh request to complete
  return new Promise((resolve) => {
    refreshSubscribers.push((access_token: string) => {
      resolve(access_token);
    });
  });
}

export const makeApiRequest = async function (
  url: string,
  method = 'GET',
  data = null
) {
  try {
    const apiInstance: AxiosInstance = await privateApi(); // Get the private API instance
    const response = await apiInstance.request({
      url,
      method,
      data,
    });
    // Handle successful response
    console.log('...........', response.data);
    return response;
  } catch (error) {
    console.log('entrou nesse erro');
    if (isAxiosError(error) && error.response?.status === 401) {
      // Token expired, refresh the access token
      try {
        await refreshAccessToken();
        // Retry the original API request with the new access token
        const apiInstance: AxiosInstance = await privateApi(); // Get the private API instance with the updated access token
        const response = await apiInstance.request({
          url,
          method,
          data,
        });
        // Handle successful response
        return response.data;
      } catch (refreshError) {
        // Handle refresh token error
        // For example, you may want to log the user out or show an error message
        throw new Error('Failed to refresh access token');
      }
    } else {
      // Handle other API request errors
      throw new Error('API request error');
    }
  }
};
