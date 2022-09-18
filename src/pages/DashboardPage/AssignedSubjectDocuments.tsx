import React, { ReactElement, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import SearchBarWithFiltersController from "../../components/Shared/SearchBarWithFiltersController";
import { useNavigate, useParams } from "react-router";
import useTokenStatus from "../../utils/useTokenStatus";
import { DocumentFromDataBase } from "../../interfaces/DocumentInterfaces";
import { documentService } from "../../services/documentsServices";
import Loader from "../../components/Shared/Loader";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import moment, { Moment } from "moment";
import CustomTableRow from "../../components/Shared/CustomTableRow";
import { assignedSubjectDocumentsTableHeaderData } from "../../resources/tableHeaders/documentsTableHeaderData";
import { assignedSubjectDocumentsTableRowDefs } from "../../resources/tableRowDefs/documentsTableRowDefs";
import { Directions } from "../../interfaces/TableHeaderInterface";
import CustomDialog from "../../components/Shared/CustomDialog";
import {
  DocumentStatuses,
  DocumentTypeLabels,
  ValidDocumentStatuses,
} from "../../enums/DocumentsEnums";

export const AssignedSubjectDocuments: React.FC = (): ReactElement => {
  const navigate = useNavigate(),
    tokenStatus = useTokenStatus(),
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
    [rowsPerPage, setRowsPerPage] = useState<number>(10),
    [documentStatuses, setDocumentStatuses] = useState<{
      [id: string]: DocumentStatuses;
    }>({}),
    [documentToBeDeleted, setDocumentToBeDeleted] =
      useState<DocumentFromDataBase | null>(null),
    [documentDeletedWithSuccess, setDocumentDeletedWithSuccess] =
      useState<boolean>(false),
    [documentDeletedWithFailure, setDocumentDeletedWithFailure] =
      useState<boolean>(false);

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
    disableIf = (action: string, id: any): boolean =>
      "review-document" === action &&
      !ValidDocumentStatuses.includes(documentStatuses[id]),
    handleAction = (action: string, id: any): void => {
      if (typeof id !== "string") {
        return;
      }

      if ("review-document" === action) {
        navigate(`/review-pdf/${id}`);
      } else {
        setDocumentToBeDeleted(
          documents.find(
            (document: DocumentFromDataBase): boolean => document.id === id
          ) as DocumentFromDataBase
        );
      }
    },
    handlePageChange = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      page: number
    ) => setPage(page),
    handleRowsPerPageChange = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    },
    deleteDocument = async (): Promise<void> => {
      try {
        await documentService.deleteDocument(
          tokenStatus,
          documentToBeDeleted?.id as string
        );
      } catch (error: any) {
        setDocumentToBeDeleted(null);
        setDocumentDeletedWithFailure(true);

        return;
      }

      setDocuments(
        (previousDocuments: DocumentFromDataBase[]): DocumentFromDataBase[] =>
          previousDocuments.filter(
            (document: DocumentFromDataBase): boolean =>
              document !== documentToBeDeleted
          )
      );
      setPage(0);
      setDocumentToBeDeleted(null);
      setDocumentDeletedWithSuccess(true);
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
    };

    loadDocuments();
  }, [subjectId]);

  useEffect(
    (): void => filterAndSortDocuments(searchKey, sortOptions),
    [documents]
  );

  useEffect((): any => {
    const getDocumentStatuses = async (): Promise<void> => {
        const documentStatuses = await documentService.getDocumentStatuses(
            tokenStatus,
            subjectId
          ),
          mappedDocumentStatuses: { [id: string]: DocumentStatuses } = {};

        for (const documentStatus of documentStatuses) {
          mappedDocumentStatuses[documentStatus.id] = documentStatus.status;
        }

        setDocumentStatuses(mappedDocumentStatuses);
      },
      interval = setInterval((): Promise<void> => getDocumentStatuses(), 5000);

    return (): void => clearInterval(interval);
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
                        disableIf={disableIf}
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

      <CustomDialog
        title="Sterge document"
        actionText="sterge"
        icon="delete"
        open={!!documentToBeDeleted}
        onClose={(): void => setDocumentToBeDeleted(null)}
        onAction={deleteDocument}
        contentHeight="100px"
      >
        <Typography variant="h6" align="center" color="error">
          Sunteti sigur ca doriti sa stergeti documentul?
        </Typography>
      </CustomDialog>

      <Snackbar
        open={documentDeletedWithSuccess}
        autoHideDuration={5000}
        onClose={(): void => setDocumentDeletedWithSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="info">Documentul a fost sters cu succes.</Alert>
      </Snackbar>

      <Snackbar
        open={documentDeletedWithFailure}
        autoHideDuration={5000}
        onClose={(): void => setDocumentDeletedWithFailure(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">
          Documentul nu a putut fi sters. Va rugam sa incercati din nou.
        </Alert>
      </Snackbar>
    </>
  );
};
