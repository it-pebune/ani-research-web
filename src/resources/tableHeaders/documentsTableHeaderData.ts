import { HeaderCell } from "../../interfaces/TableHeaderInterface";

export const scrappedDocumentsTableHeaderData: HeaderCell[] = [
  {
    field: "",
    align: "center",
    title: "",
  },
  {
    field: "type",
    align: "left",
    title: "Tipul documentului",
  },
  {
    field: "name",
    align: "left",
    title: "Nume si prenume",
  },
  {
    field: "institution",
    align: "left",
    title: "Detalii",
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
