import { HeaderCell } from "../../interfaces/TableHeaderInterface";

export const scrappedDocumentsTableHeaderData: HeaderCell[] = [
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
    field: "institution",
    title: "INSTITUTIE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "function",
    title: "FUNCTIE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "locality",
    title: "LOCALITATE",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "type",
    title: "TIP DOCUMENT",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "date",
    title: "DATA",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "",
  },
];

export const documentsFromDataBaseTableHeader: HeaderCell[] = [
  {
    field: "",
    align: "center",
    title: "#",
  },
  {
    field: "type",
    title: "TIPUL DOCUMENTULUI",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "job",
    title: "FUNCTIA",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "institution",
    title: "INSTITUTIA",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "dateStart",
    title: "PERIOADA",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },

  {
    field: "date",
    title: "DATA DOCUMENT",
    align: "center",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "",
  },
];
