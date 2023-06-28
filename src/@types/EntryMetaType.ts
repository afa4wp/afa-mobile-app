import { User } from './AuthTypes';

type MetaValueTypeFile = {
  file_url: string;
  file_name: string;
};
interface EntryMetaType {
  id: string | null;
  form_id: string | number;
  entry_id: string | number | null;
  meta_key: number | string | null;
  meta_value: Object[] | string[] | null;
  type: string | null;
  label: string | null;
}

export type { EntryMetaType, MetaValueTypeFile };
