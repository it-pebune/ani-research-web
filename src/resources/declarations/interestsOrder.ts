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
    corespondent: "company_shares",
    cells: companyTableData,
    grid: "1fr 1fr 1fr 1fr",
  },
  {
    name: "Membru consiliu de administratie",
    corespondent: "man_companies",
    cells: boardTableData,
    grid: "1fr 1fr 1fr ",
  },
  {
    name: "Membru in asociatii profesionale si/sau sindicale",
    corespondent: "asociations",
    cells: sindicateTableData,
    grid: "1fr ",
  },
  {
    name: "Membru in organe de conducere ale partidelor politice",
    corespondent: "party",
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
