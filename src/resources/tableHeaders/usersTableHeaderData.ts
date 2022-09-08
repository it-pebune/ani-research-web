import { Directions, HeaderCell } from "../../interfaces/TableHeaderInterface";

export const usersTableHeaderData: HeaderCell[] = [
  {
    field: "",
  },
  {
    field: "displayName",
    align: "justify",
    title: "NUME",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
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
    direction: Directions.DESC,
  },
  {
    title: "STATUS",
    align: "center",
  },
  {
    field: "",
  },
];

export const researchersTableHeaderData: HeaderCell[] = [
  {
    field: "",
  },
  {
    field: "displayName",
    align: "justify",
    title: "NUME",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "email",
    align: "center",
    title: "EMAIL",
  },
  {
    field: "",
  },
];
