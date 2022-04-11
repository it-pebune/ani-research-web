import {
  boardTableData,
  companyTableData,
  contractsTableData,
  partyTableData,
  sindicateTableData,
} from "../tableHeaders/interestsTable";

export const interestsOrder = [
  {
    name: "Asociat actionar",
    corespondent: "asociat",
    cells: companyTableData,
    grid: "1fr 1fr 1fr 1fr",
  },
  {
    name: "Membru consiliu de administratie",
    corespondent: "company_comm",
    cells: boardTableData,
    grid: "1fr 1fr 1fr ",
  },
  {
    name: "Membru in asociatii profeionale si/sau sindicale",
    corespondent: "management_comm",
    cells: sindicateTableData,
    grid: "1fr ",
  },
  {
    name: "Membru in organe de conducere ale partidelor politice",
    corespondent: "management_party",
    cells: partyTableData,
    grid: "1fr",
  },
  {
    name: "Contracte",
    corespondent: "contracts",
    cells: contractsTableData,
    grid: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  },
];
