import axios from 'axios';

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
