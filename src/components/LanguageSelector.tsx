import i18n from "../i18n";
import {
  Avatar,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const LanguageSelector = () => {
  const [lng, setLng] = useState(i18n.language);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value as string;
    i18n.changeLanguage(val);
    setLng(val);
  };

  return (
    <FormControl
      sx={{
        "& .MuiSelect-select": {
          padding: "5px 8px 0",
        },
      }}
    >
      <Select value={lng} onChange={handleChange}>
        <MenuItem value="ro">
          <Avatar
            sx={{ height: "20px", width: "20px" }}
            src="locales/flags/ro.svg"
          />
        </MenuItem>
        <MenuItem value="en">
          <Avatar
            sx={{ height: "20px", width: "20px" }}
            src="locales/flags/en.svg"
          />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
