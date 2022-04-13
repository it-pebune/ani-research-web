import {
  buildingsTableData,
  debtTableData,
  financeTableData,
  giftTableData,
  incomeTableData,
  investmentTableData,
  mobileTableData,
  parcelsTableData,
  transportTableData,
} from "../tableHeaders/assetsTable";

export const assetsOrder = [
  {
    name: "Terenuri",
    corespondent: "parcels",
    cells: parcelsTableData,
    grid: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  },
  {
    name: "Cladiri",
    corespondent: "buildings",
    cells: buildingsTableData,
    grid: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  },
  {
    name: "Mijloace de transport",
    corespondent: "transport",
    cells: transportTableData,
    grid: "1fr 1fr 1fr 1fr 1fr",
  },
  {
    name: "Bunuri mobile cu valoare mai mare de 3000 Euro",
    corespondent: "mobile",
    cells: mobileTableData,
    grid: "1fr 1fr 1fr 1fr 1fr",
  },
  {
    name: "Active financiare",
    corespondent: "finance",
    cells: financeTableData,
    grid: "1fr 1fr 1fr 1fr 1fr",
  },
  {
    name: "Plasamente si investitii",
    corespondent: "investment",
    cells: investmentTableData,
    grid: "1fr 1fr 1fr 1fr",
  },
  {
    name: "Datorii",
    corespondent: "debt",
    cells: debtTableData,
    grid: "1fr 1fr 1fr 1fr",
  },
  {
    name: "Cadouri",
    corespondent: "gift",
    cells: giftTableData,
    grid: "1fr 1fr 1fr 1fr",
  },
  {
    name: "Venituri",
    corespondent: "income",
    cells: incomeTableData,
    grid: "1fr 1fr 1fr 1fr",
  },
];
