import { User } from './AuthTypes';

type PermaLink = {
  page_name: string;
  page_link: string;
};

interface FormType {
  id: string | number;
  title: number;
  date_created: string;
  registers: number;
  user_created: number | null;
  user: User | null;
  perma_links: PermaLink[];
}

export type { FormType };
