import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import data from "../../resources/di_202001_integritate.eu_CA_custom.json";
import { Document, Page, pdfjs } from "react-pdf";
import { interestsOrder } from "../../resources/declarations/interestsOrder";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import { HeaderCell } from "../../interfaces/TableHeaderInterface";
import { FieldData } from "../../interfaces/ReviewPdf";

import CustomRowOfInterests from "../../components/Shared/CustomRowOfInterests";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {}

interface AsociatI {
  [key: string]: any;
  company: string;
  no_of_shares: string;
  position: string;
  value_of_shares: string;
}

interface CompanyI {
  [key: string]: any;
  company: string;
  position: string;
  value_of_shares: string;
}

interface SindicatesI {
  [key: string]: any;
  line: string;
}

interface PartyI {
  [key: string]: any;
  line: string;
}

interface ContractsI {
  [key: string]: any;
  owner: string;
  institution: string;
  duration: string;
  date_of_contract: string;
  contract_type: string;
  procedure: string;
  value: string;
}

interface FieldsI {
  [key: string]: any;
  owner: string;
  institution: string;
  duration: string;
  date_of_contract: string;
  contract_type: string;
  procedure: string;
  value: string;
  line: string;
  company: string;
  no_of_shares: string;
  position: string;
  value_of_shares: string;
}

interface DataI {
  [key: string]: any;
  asociat: AsociatI[];
  company_comm: CompanyI[];
  management_comm: SindicatesI[];
  management_party: PartyI[];
  contracts: ContractsI[];
}

interface RowI {
  [key: string]: any;
  row: FieldData[];
}

interface FormatedTableI {
  table: string;
  data: RowI[];
}

interface TableData {
  name: string;
  cells: HeaderCell[];
  grid: string;
  data?: RowI[];
}

