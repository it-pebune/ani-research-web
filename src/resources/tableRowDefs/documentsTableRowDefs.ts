import { RowCell } from "../../interfaces/TableRowDefinitionInterface";

export const scrappedDocumentsTableRowDefs: RowCell[] = [
  {
    cellType: "index",
    field: "index",
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "name" }],
    align: "justify",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "institution" }],
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "function" }],
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "locality" }],
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "type" }],
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "date" }],
    align: "center",
  },
  {
    cellType: "icon-action",
    field: "",
    icon: "visibility",
    action: "download-document",
    color: "primary",
    fields: [{ name: "filename" }, { name: "uid" }],
    align: "center",
  },
];
