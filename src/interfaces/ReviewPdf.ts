export interface FieldData {
  [key: string]: any;
  field: string;
  value: string;
  valid: boolean;
  touched: boolean;
  active: boolean;
  hovered: boolean;
}
