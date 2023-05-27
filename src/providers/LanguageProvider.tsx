import React, { useState, useEffect } from 'react';
import LanguageContext from '../context/LanguageContext';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { LanguageContextProps } from '../@types/LanguageTypes';
import { TRANSLATIONS, PREFERRED_LANGUAGE } from '../constants/locales';
import * as SecureStore from 'expo-secure-store';

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
          setLocale(getLocales()[0].languageCode);
        }
      } catch (error) {
        setLocale(getLocales()[0].languageCode);
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
