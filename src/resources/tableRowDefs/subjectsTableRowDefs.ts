import { RowCell } from "../../interfaces/TableRowDefinitionInterface";

export const subjectsTableRowDefs: RowCell[] = [
  {
    cellType: "text",
    fields: [{ name: "index" }],
    align: "center",
  },
  {
    cellType: "text",
    fields: [{ name: "name", weight: "bold" }],
    align: "justify",
  },
  {
    cellType: "text",
    fields: [{ name: "chamber" }],
    align: "center",
  },
  {
    cellType: "text",
    fields: [{ name: "party" }],
    align: "center",
  },
  {
    cellType: "text",
    fields: [{ name: "district" }],
    align: "center",
  },
];
