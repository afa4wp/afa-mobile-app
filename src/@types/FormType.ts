import { EntryType } from './EntryType';

type PermaLink = {
  page_name: string;
  page_link: string;
};

type UserCreated = {
  user_id: number;
  user_name: string;
  user_email: string;
  avatar_url: string;
};
interface FormType {
  id: string | number;
  title: string;
  date_created: string;
  registers: number;
  user_created: UserCreated;
  perma_links: PermaLink[];
}

type State = {
  form: FormType;
  entry: EntryType;
};

interface FormContextProps {
  state: State;
  setForm: (form: FormType) => void;
  setEntry: (entry: EntryType | {}) => void;
  fetchEntry: (entryId: number | string) => void;
}

type Action =
  | { type: 'SET_FORM'; payload: FormType }
  | { type: 'SET_ENTRY'; payload: EntryType };

export type { Action, State, FormType, PermaLink, FormContextProps };
