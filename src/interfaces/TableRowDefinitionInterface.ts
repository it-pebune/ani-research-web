export interface MenuItemAction {
  action: string;
  text: string;
}

export interface TextField {
  name: string;
  weight?: "bold" | "regular" | undefined;
}

export interface SubjectState {
  value: number;
  text: string;
  color: string;
}

export interface RowCell {
  cellType: string;
  altField?: string | undefined;
  align?: "center" | "justify" | "left" | "right" | "inherit";
  field: string;
  inline?: boolean;
  icon?: string;
  action?: string | undefined;
  text?: string;
  states?: SubjectState[];
  fields?: TextField[];
  dateFormat?: string | undefined;
  ifExistsText?: string | undefined;
  ifNotExistsText?: string | undefined;
  menuItems?: MenuItemAction[] | undefined;
}
