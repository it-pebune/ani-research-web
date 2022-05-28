import { SxProps, Theme } from "@mui/material";

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  multiline?: boolean;
  required?: boolean;
  rows?: number;
  sx?: SxProps<Theme>;
}
