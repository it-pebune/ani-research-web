import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from "@mui/material";
import CustomTableHeader from "../Shared/CustomTableHeader";
import CustomTableRow from "../Shared/CustomTableRow";
import React, { useEffect, useState } from "react";
import { documentService } from "../../services/documentsServices";
import useTokenStatus from "../../utils/useTokenStatus";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";
import { scrappedDocumentsTableHeaderData } from "../../resources/tableHeaders/documentsTableHeaderData";
import { scrappedDocumentsTableRowDefs } from "../../resources/tableRowDefs/documentsTableRowDefs";
import { DocumentsFromScrapperResult } from "../../interfaces/DocumentInterfaces";
import SearchBarWithFiltersController from "../Shared/SearchBarWithFiltersController";
import { Box } from "@mui/system";

interface Props {
  subject?: SubjectFromDataBase;
  open: boolean;
  onClose: any;
  onAction: any;
}

const DocumenstFromScrapperDialog: React.FC<Props> = ({
  subject,
  open,
  onClose,
  onAction,
}) => {
  const tokenStatus = useTokenStatus();
  const columnsGrid = "60px 1fr 1fr 1fr 1fr 1fr 1fr 70px";
  const [documents, setDocuments] = useState<DocumentsFromScrapperResult[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [filteredDocuments, setFilteredDocuments] = useState<
    DocumentsFromScrapperResult[]
  >([]);
  const handleScrappedSort = () => {};
  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = () => {};

  const handleFiltersOpen = () => {};

  const handleScrappedDocumentAction = () => {};

  useEffect(() => {
    if (tokenStatus.active && subject) {
      const documentsResponse = async () => {
        const response = await documentService.getDocumentsFromScrapper({
          token: tokenStatus.token,
          active: tokenStatus.active,
          firstName: subject.firstName,
          lastName: subject.lastName,
        });
        console.log(response.results);
        setDocuments(response.results);
        setFilteredDocuments(response.results);
      };
      documentsResponse();
    }
  }, [subject]);

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "80%",
          maxWidth: "80%",
          height: "90%",
        },
      }}
      onClose={onClose}
      open={open}
    >
      <DialogTitle
        sx={{
          color: "#6B636B",
          fontSize: "17px",
          borderBottom: "1px solid #bdbdbd",
        }}
      >
        <Icon sx={{ fontSize: "16px", marginRight: "16px" }}>add</Icon>
        Descarca document din lista
        <IconButton
          sx={{ position: "absolute", right: "8px", top: "8px" }}
          onClick={onClose}
        >
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ p: "16px 0" }}>
          <SearchBarWithFiltersController
            onSearchChanged={handleSearch}
            onFiltersOpen={handleFiltersOpen}
          ></SearchBarWithFiltersController>
        </Box>

        <TableContainer
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            alignContent: "flex-start",
          }}
        >
          <Table
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CustomTableHeader
              columnsGrid={columnsGrid}
              headerCells={scrappedDocumentsTableHeaderData}
              onSorted={handleScrappedSort}
            ></CustomTableHeader>
            <TableBody style={{ flex: "1", overflow: "auto" }}>
              {filteredDocuments.length > 0 &&
                filteredDocuments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subject, index) => ({
                    ...subject,
                    index: index + 1,
                    chamberName: subject.chamber === 1 ? "Senator" : "Deputat",
                  }))
                  .map((document, index) => (
                    <CustomTableRow
                      onAction={handleScrappedDocumentAction}
                      columnsGrid={columnsGrid}
                      rowDefs={scrappedDocumentsTableRowDefs}
                      key={`table-row-${index}`}
                      data={document}
                    ></CustomTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ height: "60px", borderTop: "1px solid #bdbdbd" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDocuments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Randuri pe pagina"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "16px", borderTop: "1px solid #bdbdbd" }}>
        <Button onClick={() => onAction()}>Inapoi la lista principala</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumenstFromScrapperDialog;
