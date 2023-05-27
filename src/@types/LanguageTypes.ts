import { I18n } from 'i18n-js';

interface LanguageContextProps {
  locale: string;
  i18n: I18n;
  changeLanguage: (newLocale: string) => void;
}

export type { LanguageContextProps };
