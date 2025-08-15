import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../../config/i18n/resources/common/en.json";
import enUsers from "../../config/i18n/resources/users/en.json";

export function createTestI18n(lng: string = "en") {
  const i18n = createInstance();
  i18n.use(initReactI18next);
  i18n.init({
    lng,
    fallbackLng: "en",
    resources: {
      en: { common: enCommon, users: enUsers },
    },
    ns: ["common", "users"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    debug: false,
  });
  return i18n;
}
