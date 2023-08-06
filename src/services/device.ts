import axios from 'axios';
import { makeApiRequest } from '../helpers/axiosInstance';

type DeviceData = {
  expo_token: string;
  device_id: string;
  device_language: string;
};

export const register = async (
  end_point: string,
  data: DeviceData,
  access_token: string
) => {
  let res = await axios.post(end_point + '/user/device', data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const language = async (device_id: string, device_language: string) => {
  let res = await makeApiRequest(`/user/device/language`, 'PUT', {
    device_id: device_id,
    device_language: device_language,
  });
  return res.data;
};
