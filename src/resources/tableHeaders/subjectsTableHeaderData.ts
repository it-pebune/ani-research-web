import { HeaderCell } from "../../interfaces/TableHeaderInterface";

export const subjectsTableHeaderData: HeaderCell[] = [
  {
    field: "",
  },
  {
    field: "lastName",
    align: "justify",
    title: "NUME",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "city",
    title: "ORAS",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "county",
    title: "JUDET",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "dob",
    title: "DATA NASTERII",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "status",
    title: "STATUS",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "assignedTo",
    title: "ASIGNAT CATRE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "",
  },
];

export const scrappedSubjectsTableHeaderData: HeaderCell[] = [
  {
    field: "",
    align: "center",
    title: "#",
  },
  {
    field: "name",
    title: "NUME SI PRENUME",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "district",
    title: "CIRCUMSCRIPTIE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
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
    field: "chamber",
    title: "INSTITUTIE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "",
  },
];
