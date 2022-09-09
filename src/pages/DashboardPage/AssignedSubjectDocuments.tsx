import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import SearchBarWithFiltersController from "../../components/Shared/SearchBarWithFiltersController";
import { useParams } from "react-router";
import useTokenStatus from "../../utils/useTokenStatus";
import {
  DocumentFromDataBase,
  DocumentTypeLabels,
} from "../../interfaces/DocumentInterfaces";
import { documentService } from "../../services/documentsServices";
import Loader from "../../components/Shared/Loader";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import moment, { Moment } from "moment";
import CustomTableRow from "../../components/Shared/CustomTableRow";
import { assignedSubjectDocumentsTableHeaderData } from "../../resources/tableHeaders/documentsTableHeaderData";
import { assignedSubjectDocumentsTableRowDefs } from "../../resources/tableRowDefs/documentsTableRowDefs";
import { Directions } from "../../interfaces/TableHeaderInterface";

export const AssignedSubjectDocuments: React.FC = (): ReactElement => {
  const tokenStatus = useTokenStatus(),
    subjectId = useParams().subjectId as unknown as number,
    [loading, setLoading] = useState<boolean>(false),
    [documents, setDocuments] = useState<DocumentFromDataBase[]>([]),
    [visibleDocuments, setVisibleDocuments] = useState<DocumentFromDataBase[]>(
      []
    ),
    columnsGrid = "60px 1fr 1fr 1fr 1fr 1fr 1fr 70px",
    [searchKey, setSearchKey] = useState<string | null>(null),
    [sortOptions, setSortOptions] = useState<{
      field: string;
      direction: Directions;
    } | null>(null),
    [page, setPage] = useState<number>(0),
    [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleSearch = (searchKey: string): void => {
      setSearchKey(searchKey);
      filterAndSortDocuments(searchKey, sortOptions);
    },
    handleSort = (
      direction: Directions | undefined,
      field: string | undefined
    ): void => {
      if (direction && field) {
        const sortOptions = { field, direction };

        setSortOptions(sortOptions);
        filterAndSortDocuments(searchKey, sortOptions);
      }
    },
    handleAction = () => {},
    handlePageChange = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      page: number
    ) => setPage(page),
    handleRowsPerPageChange = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };

  const formatRow = (
      document: DocumentFromDataBase,
      index: number
    ): DocumentFromDataBase => {
      return {
        ...document,
        index: index + 1,
        date: moment(document.date).format("DD MMMM YYYY"),
        dateStart: document.dateStart
          ? moment(document.dateStart).format("YYYY")
          : "",
        dateEnd: document.dateEnd
          ? moment(document.dateEnd).format("YYYY")
          : "",
        type: DocumentTypeLabels[document.type],
      };
    },
    compareStartDates = (startDateA: Moment, startDateB: Moment): number => {
      const startYearA = startDateA.year(),
        startYearB = startDateB.year();

      if (startYearA === startYearB) {
        return 0;
      }

      return startYearA < startYearB ? -1 : 1;
    },
    compareDates = (dateA: Moment, dateB: Moment): number => {
      if (dateA.isSame(dateB)) {
        return 0;
      }

      return dateA.isBefore(dateB) ? -1 : 1;
    },
    filterAndSortDocuments = (
      searchKey: string | null,
      sortOptions: { field: string; direction: Directions } | null
    ): void => {
      let visibleDocuments = [...documents];

      if (null !== searchKey) {
        visibleDocuments = visibleDocuments.filter(
          (document: DocumentFromDataBase): boolean =>
            DocumentTypeLabels[document.type]
              .toLocaleLowerCase()
              .includes(searchKey.toLocaleLowerCase())
        );
      }

      if (sortOptions) {
        visibleDocuments.sort(
          (
            documentA: DocumentFromDataBase,
            documentB: DocumentFromDataBase
          ): number => {
            const dateA = moment(documentA[sortOptions.field]),
              dateB = moment(documentB[sortOptions.field]);
            let compareResult;

            if ("dateStart" === sortOptions.field) {
              compareResult = compareStartDates(dateA, dateB);
            } else {
              compareResult = compareDates(dateA, dateB);
            }

            return Directions.ASC === sortOptions.direction
              ? compareResult
              : -1 * compareResult;
          }
        );
      }

      setVisibleDocuments(visibleDocuments);
    };

  useEffect((): void => {
    const loadDocuments = async (): Promise<void> => {
      setLoading(true);

      const loadedDocuments = await documentService.getDocumentsFromDataBase({
        ...tokenStatus,
        subjectId,
      });

      setLoading(false);

      setDocuments(loadedDocuments);
      setVisibleDocuments(loadedDocuments);
    };

    loadDocuments();
  }, [subjectId]);

  return (
    <>
      {loading && <Loader />}

      {!loading && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ p: "16px" }}>
            <SearchBarWithFiltersController onSearchChanged={handleSearch} />
          </Box>

          <TableContainer style={{ display: "flex", flexDirection: "column" }}>
            <Table style={{ display: "flex", flexDirection: "column" }}>
              <CustomTableHeader
                headerCells={assignedSubjectDocumentsTableHeaderData}
                columnsGrid={columnsGrid}
                onSorted={handleSort}
              />

              <TableBody style={{ flex: "1", overflow: "auto" }}>
                {visibleDocuments
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(formatRow)
                  .map(
                    (
                      documentData: DocumentFromDataBase,
                      index: number
                    ): ReactElement => (
                      <CustomTableRow
                        key={`table-row-${index}`}
                        data={documentData}
                        columnsGrid={columnsGrid}
                        rowDefs={assignedSubjectDocumentsTableRowDefs}
                        onAction={handleAction}
                      />
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            count={visibleDocuments.length}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Randuri pe pagina"
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleRowsPerPageChange}
            component="div"
            style={{ height: "60px", borderTop: "1px solid #bdbdbd" }}
          />
        </Box>
      )}
    </>
  );
};
