import { HeaderCell } from "../../interfaces/TableHeaderInterface";

export const jobsTableHeaderData: HeaderCell[] = [
  {
    field: "",
  },
  {
    field: "name",
    align: "justify",
    title: "FUNCTIA",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "institution",
    align: "center",
    title: "INSTITUTIA",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "uat",
    align: "center",
    title: "LOCATIA",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "dateStart",
    align: "center",
    title: "ANUL",
    hasSortFunction: true,
    sortActive: true,
    direction: "asc",
  },
  {
    field: "",
  },
];
