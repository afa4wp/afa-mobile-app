import { makeApiRequest } from '../helpers/axiosInstance';

export const formsPlugins = async () => {
  let res = await makeApiRequest(`/config/forms`, 'GET');
  return res.data;
};
