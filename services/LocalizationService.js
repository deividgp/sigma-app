import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import en from "../locales/en.json";
import es from "../locales/es.json";
import ca from "../locales/ca.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
  ca: { translation: ca },
};

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: "v3",
  lng: "en" ?? getLocales()[0].languageCode,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
