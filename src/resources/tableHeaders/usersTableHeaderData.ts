import { HeaderCell } from "../../interfaces/TableHeaderInterface";

export const usersTableHeaderData:HeaderCell[] = [
  {
    field: "",
  },
  {
    field: "displayName",
    align: "justify",
    title: "NUME",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    title: "ROL",
    align: "center",
  },
  {
    field: "lastLogin",
    align: "center",
    title: "MODIFICAT",
    hasSortFunction: true,
    sortActive: true,
    direction: "desc",
  },
  {
    title: "STATUS",
    align: "center",
  },
  {
    field: "",
  },
];
