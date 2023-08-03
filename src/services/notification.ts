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
  const params = new URLSearchParams(data).toString();
  let res = await makeApiRequest(`/notification/page/${page}?${params}`, 'GET');
  return res.data;
};
