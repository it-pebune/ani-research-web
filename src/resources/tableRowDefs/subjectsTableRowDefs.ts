import { RowCell } from "../../interfaces/TableRowDefinitionInterface";

export const subjectsTableRowDefs: RowCell[] = [
  {
    cellType: "image",
    field: "photoUrl",
    align: "center",
  },
  {
    cellType: "text",
    inline: true,
    field: "",
    fields: [
      { name: "lastName", weight: "bold" },
      { name: "firstName", weight: "bold" },
    ],
    align: "left",
  },
  {
    cellType: "date",
    dateFormat: "DD.MM.YYYY",
    field: "dob",
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "city" }],
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "county" }],
    align: "center",
  },

  {
    cellType: "status-chip",
    field: "status",
    states: [
      { value: 0, text: "Neasignat", color: "red" },
      { value: 1, text: "In lucru", color: "blue" },
      { value: 2, text: "prelucrat", color: "green" },
    ],
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "assignedTo" }],
    align: "center",
  },
  {
    cellType: "dropdown-button",
    field: "",
    menuItems: [
      { action: "assign", text: "Asigneaza" },
      { action: "update", text: "Modifica" },
      { action: "delete", text: "Sterge" },
    ],
  },
];

export const assignedSubjectsTableRowDefs: RowCell[] = [
  {
    cellType: "image",
    field: "photoUrl",
    align: "center",
  },
  {
    cellType: "text",
    inline: true,
    field: "",
    fields: [
      { name: "lastName", weight: "bold" },
      { name: "firstName", weight: "bold" },
    ],
    align: "left",
  },

  {
    cellType: "text",
    field: "status",
    fields: [{ name: "status" }],
    align: "center",
  },
  {
    cellType: "text",
    field: "status",
    fields: [{ name: "status" }],
    align: "center",
  },
  {
    cellType: "action-button",
    field: "",
    text: "Documente",
    action: "view-documents",
    fields: [{ name: "id" }, { name: "displayName" }],
    align: "center",
  },
];

export const scrappedSubjectsTableRowDefs: RowCell[] = [
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
    fields: [{ name: "district" }],
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "party" }],
    align: "center",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "chamberName" }],
    align: "center",
  },
  {
    cellType: "icon-action",
    field: "",
    icon: "visibility",
    action: "view-subject",
    fields: [{ name: "chamber" }, { name: "id" }],
    align: "center",
  },
];
