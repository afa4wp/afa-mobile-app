import { makeApiRequest } from '../helpers/axiosInstance';

export const me = async () => {
  let res = await makeApiRequest(`/user/me`);
  return res.data;
};

export const formTypeMe = async (form_type: string) => {
  let res = await makeApiRequest(`/user/${form_type}/me`);
  return res.data;
};
