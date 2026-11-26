
import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import AsyncStorage from
  '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import ru from './locales/ru.json';
import kk from './locales/kk.json';

export type AppLanguage = 'en' | 'ru' | 'kk';

const LANGUAGE_KEY = 'app_language';

const resources = {
  en: {
    translation: en,
  },

  ru: {
    translation: ru,
  },

  kk: {
    translation: kk,
  },
};

const isAppLanguage = (
  value: unknown
): value is AppLanguage => {
  return (
    value === 'en' ||
    value === 'ru' ||
    value === 'kk'
  );
};

export const languageReady = (async () => {
  let language: AppLanguage = 'en';

  try {
    const savedLanguage =
      await AsyncStorage.getItem(LANGUAGE_KEY);

    if (isAppLanguage(savedLanguage)) {
      language = savedLanguage;
    }
  } catch (error) {
    console.warn(
      'Language loading error:',
      error
    );
  }

  await i18n
    .use(initReactI18next)
    .init({
      resources,

      lng: language,

      fallbackLng: 'en',

      supportedLngs: ['en', 'ru', 'kk'],

      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: false,
      },
    });
})();

export const changeAppLanguage = async (
  language: AppLanguage
) => {
  await languageReady;

  await i18n.changeLanguage(language);

  await AsyncStorage.setItem(
    LANGUAGE_KEY,
    language
  );
};

export default i18n;
