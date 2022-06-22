import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DocumentsFromScrapperResult } from "../../interfaces/DocumentInterfaces";
import { Institution } from "../../interfaces/IntitutionInterfaces";
import { Job } from "../../interfaces/JobInterfaces";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";
import { scrappedDocumentsTableHeaderData } from "../../resources/tableHeaders/documentsTableHeaderData";
import { jobsTableHeaderData } from "../../resources/tableHeaders/jobsTableHeaderData";
import { scrappedDocumentsTableRowDefs } from "../../resources/tableRowDefs/documentsTableRowDefs";
import { jobsTableRowDefs } from "../../resources/tableRowDefs/jobsTableRowDefs";
import { documentService } from "../../services/documentsServices";
import { institutionService } from "../../services/institutionsService";
import { jobService } from "../../services/jobsService";
import useTokenStatus from "../../utils/useTokenStatus";
import CustomTableHeader from "../Shared/CustomTableHeader";
import CustomTableRow from "../Shared/CustomTableRow";
import SearchBarWithFiltersController from "../Shared/SearchBarWithFiltersController";

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
  const [downloadedDocuments, setDownloadedDocuments] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [jobsListOpened, setJobsListOpened] = useState(false);
  const [addJobOpened, setAddJobOpened] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uid, setUid] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [institutions, setInstitutions] = useState<string[]>([]);
  const [institutionsResponse, setInstitutionsResponse] =
    useState<Institution[]>();
  const [subjectJobs, setSubjectJobs] = useState<Job[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<
    number | undefined
  >();
  const [dateStart, setDateStart] = useState<object | null>();
  const [dateEnd, setDateEnd] = useState<object | null>();
  const [sirutaId, setSirutaId] = useState<number | null>();

  const [functionName, setFunctionName] = useState<string>("");
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

  const onCloseHandler = () => {
    setDocuments([]);
    setFilteredDocuments([]);
    onClose();
  };

  const toLoadedDocsListHandler = () => {
    setDocuments([]);
    setFilteredDocuments([]);
    onAction();
  };

  const handleScrappedDocumentAction = (action: string, data: any) => {
    if (action === "download-document") {
      setFileName(data[0].filename);
      setUid(data[1].uid);
      setDocType(data[2].type === "I" ? 2 : data[2].type === "A" ? 1 : 2);
      setDocDate(moment(data[3].date, "DD.MM.YYYY").format("YYYY-MM-DD"));
      setJobsListOpened(true);
    }
  };

  const handleGenerateJob = async () => {
    const newJobReq = {
      subjectId: subject?.id as number,
      institutionId: selectedInstitutionId as number,
      sirutaId: sirutaId as number,
      name: functionName as string,
      dateStart: dateStart ? moment(dateStart).format("YYYY-MM-DD") : undefined,
      dateEnd: dateEnd ? moment(dateEnd).format("YYYY-MM-DD") : undefined,
    };

    if (newJobReq.name && newJobReq.institutionId && newJobReq.dateStart) {
      const response = await jobService.addJob({
        token: tokenStatus.token,
        active: tokenStatus.active,
        ...newJobReq,
      });
      if (response) {
        const jobsResponse = await jobService.getSubjectsJobs({
          token: tokenStatus.token,
          active: tokenStatus.active,
          subjectId: subject?.id as number,
        });
        setSubjectJobs(jobsResponse);
        setAddJobOpened(false);
      }
    }
  };

  const onJobClose = () => {
    setAddJobOpened(false);
  };

  const handleCloseJobsList = () => {
    setJobsListOpened(false);
  };

  const handleDateStart = (date: object | null) => {
    setDateStart(date);
  };

  const handleDateEnd = (date: object | null) => {
    setDateEnd(date);
  };

  const handlePdfSubmit = async (action: string, data: any) => {
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
    handleSetAsExistent(fileName);
    setJobsListOpened(false);
    if (response) {
      // console.log(response);
    }
  };

  const handleInstitution = (e: object, value: string) => {
    setSelectedInstitution(value);
    setSelectedInstitutionId(
      institutionsResponse?.find((institution) => institution.name === value)
        ?.id
    );
    setFunctionName(value === "Camera Deputatilor" ? "DEPUTAT" : "SENATOR");
    setSirutaId(
      institutionsResponse?.find((institution) => institution.name === value)
        ?.sirutaId
    );
  };

  const handleFunctionName = (e: object, value: string) => {
    setFunctionName(value);
  };

  const handleSetAsExistent = (fileName: string) => {
    setFilteredDocuments((prevData) =>
      prevData.map((document) => ({
        ...document,
        existent: document.filename === fileName ? true : document.existent,
      }))
    );
  };

  useEffect(() => {
    if (tokenStatus.active && subject && open) {
      const documentsResponse = async () => {
        const response = await documentService.getDocumentsFromScrapper({
          token: tokenStatus.token,
          active: tokenStatus.active,
          firstName: subject.firstName,
          lastName: subject.lastName,
        });
        const downloadedResponse =
          await documentService.getDocumentsFromDataBase({
            token: tokenStatus.token,
            active: tokenStatus.active,
            subjectId: subject?.id,
          });
        setFilteredDocuments(
          response.results.map((document) => ({
            ...document,
            existent: downloadedResponse
              .map((item) => item.name)
              .includes(document.filename),
          }))
        );
        setDownloadedDocuments(downloadedResponse.map((item) => item.name));
        setDataUrl(response.downloadUrl);
        setDocuments([...response.results]);
      };
      const institutionsResponse = async () => {
        const response = await institutionService.getInstitutions({
          token: tokenStatus.token,
          active: tokenStatus.active,
        });
        setInstitutionsResponse(response);
        setInstitutions(response.map((institution) => institution.name));
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
      institutionsResponse();
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
      onClose={onCloseHandler}
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
          onClick={onCloseHandler}
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
                      highlighted={document.existent}
                      disabled={document.existent}
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
        <Button variant="contained" onClick={toLoadedDocsListHandler}>
          Lista documente incarcate
        </Button>
        <Button variant="contained" onClick={onCloseHandler}>
          Inapoi la lista principala
        </Button>
      </DialogActions>

      <Dialog
        PaperProps={{
          sx: {
            width: "70%",
            maxWidth: "70%",
            height: "70%",
          },
        }}
        onClose={handleCloseJobsList}
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
            onClick={handleCloseJobsList}
          >
            <Icon>close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              p: "16px 0",
              display: "grid",
              gap: "24px",
              gridTemplateColumns: "1fr 50px",
            }}
          >
            <SearchBarWithFiltersController
              onSearchChanged={handleJobsSearch}
              onFiltersOpen={handleJobsFiltersOpen}
            ></SearchBarWithFiltersController>
            <IconButton onClick={() => setAddJobOpened(true)}>
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
          <Button variant="contained" onClick={handleCloseJobsList}>
            Inchide fereastra
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          sx: {
            width: "50%",
            maxWidth: "50%",
            height: "70%",
          },
        }}
        onClose={onJobClose}
        open={addJobOpened}
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
            onClick={onJobClose}
          >
            <Icon>close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "grid",
              p: "14px",
              gridTemplateColumns: "1fr",
              "& .MuiAutocomplete-root": {
                py: "8px",
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 50px",
              }}
            >
              <Autocomplete
                options={institutions}
                getOptionLabel={(option) => option}
                onChange={(e: object, value: any | null) =>
                  handleInstitution(e, value)
                }
                isOptionEqualToValue={(option, value) => option === value}
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
            <Autocomplete
              options={["DEPUTAT", "SENATOR", ""]}
              value={functionName}
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) => option}
              onChange={(e: object, value: any | null) =>
                handleFunctionName(e, value)
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
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            <DesktopDatePicker
              label="Data inceput"
              mask="__ __ ____"
              inputFormat="DD MM YYYY"
              value={dateStart}
              onChange={handleDateStart}
              renderInput={(params) => <TextField {...params} />}
            />

            <DesktopDatePicker
              label="Data sfarsit"
              mask="__ __ ____"
              inputFormat="DD MM YYYY"
              value={dateEnd}
              onChange={handleDateEnd}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "16px", borderTop: "1px solid #bdbdbd" }}>
          <Button onClick={handleGenerateJob}>Genereaza functia</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default DocumenstFromScrapperDialog;
