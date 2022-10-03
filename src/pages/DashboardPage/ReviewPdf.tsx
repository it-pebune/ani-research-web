import {
  Box,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useParams } from "react-router-dom";
import CustomRowOfInterests from "../../components/Shared/CustomRowOfInterests";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import { DocumentFromDataBase } from "../../interfaces/DocumentInterfaces";
import { FieldData } from "../../interfaces/ReviewPdf";
import { HeaderCell } from "../../interfaces/TableHeaderInterface";
import { assetsOrder } from "../../resources/declarations/assetsOrder";
import { interestsOrder } from "../../resources/declarations/interestsOrder";
import { documentService } from "../../services/documentsServices";
import useTokenStatus from "../../utils/useTokenStatus";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {}

interface OCRTableCell {
  bounding_box: {
    x: number;
    y: number;
  };
  text: string;
  consfidence: number;
  page_number: number;
}

interface AsociatI {
  [key: string]: any;
  company: OCRTableCell;
  number_of_shares: OCRTableCell;
  position: OCRTableCell;
  total_value: OCRTableCell;
}

interface CompanyI {
  [key: string]: any;
  company: OCRTableCell;
  position: OCRTableCell;
  value_of_shares: OCRTableCell;
}

interface AsociationsI {
  [key: string]: any;
  name: OCRTableCell;
}

interface PartyI {
  [key: string]: any;
  name: OCRTableCell;
}

interface ContractsI {
  [key: string]: any;
  owner: OCRTableCell;
  institution: OCRTableCell;
  duration: OCRTableCell;
  date_of_contract: OCRTableCell;
  contract_type: OCRTableCell;
  procedure: OCRTableCell;
  value: OCRTableCell;
}

interface ArtI {
  [key: string]: any;
  estimated_value: OCRTableCell;
  short_description: OCRTableCell;
  year_of_aquisition: OCRTableCell;
}

interface BuildingI {
  address: OCRTableCell;
  category: OCRTableCell;
  owner: OCRTableCell;
  quota: OCRTableCell;
  surface: OCRTableCell;
  type_of_aquisition: OCRTableCell;
  year_of_purchase: OCRTableCell;
}

interface FinanceI {
  adm_institution: OCRTableCell;
  currency: OCRTableCell;
  current_value: OCRTableCell;
  type_of_investment: OCRTableCell;
  year_of_opening: OCRTableCell;
}

interface GiftI {
  owner: OCRTableCell;
  service: OCRTableCell;
  source: OCRTableCell;
  year_income: OCRTableCell;
}

interface IncomeI {
  owner: OCRTableCell;
  service: OCRTableCell;
  source: OCRTableCell;
  year_income: OCRTableCell;
}

interface MobileI {
  type_of_product: OCRTableCell;
  date_of_sale: OCRTableCell;
  buyer: OCRTableCell;
  type_of_sale: OCRTableCell;
  value: OCRTableCell;
}

interface InvestmentI {
  current_value: OCRTableCell;
  issuer: OCRTableCell;
  number_of_shares: OCRTableCell;
  type_of_investment: OCRTableCell;
}

interface ParcelsI {
  adress: OCRTableCell;
  category: OCRTableCell;
  owner: OCRTableCell;
  quota: OCRTableCell;
  surface: OCRTableCell;
  type_of_aquisition: OCRTableCell;
  year_of_purchase: OCRTableCell;
}

interface TransportI {
  model: OCRTableCell;
  number_of_pieces: OCRTableCell;
  type_of_aquisition: OCRTableCell;
  type_of_transport: OCRTableCell;
  year_of_production: OCRTableCell;
}

interface DebtI {
  lender: OCRTableCell;
  year_of_loan: OCRTableCell;
  due_year: OCRTableCell;
  value: OCRTableCell;
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
  number_of_shares: string;
  position: string;
  value_of_shares: string;
  estimated_value: string;
  short_description: string;
  year_of_aquisition: string;
  address: string;
  category: string;
  quota: string;
  surface: string;
  type_of_aquisition: string;
  year_of_purchase: string;
  adm_institution: string;
  currency: string;
  current_value: string;
  type_of_investment: string;
  year_of_opening: string;
  person_type: string;
  service: string;
  source: string;
  year_income: string;
  income_type: string;
  issuer: string;
  adress: string;
  model: string;
  number_of_pieces: string;
  type_of_transport: string;
  year_of_production: string;
  type_of_product: string;
  date_of_sale: string;
  buyer: string;
  type_of_sale: string;
  lender: string;
  year_of_loan: string;
  due_year: string;
}

