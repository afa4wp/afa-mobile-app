import en from '../locales/en.json';
import pt from '../locales/pt.json';
import it from '../locales/it.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import es from '../locales/es.json';

const TRANSLATIONS = {
  en,
  pt,
  it,
  fr,
  de,
  es,
};

const TRANSLATIONS_OBJECT: { [key: string]: string } = {
  en: 'English',
  pt: 'Português',
  it: 'Italiano',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
};
const PREFERRED_LANGUAGE_CODE = 'en';

const PREFERRED_LANGUAGE = 'PREFERREDLANGUAGE';

export {
  TRANSLATIONS,
  PREFERRED_LANGUAGE,
  TRANSLATIONS_OBJECT,
  PREFERRED_LANGUAGE_CODE,
};