const ReviewPdf: React.FC<Props> = () => {
  const [tableArray, setTableArray] = useState<TableData[]>([]);
  const [loadedData, setLoadedData] = useState<FormatedTableI[]>([]);
  const [tableTouched, setTableTouched] = useState(false);
  const [cellActive, setCellActive] = useState(false);

  const onDocumentLoadSuccess = (response: any) => {};

  const tableArraySetValueToCell = (
    cellIndex: number,
    rowIndex: number,
    tableIndex: number,
    field: string,
    value: string
  ) => {
    setTableArray((prevState) =>
      prevState.map((table, tIndex) =>
        tableIndex === tIndex
          ? {
              ...table,
              data: table.data?.map((item, rIndex) =>
                rowIndex === rIndex
                  ? {
                      ...item,
                      row: item.row.map((cell, cIndex) =>
                        cellIndex === cIndex
                          ? {
                              ...cell,
                              [field]: typeof value !== undefined ? value : "",
                            }
                          : cell
                      ),
                    }
                  : item
              ),
            }
          : table
      )
    );
  };

  const tableArrayBooleanToFalse = (field: string) => {
    setTableArray((prevState) =>
      prevState.map((table) => ({
        ...table,
        data: table.data?.map((item) => ({
          ...item,
          row: item.row.map((cell) => ({ ...cell, [field]: false })),
        })),
      }))
    );
  };

  const tableArrayBooleanSelector = (
    cellIndex: number,
    rowIndex: number,
    tableIndex: number,
    field: string,
    state?: boolean
  ) => {
    setTableArray((prevState) =>
      prevState.map((table, tIndex) =>
        tableIndex === tIndex
          ? {
              ...table,
              data: table.data?.map((item, rIndex) =>
                rowIndex === rIndex
                  ? {
                      ...item,
                      row: item.row.map((cell, cIndex) =>
                        cellIndex === cIndex
                          ? {
                              ...cell,
                              [field]: state,
                            }
                          : { ...cell, [field]: false }
                      ),
                    }
                  : {
                      ...item,
                      row: item.row.map((cell) => ({
                        ...cell,
                        [field]: false,
                      })),
                    }
              ),
            }
          : {
              ...table,
              data: table.data?.map((item) => ({
                ...item,
                row: item.row.map((cell) => ({ ...cell, [field]: false })),
              })),
            }
      )
    );
  };

  const handleHoveredCell = (
    index: number,
    rIndex: number,
    tIndex: number,
    state: boolean
  ) => {
    tableArrayBooleanSelector(index, rIndex, tIndex, "hovered", state);
  };

  const handleCellActive = (
    cellIndex: number,
    rowIndex: number,
    tableIndex: number,
    state: boolean
  ) => {
    tableArrayBooleanToFalse("hovered");
    tableArrayBooleanSelector(cellIndex, rowIndex, tableIndex, "active", state);
    setCellActive(state);
  };

  const handleMoveUp = (
    cellIndex: number,
    rowIndex: number,
    tableIndex: number
  ) => {
    setCellActive(false);
    if (rowIndex !== 0) {
      setTableArray((prevState) =>
        prevState.map((table, tIndex) =>
          tableIndex === tIndex
            ? {
                ...table,
                data: table.data
                  ?.map((item, rIndex) => ({
                    ...item,
                    row: item.row.map((cell, cIndex) =>
                      cellIndex === cIndex && rIndex === rowIndex - 1
                        ? {
                            ...cell,
                            value: `${cell.value} ${
                              table.data
                                ? table.data[rowIndex].row[cellIndex].value
                                : ""
                            }`,
                          }
                        : cellIndex === cIndex && rIndex === rowIndex
                        ? { ...cell, value: "", active: false }
                        : cell
                    ),
                  }))
                  .filter(
                    (item) =>
                      item.row.filter((cell) => cell.value !== "").length > 0
                  ),
              }
            : table
        )
      );
    }
  };

  const handleMoveLeft = (
    cellIndex: number,
    rowIndex: number,
    tableIndex: number
  ) => {
    setCellActive(false);
    if (!(cellIndex === 0 && rowIndex === 0) && tableArray[tableIndex]) {
      const tableStructureLength = tableArray[tableIndex].cells.map(
        (cell) => cell.field
      ).length;
      const tableDataArray = tableArray[tableIndex].data?.reduce(
        (accumulator: FieldData[], element) => {
          return [...accumulator, ...element.row];
        },
        []
      );
      const tableDataValues = tableDataArray
        ? tableDataArray.map((item) => item.value)
        : [];
      const positionInArray = tableStructureLength * rowIndex + cellIndex;

      const newValuesArray =
        tableDataValues.length > 0
          ? tableDataValues.map((value, index) =>
              index + 1 < positionInArray
                ? value
                : index + 1 === positionInArray
                ? `${value} ${tableDataValues[index + 1]}`
                : index === positionInArray
                ? ""
                : value
            )
          : [];

      if (tableDataArray) {
        const newTableDataArray: FieldData[] = tableDataArray.map(
          (item, index) => ({
            ...item,
            value: newValuesArray[index],
            hovered: false,
            active: false,
          })
        );
        const noOfRows = newTableDataArray
          ? Math.ceil(newTableDataArray?.length / tableStructureLength)
          : 0;

        const newRowsArray: RowI[] = Array(noOfRows)
          .fill(null)
          .map((row, index) => ({
            row: newTableDataArray.slice(
              index * tableStructureLength,
              (index + 1) * tableStructureLength
            ),
          }));

        setTableArray((prevState) =>
          prevState.map((table, tIndex) =>
            tableIndex === tIndex
              ? {
                  ...table,
                  data: [...newRowsArray],
                }
              : table
          )
        );
      }
    }
  };

  const handleMoveRight = (
    cellIndex: number,
    rowIndex: number,
    tableIndex: number
  ) => {
    setCellActive(false);
    if (tableArray[tableIndex]) {
      const tableStructureLength = tableArray[tableIndex].cells.map(
        (cell) => cell.field
      ).length;
      let tableDataArray = tableArray[tableIndex].data?.reduce(
        (accumulator: FieldData[], element) => {
          return [...accumulator, ...element.row];
        },
        []
      );
      const tableDataValues = tableDataArray
        ? tableDataArray.map((item) => item.value)
        : [];
      const positionInArray =
        tableDataValues.length - (tableStructureLength * rowIndex + cellIndex);

      const newValuesArray =
        tableDataValues.length > 0
          ? tableDataValues
              .reverse()
              .map((value, index) =>
                index + 1 === positionInArray - 1
                  ? `${tableDataValues[index + 1]} ${value}`
                  : index === positionInArray - 1
                  ? ""
                  : value
              )
              .reverse()
          : [];

      if (tableDataArray) {
        const newTableDataArray: FieldData[] = tableDataArray.map(
          (item, index) => ({
            ...item,
            value: newValuesArray[index],
            hovered: false,
            active: false,
          })
        );
        const noOfRows = newTableDataArray
          ? Math.ceil(newTableDataArray?.length / tableStructureLength)
          : 0;

        const newRowsArray: RowI[] = Array(noOfRows)
          .fill(null)
          .map((row, index) => ({
            row: newTableDataArray.slice(
              index * tableStructureLength,
              (index + 1) * tableStructureLength
            ),
          }));

        setTableArray((prevState) =>
          prevState.map((table, tIndex) =>
            tableIndex === tIndex
              ? {
                  ...table,
                  data: [...newRowsArray],
                }
              : table
          )
        );
      }
    }
  };

  const handleShiftAllLeft = (
    cellIndex: number,
    rowIndex: number,
    tableIndex: number
  ) => {
    setCellActive(false);
    if (!(cellIndex === 0 && rowIndex === 0) && tableArray[tableIndex]) {
      const tableStructureLength = tableArray[tableIndex].cells.map(
        (cell) => cell.field
      ).length;
      const tableDataArray = tableArray[tableIndex].data?.reduce(
        (accumulator: FieldData[], element) => {
          return [...accumulator, ...element.row];
        },
        []
      );
      const tableDataValues = tableDataArray
        ? tableDataArray.map((item) => item.value)
        : [];
      const positionInArray = tableStructureLength * rowIndex + cellIndex;

      const newValuesArray =
        tableDataValues.length > 0
          ? tableDataValues.map((value, index) =>
              index + 1 <= positionInArray - 1
                ? value
                : index + 1 === positionInArray
                ? `${value} ${tableDataValues[index + 1]}`
                : index + 1 === tableDataValues.length
                ? ""
                : tableDataValues[index + 1]
            )
          : [];

      if (tableDataArray) {
        const newTableDataArray: FieldData[] = tableDataArray.map(
          (item, index) => ({
            ...item,
            value: newValuesArray[index],
            hovered: false,
            active: false,
          })
        );
        const noOfRows = newTableDataArray
          ? Math.ceil(newTableDataArray?.length / tableStructureLength)
          : 0;

        const newRowsArray: RowI[] = Array(noOfRows)
          .fill(null)
          .map((row, index) => ({
            row: newTableDataArray.slice(
              index * tableStructureLength,
              (index + 1) * tableStructureLength
            ),
          }));

        setTableArray((prevState) =>
          prevState.map((table, tIndex) =>
            tableIndex === tIndex
              ? {
                  ...table,
                  data: [...newRowsArray],
                }
              : table
          )
        );
      }
    }
  };

  const handleShiftAllRight = (
    cellIndex: number,
    rowIndex: number,
    tableIndex: number
  ) => {
    setCellActive(false);
    if (tableArray[tableIndex]) {
      const tableStructureLength = tableArray[tableIndex].cells.map(
        (cell) => cell.field
      ).length;
      let tableDataArray = tableArray[tableIndex].data?.reduce(
        (accumulator: FieldData[], element) => {
          return [...accumulator, ...element.row];
        },
        []
      );
      if (
        tableDataArray &&
        tableDataArray[tableDataArray?.length - 1].value !== ""
      ) {
        tableDataArray = [
          ...tableDataArray,
          ...tableArray[tableIndex].cells.map((cell) => ({
            field: cell.field || "",
            value: "",
            valid: 0,
            hovered: false,
            active: false,
          })),
        ];
      }
      const tableDataValues = tableDataArray
        ? tableDataArray.map((item) => item.value)
        : [];
      const positionInArray =
        tableDataValues.length - (tableStructureLength * rowIndex + cellIndex);

      const newValuesArray =
        tableDataValues.length > 0
          ? tableDataValues
              .reverse()
              .map((value, index) =>
                index < positionInArray - 1
                  ? `${tableDataValues[index + 1]}`
                  : index === positionInArray - 1
                  ? ""
                  : value
              )
              .reverse()
          : [];

      if (tableDataArray) {
        const newTableDataArray: FieldData[] = tableDataArray.map(
          (item, index) => ({
            ...item,
            value: newValuesArray[index],
            hovered: false,
            active: false,
          })
        );
        const noOfRows = newTableDataArray
          ? Math.ceil(newTableDataArray?.length / tableStructureLength)
          : 0;

        const newRowsArray: RowI[] = Array(noOfRows)
          .fill(null)
          .map((row, index) => ({
            row: newTableDataArray.slice(
              index * tableStructureLength,
              (index + 1) * tableStructureLength
            ),
          }));

        setTableArray((prevState) =>
          prevState.map((table, tIndex) =>
            tableIndex === tIndex
              ? {
                  ...table,
                  data: [...newRowsArray],
                }
              : { ...table }
          )
        );
      }
    }
  };

  const handleValueCanged = (
    cellIndex: number,
    rowIndex: number,
    tableIndex: number,
    value: string
  ) => {
    tableArraySetValueToCell(cellIndex, rowIndex, tableIndex, "value", value);
  };

  const handleElementSelected = () => {};

  useEffect(() => {
    if (loadedData.length > 0) {
      const array = interestsOrder.map((table) => ({
        name: table.name,
        data: loadedData.find((data) => data.table === table.corespondent)
          ?.data,
        cells: table.cells,
        grid: table.grid,
      }));
      setTableArray(array);
    }
  }, [loadedData]);

  useEffect(() => {
    const newRowData = (array: FieldsI[]) =>
      array.map((item: FieldsI) => ({ row: newCellData(item) }));

    const newCellData = (obj: FieldsI) => {
      const variable = Object.keys(obj).map((key) => ({
        field: key,
        value: obj[key],
        valid: 0,
        hovered: false,
        active: false,
      }));
      return variable;
    };

    const structuredData = (obj: DataI) =>
      Object.keys(obj).map((key) => ({
        table: key,
        data: newRowData(obj[key]),
      }));
    setLoadedData(structuredData(data));
  }, [data]);

  useEffect(() => {
    console.log(tableArray);
  }, [tableArray]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr",
        height: "100%",
      }}
    >
      <Paper elevation={2} sx={{ m: "16px", mr: "8px", overflowY: "auto" }}>
        {tableArray.map((table, tIndex) => (
          <Box key={`table-${tIndex}`}>
            <Typography sx={{ px: "16px" }}>{table.name}</Typography>
            <TableContainer
              sx={{
                display: "flex",
                flexDirection: "column",
                pb: "36px",
              }}
            >
              <Table
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CustomTableHeader
                  columnsGrid={table.grid}
                  headerCells={table.cells}
                ></CustomTableHeader>
                <TableBody sx={{ flex: "1", overflow: "auto", p: "24px" }}>
                  {table.data?.map((rowData, index) => (
                    <CustomRowOfInterests
                      index={index}
                      noOfColumns={rowData.row.length}
                      noOfRows={table.data?.length}
                      key={`row-${index}`}
                      columnsGrid={table.grid}
                      values={rowData.row}
                      cellActive={cellActive}
                      tableTouched={tableTouched}
                      onElementSelected={handleElementSelected}
                      onTouched={() => setTableTouched(!tableTouched)}
                      onHoveredState={(
                        index: number,
                        rIndex: number,
                        state: boolean
                      ) => handleHoveredCell(index, rIndex, tIndex, state)}
                      onValueChanged={(
                        index: number,
                        rIndex: number,
                        value: string
                      ) => handleValueCanged(index, rIndex, tIndex, value)}
                      onCellActive={(
                        index: number,
                        rIndex: number,
                        state: boolean
                      ) => handleCellActive(index, rIndex, tIndex, state)}
                      onShiftAllLeft={(index: number, rIndex: number) =>
                        handleShiftAllLeft(index, rIndex, tIndex)
                      }
                      onShiftAllRight={(index: number, rIndex: number) =>
                        handleShiftAllRight(index, rIndex, tIndex)
                      }
                      onMoveLeft={(index: number, rIndex: number) =>
                        handleMoveLeft(index, rIndex, tIndex)
                      }
                      onMoveRight={(index: number, rIndex: number) =>
                        handleMoveRight(index, rIndex, tIndex)
                      }
                      onMoveUp={(index: number, rIndex: number) =>
                        handleMoveUp(index, rIndex, tIndex)
                      }
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Paper>
      <Paper elevation={2} sx={{ m: "16px", ml: "8px", overflow: "auto" }}>
        <Document
          file="https://dev.dorneean.ro/external-images/decl.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          options={{
            cMapUrl: "cmaps/",
            cMapPacked: true,
          }}
        >
          <Page pageNumber={1} scale={1.2} />
          <Page pageNumber={2} scale={1.2} />
        </Document>
      </Paper>
    </Box>
  );
};

export default ReviewPdf;
