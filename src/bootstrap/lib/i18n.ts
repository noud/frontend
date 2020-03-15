import i18n from 'i18next';
import Fetch from 'i18next-fetch-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import store from '../../public/locales';

const loadPath = '/locales/{{lng}}/{{ns}}.json';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Fetch)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // debug: true,
    lng: 'nl-NL',
    fallbackLng: 'en-US',
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: store,
  });

export default i18n;
