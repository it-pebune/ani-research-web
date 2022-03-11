import { RowCell } from "../../interfaces/TableRowDefinitionInterface";

export const usersTableRowDefs: RowCell[] = [
  {
    cellType: "avatar",
    altField: "displayName",
    field: "profileImageUrl",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "displayName", weight: "bold" }, { name: "email" }],
    align: "justify",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "role" }],
    align: "center",
  },
  {
    cellType: "date",
    dateFormat: "DD.MM.YYYY",
    field: "lastLogin",
    align: "center",
  },
  {
    cellType: "conditional-chip",
    field: "role",
    ifExistsText: "Activ",
    ifNotExistsText: "In asteptare",
  },
  {
    cellType: "dropdown-button",
    field: "",
    menuItems: [
      { action: "modify-roles", text: "Modifica roluri" },
      { action: "blacklist", text: "Blacklist" },
      { action: "delete", text: "Sterge" },
    ],
  },
];

export const researcherTableRowDefs: RowCell[] = [
  {
    cellType: "avatar",
    altField: "displayName",
    field: "profileImageUrl",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "displayName", weight: "bold" }],
    align: "justify",
  },
  {
    cellType: "text",
    field: "",
    fields: [{ name: "email" }],
    align: "center",
  },
  {
    cellType: "action-button",
    field: "",
    text: "Asigneaza",
    action: "view-subject",
    fields: [{ name: "id" }, { name: "displayName" }],
    align: "center",
  },
];
