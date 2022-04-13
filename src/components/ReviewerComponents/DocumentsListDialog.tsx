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
  Autocomplete,
  TextField,
} from "@mui/material";
import CustomTableHeader from "../Shared/CustomTableHeader";
import CustomTableRow from "../Shared/CustomTableRow";
import React, { ChangeEvent, useEffect, useState } from "react";
import { documentService } from "../../services/documentsServices";
import useTokenStatus from "../../utils/useTokenStatus";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";
import { documentsFromDataBaseTableHeader } from "../../resources/tableHeaders/documentsTableHeaderData";
import {
  documentsFromDataBaseTableRowDefs,
  scrappedDocumentsTableRowDefs,
} from "../../resources/tableRowDefs/documentsTableRowDefs";
import { DocumentFromDataBase } from "../../interfaces/DocumentInterfaces";
import SearchBarWithFiltersController from "../Shared/SearchBarWithFiltersController";
import { Box } from "@mui/system";
import PdfPreviewComponent from "../Shared/PdfPreviewComponent";
import { jobService } from "../../services/jobsService";
import { Job, JobResponse } from "../../interfaces/JobInterfaces";
import { jobsTableHeaderData } from "../../resources/tableHeaders/jobsTableHeaderData";
import { jobsTableRowDefs } from "../../resources/tableRowDefs/jobsTableRowDefs";
import moment from "moment";
import { useNavigate } from "react-router";

interface Props {
  subject?: SubjectFromDataBase;
  open: boolean;
  onClose: any;
  onAction: any;
}

const DocumentsListDialog: React.FC<Props> = ({
  subject,
  open,
  onClose,
  onAction,
}) => {
  const tokenStatus = useTokenStatus();
  const columnsGrid = "60px 1fr 1fr 1fr 1fr 1fr 1fr 70px";
  const jobsColumnsGrid = "60px 1fr 1fr 1fr 1fr 70px";
  const [documents, setDocuments] = useState<DocumentFromDataBase[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [jobsListOpened, setJobsListOpened] = useState(false);
  const [previewOpened, setPreviewOpened] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uid, setUid] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [subjectJobs, setSubjectJobs] = useState<Job[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [docType, setDocType] = useState<number>();
  const [docDate, setDocDate] = useState<string>();
  const [filteredDocuments, setFilteredDocuments] = useState<
    DocumentFromDataBase[]
  >([]);
  const handleScrappedSort = () => {};
  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = () => {};

  const handleJobsSearch = () => {};

  const handleFiltersOpen = () => {};

  const handleJobsFiltersOpen = () => {};

  const handleDocumentAction = (action: string, data: any) => {
    console.log(action, data);
    if (action === "review-document") {
      navigate(`/review-pdf/${data[0].id}`);
    } else if (action === "delete-document") {
      setDocuments((prevData) =>
        prevData.filter((item) => item.id !== data[0].id)
      );
      setFilteredDocuments((prevData) =>
        prevData.filter((item) => item.id !== data[0].id)
      );
    }
  };

  const onPreviewClose = () => {
    setPreviewOpened(false);
  };

  const handleCloseJobsList = () => {
    setJobsListOpened(false);
  };

  const handlePdfSubmit = async (action: string, data: any) => {
    console.log(data);
    console.log(docDate);
    const response = await documentService.addNewDocument({
      token: tokenStatus.token as string,
      active: tokenStatus.active,
      subjectId: subject?.id,
      status: 0,
      jobId: data[0].id,
      type: docType,
      name: "",
      downloadUrl: dataUrl,
      date: docDate,
    });

    console.log(response);
  };

  const handleInstitution = async (e: object, value: string | null) => {};

  useEffect(() => {
    console.log(open);
    if (tokenStatus.active && subject && open) {
      const documentsResponse = async () => {
        const response = await documentService.getDocumentsFromDataBase({
          token: tokenStatus.token,
          active: tokenStatus.active,
          subjectId: subject?.id,
        });
        console.log(response);
        setDocuments(response);
        setFilteredDocuments(response);
      };

      documentsResponse();
    }
  }, [open]);

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
              headerCells={documentsFromDataBaseTableHeader}
              onSorted={handleScrappedSort}
            ></CustomTableHeader>
            <TableBody style={{ flex: "1", overflow: "auto" }}>
              {filteredDocuments.length > 0 &&
                filteredDocuments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((document, index) => ({
                    ...document,
                    index: index + 1,
                    dateEnd: document.dateEnd
                      ? moment(document.dateEnd).format("YYYY")
                      : "",
                    dateStart: document.dateStart
                      ? moment(document.dateStart).format("YYYY")
                      : "",
                    type:
                      document.type === 1
                        ? "Declaratie avere"
                        : "Declaratie interese",
                    date: moment(document.date).format("DD MMMM YYYY"),
                  }))
                  .map((document, index) => (
                    <CustomTableRow
                      onAction={handleDocumentAction}
                      columnsGrid={columnsGrid}
                      rowDefs={documentsFromDataBaseTableRowDefs}
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
        <Button variant="contained" onClick={() => onClose()}>
          Inapoi la lista principala
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentsListDialog;
