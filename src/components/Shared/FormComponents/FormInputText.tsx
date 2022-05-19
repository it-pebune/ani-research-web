import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../../interfaces/FormInputInterface";

const FormInputText = ({
  name,
  control,
  label,
  multiline,
  required,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          variant="outlined"
          multiline={multiline}
          required={required}
        />
      )}
    />
  );
};

export default FormInputText;
