import { makeApiRequest } from '../helpers/axiosInstance';

export const me = async () => {
  let res = await makeApiRequest(`/user/me`);
  return res.data;
};
