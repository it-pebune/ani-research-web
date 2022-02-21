import { resources, defaultNS } from "./i18n";
import translation from "./locales/en/translation.json";

// react-i18next versions lower than 11.11.0

// react-i18next versions higher than 11.11.0
declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources["en"];
  }
}
