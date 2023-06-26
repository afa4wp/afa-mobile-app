import { makeApiRequest } from '../helpers/axiosInstance';

export const entryMeta = async (form_type: string, entry_id: number) => {
  let res = await makeApiRequest(
    `/${form_type}/entrymeta/entry_id/${entry_id}`
  );
  return res.data;
};
