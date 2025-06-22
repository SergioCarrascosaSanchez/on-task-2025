import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./resources/common/en.json";
import enUsers from "./resources/users/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: enCommon,
        users: enUsers,
      },
    },
    ns: ["common", "users"],
    defaultNS: "common",
  });

export default i18n;
