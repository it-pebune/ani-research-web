import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "../../../interfaces/FormInputInterface";

const FormInputText = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default FormInputText;
