import { makeApiRequest } from '../helpers/axiosInstance';

type DeviceData = {
  expo_token: string;
  device_id: string;
  device_language: string;
};

export const register = async (data: DeviceData) => {
  let res = await makeApiRequest('/user/device', 'POST', data);
  return res.data;
};
