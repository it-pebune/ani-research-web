import { Directions, HeaderCell } from "../../interfaces/TableHeaderInterface";

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
    direction: Directions.ASC,
  },
  {
    field: "dob",
    title: "DATA NASTERII",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "city",
    title: "ORAS",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "county",
    title: "JUDET",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "status",
    title: "STATUS",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "assignedTo",
    title: "ASIGNAT CATRE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
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
    direction: Directions.ASC,
  },
  {
    field: "district",
    title: "CIRCUMSCRIPTIE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "party",
    title: "PARTID",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "chamber",
    title: "INSTITUTIE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "",
  },
];

export const assignedSubjectsTableHeaderData: HeaderCell[] = [
  {
    field: "",
    align: "center",
    title: "#",
  },
  {
    field: "lastName",
    align: "justify",
    title: "NUME",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "city",
    title: "ORAS",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "status",
    title: "DOCUMENTE INCARCATE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "status",
    title: "DOCUMENTE PRELUCRATE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "",
  },
];
