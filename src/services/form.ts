import { makeApiRequest } from '../helpers/axiosInstance';

export const forms = async (form_type: string, page: number) => {
  let res = await makeApiRequest(`/${form_type}/forms/page/${page}`);
  return res.data;
};

export const formsSearch = async (form_type: string, post_name: string) => {
  let res = await makeApiRequest(`/${form_type}/forms/search/${post_name}`);
  return res.data;
};
