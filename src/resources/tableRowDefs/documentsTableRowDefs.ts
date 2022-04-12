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
    fields: [
      { name: "filename" },
      { name: "uid" },
      { name: "type" },
      { name: "date" },
    ],
    align: "center",
  },
];

export const documentsFromDataBaseTableRowDefs: RowCell[] = [
  {
    cellType: "index",
    field: "index",
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "type" }],
    align: "justify",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "jobPosition" }],
    align: "center",
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
    fields: [{ name: "dateStart" }, { name: "dateEnd" }],
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
    icon: "grading",
    action: "review-document",
    color: "primary",
    fields: [{ name: "id" }],
    align: "center",
  },
  {
    cellType: "icon-action",
    field: "",
    icon: "delete",
    action: "delete-document",
    color: "primary",
    fields: [{ name: "id" }],
    align: "center",
  },
];
