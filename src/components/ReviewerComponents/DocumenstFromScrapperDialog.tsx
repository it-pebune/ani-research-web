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
import { scrappedDocumentsTableHeaderData } from "../../resources/tableHeaders/documentsTableHeaderData";
import { scrappedDocumentsTableRowDefs } from "../../resources/tableRowDefs/documentsTableRowDefs";
import { DocumentsFromScrapperResult } from "../../interfaces/DocumentInterfaces";
import SearchBarWithFiltersController from "../Shared/SearchBarWithFiltersController";
import { Box } from "@mui/system";
import PdfPreviewComponent from "../Shared/PdfPreviewComponent";
import { jobService } from "../../services/jobsService";
import { Job, JobResponse } from "../../interfaces/JobInterfaces";
import { jobsTableHeaderData } from "../../resources/tableHeaders/jobsTableHeaderData";
import { jobsTableRowDefs } from "../../resources/tableRowDefs/jobsTableRowDefs";
import moment from "moment";

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
  const jobsColumnsGrid = "60px 1fr 1fr 1fr 1fr 70px";
  const [documents, setDocuments] = useState<DocumentsFromScrapperResult[]>([]);
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

  const handleJobsSearch = () => {};

  const handleFiltersOpen = () => {};

  const handleJobsFiltersOpen = () => {};

  const handleScrappedDocumentAction = (action: string, data: any) => {
    console.log(action, data[3].date);
    if (action === "download-document") {
      setFileName(data[0].filename);
      setUid(data[1].uid);
      setDocType(data[2].type === "I" ? 2 : data[2].type === "A" ? 1 : 2);
      setDocDate(moment(data[3].date, "DD.MM.YYYY").format("YYYY-MM-DD"));
      setJobsListOpened(true);
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
    console.log(dataUrl);
    console.log(subject);
    const response = await documentService.addNewDocument({
      token: tokenStatus.token as string,
      active: tokenStatus.active,
      subjectId: subject?.id,
      status: 0,
      jobId: data[0].id,
      type: docType,
      name: fileName,
      downloadUrl: dataUrl.replace(":filename", fileName).replace(":uid", uid),
      date: docDate,
    });

    console.log(response);
  };

  const handleInstitution = async (e: object, value: string | null) => {};

  useEffect(() => {
    if (tokenStatus.active && subject && open) {
      const documentsResponse = async () => {
        const response = await documentService.getDocumentsFromScrapper({
          token: tokenStatus.token,
          active: tokenStatus.active,
          firstName: subject.firstName,
          lastName: subject.lastName,
        });
        setDataUrl(response.downloadUrl);
        setDocuments(response.results);
        setFilteredDocuments(response.results);
      };
      const subjectJobsResponse = async () => {
        const response = await jobService.getSubjectsJobs({
          token: tokenStatus.token,
          active: tokenStatus.active,
          subjectId: subject.id,
        });
        setSubjectJobs(response);
      };
      documentsResponse();
      subjectJobsResponse();
    }
  }, [subject, open]);

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

      <Dialog
        PaperProps={{
          sx: {
            width: "70%",
            maxWidth: "70%",
            height: "70%",
          },
        }}
        onClose={() => setJobsListOpened(false)}
        open={jobsListOpened}
      >
        <DialogTitle
          sx={{
            color: "#6B636B",
            fontSize: "17px",
            borderBottom: "1px solid #bdbdbd",
          }}
        >
          <Icon sx={{ fontSize: "16px", marginRight: "16px" }}>add</Icon>
          Functia corespondenta documentului
          <IconButton
            sx={{ position: "absolute", right: "8px", top: "8px" }}
            onClick={onClose}
          >
            <Icon>close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              p: "16px 0",
              display: "grid",
              gridTemplateColumns: "1fr 50px",
            }}
          >
            <SearchBarWithFiltersController
              onSearchChanged={handleJobsSearch}
              onFiltersOpen={handleJobsFiltersOpen}
            ></SearchBarWithFiltersController>
            <IconButton>
              <Icon color="primary">add</Icon>
            </IconButton>
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
                columnsGrid={jobsColumnsGrid}
                headerCells={jobsTableHeaderData}
                onSorted={handleScrappedSort}
              ></CustomTableHeader>
              <TableBody style={{ flex: "1", overflow: "auto" }}>
                {subjectJobs.length > 0 &&
                  subjectJobs
                    .map((job, index) => ({
                      ...job,
                      index: index + 1,
                      dateStart: moment(job.dateStart).format("YYYY"),
                    }))
                    .map((job, index) => (
                      <CustomTableRow
                        onAction={handlePdfSubmit}
                        columnsGrid={jobsColumnsGrid}
                        rowDefs={jobsTableRowDefs}
                        key={`table-row-${index}`}
                        data={job}
                      ></CustomTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ padding: "16px", borderTop: "1px solid #bdbdbd" }}>
          <Button onClick={handleCloseJobsList}>Inchide fereastra</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          sx: {
            width: "80%",
            maxWidth: "80%",
            height: "90%",
          },
        }}
        onClose={onPreviewClose}
        open={previewOpened}
      >
        <DialogTitle
          sx={{
            color: "#6B636B",
            fontSize: "17px",
            borderBottom: "1px solid #bdbdbd",
          }}
        >
          <Icon sx={{ fontSize: "16px", marginRight: "16px" }}>add</Icon>
          Institutia corespondenta documentului
          <IconButton
            sx={{ position: "absolute", right: "8px", top: "8px" }}
            onClick={onClose}
          >
            <Icon>close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "grid",
              p: "14px",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}
          >
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 50px" }}>
              <Autocomplete
                options={institutions}
                value={selectedInstitution}
                getOptionLabel={(option) => option}
                onChange={(e: object, value: any | null) =>
                  handleInstitution(e, value)
                }
                renderOption={(props: any, option: any) => (
                  <Box component="li" {...props}>
                    {option}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Alege institutia"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              ></Autocomplete>
              <IconButton color="primary">
                <Icon>add</Icon>
              </IconButton>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 50px" }}>
              <Autocomplete
                options={institutions}
                value={selectedInstitution}
                getOptionLabel={(option) => option}
                onChange={(e: object, value: any | null) =>
                  handleInstitution(e, value)
                }
                renderOption={(props: any, option: any) => (
                  <Box component="li" {...props}>
                    {option}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Alege functia"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              ></Autocomplete>
              <IconButton color="primary">
                <Icon>add</Icon>
              </IconButton>
            </Box>
            <Autocomplete
              options={institutions}
              value={selectedInstitution}
              getOptionLabel={(option) => option}
              onChange={(e: object, value: any | null) =>
                handleInstitution(e, value)
              }
              renderOption={(props: any, option: any) => (
                <Box component="li" {...props}>
                  {option}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Alege judetul"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            ></Autocomplete>
            <Autocomplete
              options={institutions}
              value={selectedInstitution}
              getOptionLabel={(option) => option}
              onChange={(e: object, value: any | null) =>
                handleInstitution(e, value)
              }
              renderOption={(props: any, option: any) => (
                <Box component="li" {...props}>
                  {option}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Alege localitatea"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            ></Autocomplete>
          </Box>
          {fileName !== "" && uid !== "" && (
            <>
              {/* ceva
              <PdfPreviewComponent
                path={`http://declaratii.integritate.eu/DownloadServlet?fileName=10774627_353217_019.pdf&uniqueIdentifier=NTNTARTLNE_10774627`}
              ></PdfPreviewComponent> */}
            </>
          )}
        </DialogContent>
        <DialogActions
          sx={{ padding: "16px", borderTop: "1px solid #bdbdbd" }}
        ></DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default DocumenstFromScrapperDialog;
