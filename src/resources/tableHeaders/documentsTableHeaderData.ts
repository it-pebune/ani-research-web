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
    title: "TIPUL DOCUMENTULUI",
  },
  {
    field: "name",
    align: "left",
    title: "NUME SI PRENUME",
  },
  {
    field: "institution",
    align: "left",
    title: "DETALII",
  },
];

export const assignedSubjectDocumentsTableHeaderData: HeaderCell[] = [
  {
    field: "",
    align: "center",
    title: "#",
  },
  {
    field: "type",
    title: "TIPUL DOCUMENTULUI",
    align: "center",
    hasSortFunction: false,
    sortActive: false,
    direction: "asc",
  },
  {
    field: "job",
    title: "FUNCTIA",
    align: "center",
    hasSortFunction: false,
    sortActive: false,
    direction: "asc",
  },
  {
    field: "institution",
    title: "INSTITUTIA",
    align: "center",
    hasSortFunction: false,
    sortActive: false,
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
