import { makeApiRequest } from '../helpers/axiosInstance';

export const me = async () => {
  let res = await makeApiRequest(`/user/me`);
  return res.data;
};

export const form_type_me = async (form_type: string) => {
  let res = await makeApiRequest(`/user/${form_type}/me`);
  return res.data;
};
