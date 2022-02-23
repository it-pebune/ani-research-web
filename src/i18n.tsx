import i18n from "i18next";
import backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationRO from "./locales/ro/translation.json";

export const defaultNS = "translationRO";
export const resources = {
  en: {
    translation: translationEN,
  },
  ro: {
    translation: translationRO,
  },
} as const;

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "ro",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    lng: i18n.options.lng,
    ns: ["translation"],
    resources,
    defaultNS: "translation",
  });

export default i18n;
