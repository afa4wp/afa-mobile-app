import { makeApiRequest } from '../helpers/axiosInstance';

export const entries = async (
  form_type: string,
  form_id: number,
  page: number
) => {
  let res = await makeApiRequest(
    `/${form_type}/entries/form_id/${form_id}/page/${page}`
  );
  return res.data;
};

export const entry_by_id = async (form_type: string, entry_id: number) => {
  let res = await makeApiRequest(`/${form_type}/entries/${entry_id}`);
  return res.data;
};

export const entriesSearch = async (form_type: string, user_info: string) => {
  let res = await makeApiRequest(
    `/${form_type}/entries/user/search/${user_info}`
  );
  return res.data;
};
