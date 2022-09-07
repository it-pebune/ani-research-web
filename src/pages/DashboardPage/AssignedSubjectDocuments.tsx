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
  DocumentTypes,
} from "../../interfaces/DocumentInterfaces";
import { documentService } from "../../services/documentsServices";
import Loader from "../../components/Shared/Loader";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import moment from "moment";
import CustomTableRow from "../../components/Shared/CustomTableRow";
import { assignedSubjectDocumentsTableHeaderData } from "../../resources/tableHeaders/documentsTableHeaderData";
import { assignedSubjectDocumentsTableRowDefs } from "../../resources/tableRowDefs/documentsTableRowDefs";

export const AssignedSubjectDocuments: React.FC = (): ReactElement => {
  const tokenStatus = useTokenStatus(),
    subjectId = useParams().subjectId as unknown as number,
    [loading, setLoading] = useState<boolean>(false),
    [documents, setDocuments] = useState<DocumentFromDataBase[]>([]),
    [visibleDocuments, setVisibleDocuments] = useState<DocumentFromDataBase[]>(
      []
    ),
    columnsGrid = "60px 1fr 1fr 1fr 1fr 1fr 1fr 70px",
    [page, setPage] = useState<number>(0),
    [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleSearch = () => {},
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
      dateEnd: document.dateEnd ? moment(document.dateEnd).format("YYYY") : "",
      type:
        DocumentTypes.WEALTH_DECLARATION === document.type
          ? "Declaratie de avere"
          : "Declaratie de interese",
    };
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
