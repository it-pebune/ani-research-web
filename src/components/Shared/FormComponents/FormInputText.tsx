import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../../interfaces/FormInputInterface";

const FormInputText = ({
  name,
  control,
  label,
  multiline,
  required,
  rows,
  sx,
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
          multiline={multiline ?? false}
          required={required ?? false}
          rows={rows ?? 1}
          sx={sx ?? {}}
        />
      )}
    />
  );
};

export default FormInputText;
