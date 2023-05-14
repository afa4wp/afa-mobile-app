import { publicApi } from '../helpers/axiosInstance';
import axios from 'axios';
import { LoginData } from '../@types/AuthTypes';
const api = publicApi('url');

export const signIn = async (url: string, data: LoginData) => {
  let res = await api.post(url + '/user/login', data);
  return res.data;
};
