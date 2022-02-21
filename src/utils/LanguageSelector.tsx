import { useTranslation } from "react-i18next";
import i18n from "i18next";

const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};

const LanguageSelector = () => {
  return (
    <div>
      <button onClick={() => changeLanguage("ro")}>ro</button>
      <button onClick={() => changeLanguage("en")}>en</button>
    </div>
  );
};

export default LanguageSelector;
