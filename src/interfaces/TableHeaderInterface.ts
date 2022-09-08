export enum Directions {
  ASC = "asc",
  DESC = "desc",
}

export interface HeaderCell {
  field?: string | undefined;
  align?: "center" | "justify" | "left" | "right" | "inherit";
  title?: string | undefined;
  hasSortFunction?: boolean;
  sortActive?: boolean;
  direction?: Directions | undefined;
}
