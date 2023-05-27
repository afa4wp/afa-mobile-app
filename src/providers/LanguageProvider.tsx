import React, { useState, useEffect } from 'react';
import LanguageContext from '../context/LanguageContext';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { LanguageContextProps } from '../@types/LanguageTypes';
import { TRANSLATIONS, PREFERRED_LANGUAGE } from '../constants/locales';
import * as SecureStore from 'expo-secure-store';
import {
  TRANSLATIONS_OBJECT,
  PREFERRED_LANGUAGE_CODE,
} from '../constants/locales';
interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<string | null>(null);
  const [i18n, setI18n] = useState<I18n | null>(null);

  useEffect(() => {
    const fetchPreferredLanguage = async () => {
      try {
        const storedLanguage = await SecureStore.getItemAsync(
          PREFERRED_LANGUAGE
        );
        if (storedLanguage) {
          setLocale(storedLanguage);
        } else {
          preferredLanguage();
        }
      } catch (error) {
        preferredLanguage();
      }
    };

    fetchPreferredLanguage();
  }, []);

  useEffect(() => {
    if (locale) {
      const i18nInstance = new I18n(TRANSLATIONS);
      i18nInstance.locale = locale;
      setI18n(i18nInstance);
    }
  }, [locale]);

  const changeLanguage = async (newLocale: string) => {
    try {
      await SecureStore.setItemAsync(PREFERRED_LANGUAGE, newLocale);
      setLocale(newLocale);
    } catch (error) {
      console.log('Error saving preferred language:', error);
    }
  };

  const preferredLanguage = () => {
    const defaultLanguage = getLocales()[0].languageCode;
    if (TRANSLATIONS_OBJECT.hasOwnProperty(defaultLanguage)) {
      setLocale(defaultLanguage);
    } else {
      setLocale(PREFERRED_LANGUAGE_CODE);
    }
  };

  const contextValue: LanguageContextProps = {
    locale: locale || getLocales()[0].languageCode,
    i18n: i18n!,
    changeLanguage,
  };
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
