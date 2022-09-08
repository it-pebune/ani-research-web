import { Directions, HeaderCell } from "../../interfaces/TableHeaderInterface";

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
    direction: Directions.ASC,
  },
  {
    field: "institution",
    align: "center",
    title: "INSTITUTIA",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "uat",
    align: "center",
    title: "LOCATIA",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "dateStart",
    align: "center",
    title: "ANUL",
    hasSortFunction: true,
    sortActive: true,
    direction: Directions.ASC,
  },
  {
    field: "",
  },
];
