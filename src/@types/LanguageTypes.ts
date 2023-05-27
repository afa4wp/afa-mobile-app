import { I18n } from 'i18n-js';

interface LanguageContextProps {
  locale: string;
  i18n: I18n;
  changeLanguage: (newLocale: string) => void;
}

type LanguageItemType = {
  label: string;
  originalLabel: string;
  onPress: () => void;
};

export type { LanguageContextProps, LanguageItemType };
