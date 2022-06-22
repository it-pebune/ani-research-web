import { HeaderCell } from "../../interfaces/TableHeaderInterface";

export const scrappedDocumentsTableHeaderData: HeaderCell[] = [
  {
    field: "",
    align: "center",
    title: "",
  },
  {
    field: "type",
    title: "TIPUL DOCUMENTULUI",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "name",
    title: "NUME SI PRENUME",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "institution",
    title: "DETALII",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
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
