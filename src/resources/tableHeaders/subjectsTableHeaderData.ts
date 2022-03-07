import { HeaderCell } from "../../interfaces/TableHeaderInterface";

export const subjectsTableHeaderData: HeaderCell[] = [
  {
    title: "#",
    align: "center",
  },
  {
    field: "name",
    align: "justify",
    title: "NUME",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "chamber",
    title: "CAMERA",
    align: "center",
  },
  {
    field: "party",
    title: "PARTID",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "district",
    title: "JUDET",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    title: "ACTIUNI",
    align: "center",
  },
];
