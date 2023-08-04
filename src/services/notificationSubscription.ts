import { makeApiRequest } from '../helpers/axiosInstance';

export const getSubscription = async (expo_token: string) => {
  const data = {
    expo_token,
  };
  let res = await makeApiRequest('/notification/subscription', 'GET', data);
  return res.data;
};

export const subscribe = async (expo_token: string) => {
  const data = {
    expo_token,
  };
  let res = await makeApiRequest('/notification/subscription', 'POST', data);
  return res.data;
};
