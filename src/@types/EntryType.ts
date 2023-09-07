import { User } from './AuthTypes';

type AuthorInfo = {
  user_name: string;
  user_email: string;
  avatar_url: string;
};

type FormInfo = {
  id: number | string;
  title: string;
  date_created: string;
  registers: number | string;
  user_created: number | string;
};

interface EntryType {
  id: string | number;
  form_id: string | number;
  date_created: string;
  created_by: number;
  author_info: AuthorInfo | null;
  form_info: FormInfo;
  custom_title?: string;
  custom_subtitle?: string;
}

export type { EntryType };
