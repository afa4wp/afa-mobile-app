import { publicApi } from '../helpers/axiosInstance';
import { LoginData } from '../@types/AuthTypes';

export const signIn = async (url: string, data: LoginData) => {
  const api = publicApi(url);
  let res = await api.post('/user/login', data);
  return res.data;
};

export const pingRoute = async (url: string) => {
  const api = publicApi(url);
  let res = await api.get('/ping');
  return res.data;
};
