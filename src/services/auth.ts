import { publicApi } from '../helpers/axiosInstance';
import { LoginData } from '../@types/AuthTypes';
import { makeApiRequest } from '../helpers/axiosInstance';

export const signIn = async (url: string, data: LoginData) => {
  const api = publicApi(url);
  let res = await api.post('/user/login', data);
  return res.data;
};

export const signInQRCode = async (url: string, secret: string) => {
  const api = publicApi(url);
  let res = await api.post('/user/login/qrcode', { secret });
  return res.data;
};

export const pingRoute = async (url: string) => {
  const api = publicApi(url);
  let res = await api.get('/ping');
  return res.data;
};

export const logout = async (device_id: string) => {
  let res = await makeApiRequest(`/user/logout`, 'POST', {
    device_id: device_id,
  });
  return res.data;
};