interface DataI {
  [key: string]: any;
  company_shares?: AsociatI[];
  man_companies?: CompanyI[];
  asociations?: AsociationsI[];
  party?: PartyI[];
  contracts?: ContractsI[];
  art?: ArtI[];
  buildings?: BuildingI[];
  finance?: FinanceI[];
  gift?: GiftI[];
  income?: IncomeI[];
  investment?: InvestmentI[];
  parcels?: ParcelsI[];
  transport?: TransportI[];
  mobile?: MobileI[];
  debt?: DebtI[];
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
  const [data, setData] = useState<DataI>({
    company_shares: [],
    man_companies: [],
    asociations: [],
    party: [],
    contracts: [],
    art: [],
  });
  const [pdfNumPages, setPdfNumPages] = useState<number>();
  const [tableArray, setTableArray] = useState<TableData[]>([]);
  const [loadedData, setLoadedData] = useState<FormatedTableI[]>([]);
  const [tableTouched, setTableTouched] = useState(false);
  const [cellActive, setCellActive] = useState(false);
  const [docDetails, setDocDetails] = useState<DocumentFromDataBase>();
  const [document, setDocument] = useState<string>();
  const tokenStatus = useTokenStatus();
  const params = useParams();

  const onDocumentLoadSuccess = (response: any) => {
    setPdfNumPages(response.numPages);
  };

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
            value:
              newValuesArray[index] !== "undefined"
                ? newValuesArray[index]
                : "",
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
        ? tableDataArray.map((item) => (item.value ? item.value : ""))
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
            value: newValuesArray[index] ? newValuesArray[index] : "",
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
            value:
              newValuesArray[index] !== "undefined"
                ? newValuesArray[index]
                : "",
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
            value:
              newValuesArray[index] !== "undefined"
                ? newValuesArray[index]
                : "",
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

  const handleSave = async () => {
    await documentService.updateDocumentData({
      docId: params.id,
      active: tokenStatus.active,
      token: tokenStatus.token,
      data: JSON.stringify(tableArray),
    });
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
    if (loadedData.length > 0 && docDetails?.type === 2) {
      const array = interestsOrder.map((table) => ({
        name: table.name,
        data: loadedData.find((data) => data.table === table.corespondent)
          ?.data,
        cells: table.cells,
        grid: table.grid,
      }));
      setTableArray(array);
    } else if (loadedData.length > 0 && docDetails?.type === 1) {
      const array = assetsOrder.map((table) => ({
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
        value: obj[key].text,
        valid: 0,
        hovered: false,
        active: false,
      }));
      return variable;
    };

    const structuredData = (obj: DataI) => {
      return Object.keys(obj).map((key) => {
        if (Array.isArray(obj[key])) {
          return {
            table: key,
            data: newRowData(obj[key]),
          };
        }
      });
    };
    const myData = structuredData(data);
    setLoadedData(myData.filter((data) => data) as FormatedTableI[]);
  }, [data]);

  useEffect(() => {
    // console.log(tableArray);
  }, [tableArray]);

  useEffect(() => {
    const docResponse = async () => {
      const response = await documentService.getOriginalDocument({
        docId: params.id,
        active: tokenStatus.active,
        token: tokenStatus.token,
      });
      setDocument(response.url);

      const docDetails = await documentService.getDocumentDetails({
        docId: params.id,
        active: tokenStatus.active,
        token: tokenStatus.token,
      });
      setDocDetails(docDetails);

      const processedDoc = await documentService.getProcessedData({
        docId: params.id,
        active: tokenStatus.active,
        token: tokenStatus.token,
      });
      if (!processedDoc.data) {
        const docRaw = await documentService.getDocumentRawData({
          docId: params.id,
          active: tokenStatus.active,
          token: tokenStatus.token,
        });
        setData(JSON.parse(docRaw.dataRaw));
      } else {
        setTableArray(JSON.parse(processedDoc.data));
      }
    };
    docResponse();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr",
        height: "100%",
      }}
    >
      <Paper
        elevation={2}
        sx={{ m: "16px", mr: "8px", overflowY: "auto", position: "relative" }}
      >
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
        {document && (
          <Document
            file={document}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{
              cMapUrl: "cmaps/",
              cMapPacked: true,
            }}
          >
            {pdfNumPages &&
              pdfNumPages > 0 &&
              [...Array(pdfNumPages)].map((pageNo, index) => (
                <Page key={index} pageNumber={index + 1} scale={1.2} />
              ))}
          </Document>
        )}
      </Paper>
      <IconButton
        color="primary"
        sx={{
          position: "absolute",
          top: "24px",
          left: "170px",
        }}
      >
        <Icon>arrow_back_ios</Icon>
      </IconButton>
      <IconButton
        onClick={handleSave}
        color="success"
        sx={{
          position: "absolute",
          top: "24px",
          left: "220px",
        }}
      >
        <Icon>save</Icon>
      </IconButton>
    </Box>
  );
};

export default ReviewPdf;
