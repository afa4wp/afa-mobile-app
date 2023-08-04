import { makeApiRequest } from '../helpers/axiosInstance';

export const notifications = async (
  page: number,
  supported_plugin: string,
  device_language: string
) => {
  const data = {
    supported_plugin,
    device_language,
  };
  let res = await makeApiRequest(`/notification/page/${page}`, 'GET', data);
  return res.data;
};
