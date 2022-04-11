import { RowCell } from "../../interfaces/TableRowDefinitionInterface";

export const jobsTableRowDefs: RowCell[] = [
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
    fields: [{ name: "uat" }],
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "dateStart" }],
    align: "center",
  },
  {
    cellType: "icon-action",
    field: "",
    icon: "download",
    action: "view-subject",
    fields: [{ name: "id" }],
    align: "center",
  },
];
