import i18n from "../i18n";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SvgIcon,
} from "@mui/material";
import { useState } from "react";

const LanguageSelector = () => {
  const [lng, setLng] = useState(i18n.language);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value as string;
    i18n.changeLanguage(val);
    setLng(val);
  };

  function LngROicon() {
    return (
      <SvgIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="flag-icons-ro"
          viewBox="0 0 640 480"
        >
          <g fill-rule="evenodd" stroke-width="1pt">
            <path fill="#00319c" d="M0 0h213.3v480H0z" />
            <path fill="#ffde00" d="M213.3 0h213.4v480H213.3z" />
            <path fill="#de2110" d="M426.7 0H640v480H426.7z" />
          </g>
        </svg>
      </SvgIcon>
    );
  }

  function LngENicon() {
    return (
      <SvgIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="flag-icons-gb"
          viewBox="0 0 640 480"
        >
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path
            fill="#FFF"
            d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
          />
          <path
            fill="#C8102E"
            d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
          />
          <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
          <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
        </svg>
      </SvgIcon>
    );
  }

  return (
    <FormControl>
      <Select
        value={lng}
        onChange={handleChange}
        className="MuiSelect-select-language"
      >
        <MenuItem value="ro">
          <LngROicon></LngROicon>
        </MenuItem>
        <MenuItem value="en">
          <LngENicon></LngENicon>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
