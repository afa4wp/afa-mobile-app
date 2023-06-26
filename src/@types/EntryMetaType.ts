import { User } from './AuthTypes';

interface EntryMetaType {
  id: string | null;
  form_id: string | number;
  entry_id: string | number | null;
  meta_key: number | string | null;
  meta_value: number | string | null;
  type: string | null;
  label: string | null;
}

export type { EntryMetaType };
