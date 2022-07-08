import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import SearchBarWithFiltersController from "../../components/Shared/SearchBarWithFiltersController";
import {
  DocumentFromDataBase,
  DocumentsFromScrapperResult,
} from "../../interfaces/DocumentInterfaces";
import { Institution } from "../../interfaces/IntitutionInterfaces";
import { Job } from "../../interfaces/JobInterfaces";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";
import { scrappedDocumentsTableHeaderData } from "../../resources/tableHeaders/documentsTableHeaderData";
import { documentService } from "../../services/documentsServices";
import { institutionService } from "../../services/institutionsService";
import { jobService } from "../../services/jobsService";
import useTokenStatus from "../../utils/useTokenStatus";
import { useParams } from "react-router-dom";
import { subjectService } from "../../services/subjectService";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import AddInstitutionDialogue from "../../components/DialoguesComponents/AddInstitutionDialogue";
import Loader from "../../components/Shared/Loader";

export const DocumentsFromScrapper = () => {
  const params = useParams();
  const tokenStatus = useTokenStatus();
  const columnsGrid = "60px 250px 250px 1fr";
  const [documents, setDocuments] = useState<DocumentsFromScrapperResult[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [subject, setSubject] = useState<SubjectFromDataBase>();
  const [addJobOpened, setAddJobOpened] = useState(false);
  const [addInstitutionOpened, setAddInstitutionOpened] = useState(false);
  const [dataUrl, setDataUrl] = useState("");
  const [institutions, setInstitutions] = useState<string[]>([]);
  const [institutionsResponse, setInstitutionsResponse] =
    useState<Institution[]>();
  const [subjectJobs, setSubjectJobs] = useState<Job[]>([]);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<
    number | undefined
  >();
  const [dateStart, setDateStart] = useState<object | null>();
  const [dateEnd, setDateEnd] = useState<object | null>();
  const [sirutaId, setSirutaId] = useState<number | null>();
  const [functionName, setFunctionName] = useState<string>("");
  const [filteredDocuments, setFilteredDocuments] = useState<
    DocumentsFromScrapperResult[]
  >([]);
  const [selectedJob, setSelectedJob] = useState<Job>();
  const [selectedDocumentUids, setSelectedDocumentUids] = useState<string[]>(
    []
  );
  const [loadingDocuments, setLoadingDocuments] = useState<boolean>(true);

  const filterDocumentsByJob = (
    documents: DocumentsFromScrapperResult[],
    job?: Job
  ): DocumentsFromScrapperResult[] => {
    return documents.filter(
      (document: DocumentsFromScrapperResult): boolean => {
        if (!job) {
          return true;
        }

        return (
          document.institution.toLowerCase() ===
            job.institution.toLowerCase() &&
          document.function.toLowerCase() === job.name.toLowerCase() &&
          document.locality.toLowerCase() === job.uat.toLowerCase() &&
          moment(document.date, "DD.MM.YYYY") >= moment(job.dateStart) &&
          moment(document.date, "DD.MM.YYYY") <= moment(job.dateEnd)
        );
      }
    );
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleFiltersOpen = () => {};

  const handleSearch = () => {};

  const handleNewInstitutionClose = () => {
    setAddInstitutionOpened(false);
  };

  const handleNewInstitution = () => {};

  const handleInstitution = (
    e: React.SyntheticEvent<Element, Event>,
    element: {
      value: string;
      label: string | JSX.Element;
    } | null
  ) => {
    if (element && element.value !== "adauga") {
      setSelectedInstitutionId(
        institutionsResponse?.find(
          (institution) => institution.name === element.value
        )?.id
      );
      setFunctionName(
        element.value === "Camera Deputatilor" ? "Deputat" : "Senator"
      );
      setSirutaId(
        institutionsResponse?.find(
          (institution) => institution.name === element.value
        )?.sirutaId
      );
    } else if (element?.value == "adauga") {
      setAddInstitutionOpened(true);
    }
  };

  const handleFunctionName = (e: object, value: string) => {
    setFunctionName(value);
  };

  const handleDateStart = (date: object | null) => {
    setDateStart(date);
  };

  const handleDateEnd = (date: object | null) => {
    setDateEnd(date);
  };

  const handleAddJob = async () => {
    const job = {
      subjectId: subject?.id as number,
      institutionId: selectedInstitutionId as number,
      sirutaId: sirutaId as number,
      name: functionName as string,
      dateStart: moment(dateStart).format("YYYY-MM-DD"),
      dateEnd: moment(dateEnd).format("YYYY-MM-DD"),
    };

    await jobService.addJob({
      token: tokenStatus.token,
      active: tokenStatus.active,
      ...job,
    });

    const jobsResponse = await jobService.getSubjectsJobs({
      token: tokenStatus.token,
      active: tokenStatus.active,
      subjectId: subject?.id as number,
    });

    setSubjectJobs(jobsResponse);
    setAddJobOpened(false);
  };

  const handleChangeJob = (event: ChangeEvent, value: string): void => {
    const jobId = parseInt(value),
      job = subjectJobs.find((subjectJob: Job) => subjectJob.id === jobId);

    setSelectedJob(job);
    setSelectedDocumentUids([]);
    setFilteredDocuments(filterDocumentsByJob(documents, job));
    setPage(0);
  };

  const handleClickJob = (event: any): void => {
    const jobId = parseInt(event.target.value);

    if (jobId === selectedJob?.id) {
      setSelectedJob(undefined);
      setFilteredDocuments(filterDocumentsByJob(documents));
      setPage(0);
    }
  };

  const handleChangeDocuments = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const documentUid = event.target.value;

    if (checked) {
      setSelectedDocumentUids((selectedDocumentUids: string[]): string[] =>
        selectedDocumentUids.concat([documentUid])
      );
    } else {
      setSelectedDocumentUids((selectedDocumentUids: string[]): string[] =>
        selectedDocumentUids.filter((uid: string) => uid !== documentUid)
      );
    }
  };

  const handleUploadDocuments = async () => {
    setLoadingDocuments(true);

    const selectedDocumentsForRequest = documents
      .filter((document: DocumentsFromScrapperResult) =>
        selectedDocumentUids.includes(document.uid)
      )
      .map((selectedDocument: DocumentsFromScrapperResult): any => ({
        subjectId: subject?.id,
        status: 0,
        jobId: selectedJob?.id,
        type:
          selectedDocument.type === "I"
            ? 2
            : selectedDocument.type === "A"
            ? 1
            : 2,
        name: selectedDocument.filename,
        downloadUrl: dataUrl
          .replace(":filename", selectedDocument.filename)
          .replace(":uid", selectedDocument.uid),
        date: moment(selectedDocument.date, "DD.MM.YYYY").format("YYYY-MM-DD"),
      }));

    await documentService.addNewDocuments(
      tokenStatus,
      selectedDocumentsForRequest
    );

    setFilteredDocuments((documents: DocumentsFromScrapperResult[]) =>
      documents.map(
        (
          document: DocumentsFromScrapperResult
        ): DocumentsFromScrapperResult => {
          if (selectedDocumentUids.includes(document.uid)) {
            document.existent = true;
          }

          return document;
        }
      )
    );
    setSelectedDocumentUids([]);

    setLoadingDocuments(false);
  };

  useEffect(() => {
    if (tokenStatus.active && subject) {
      const documentsResponse = async () => {
        setLoadingDocuments(true);

        const response = await documentService.getDocumentsFromScrapper({
            token: tokenStatus.token,
            active: tokenStatus.active,
            firstName: subject.firstName,
            lastName: subject.lastName,
          }),
          downloadedResponse = await documentService.getDocumentsFromDataBase({
            token: tokenStatus.token,
            active: tokenStatus.active,
            subjectId: subject?.id,
          }),
          existingDocumentFilenames = downloadedResponse.map(
            (document: DocumentFromDataBase): string => document.name
          );

        setFilteredDocuments(
          filterDocumentsByJob(
            response.results.map(
              (
                document: DocumentsFromScrapperResult
              ): DocumentsFromScrapperResult => {
                document.existent = existingDocumentFilenames.includes(
                  document.filename
                );

                return document;
              }
            )
          )
        );
        setDataUrl(response.downloadUrl);
        setDocuments([...response.results]);

        setLoadingDocuments(false);
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
        console.log(response);
      };
      documentsResponse();
      subjectJobsResponse();
      institutionsResponse();
    }
  }, [subject]);

  useEffect(() => {
    if (params.subjectId) {
      const subjectResponse = async () => {
        const response = await subjectService.getSpecificSubject({
          token: tokenStatus.token,
          active: tokenStatus.active,
          id: parseInt(params.subjectId as string),
        });
        setSubject(response);
      };
      subjectResponse();
    }
  }, [params]);

  return (
    <Box
      sx={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: "0 60px", p: "24px" }}>
        <SearchBarWithFiltersController
          onSearchChanged={handleSearch}
          onFiltersOpen={handleFiltersOpen}
        />
      </Box>
      <Box
        sx={{
          flex: "1",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "16px",
        }}
      >
        <Box
          sx={{ boxShadow: 1, m: 1, display: "flex", flexDirection: "column" }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedDocumentUids.length}
            sx={{ marginBottom: "20px" }}
            onClick={handleUploadDocuments}
          >
            Incarca documente
          </Button>

          <IconButton
            onClick={() => setAddJobOpened((prevState) => !prevState)}
            sx={{ marginLeft: "auto", width: "40px" }}
            color="primary"
          >
            {" "}
            <Icon> {!addJobOpened ? "add" : "close"} </Icon>
          </IconButton>

          {addJobOpened && (
            <Box
              sx={{
                p: 1,
                height: addJobOpened ? "auto" : 0,
                overflow: "hidden",
                display: "grid",
                mb: 2,
                gridTemplateColumns: "1fr",
                "& .MuiFormControl-root": {
                  py: "16px",
                },
              }}
            >
              <Autocomplete
                options={[...institutions, "adauga"].map((element, index) => ({
                  value: element,
                  label:
                    element !== "adauga" ? (
                      element
                    ) : (
                      <Box
                        sx={{
                          display: "grid",
                          width: "100%",
                          gridTemplateColumns: "1fr 40px",
                          alignContent: "center",
                        }}
                      >
                        Adauga Institutie
                        <Icon color="primary">add</Icon>
                      </Box>
                    ),
                }))}
                getOptionLabel={(option) =>
                  option.value !== "adauga" ? option.value : ""
                }
                onChange={(
                  e: React.SyntheticEvent<Element, Event>,
                  value: {
                    value: string;
                    label: string | JSX.Element;
                  } | null
                ) => handleInstitution(e, value)}
                isOptionEqualToValue={(
                  option: {
                    value: string;
                    label: string | JSX.Element;
                  },
                  item: {
                    value: string;
                    label: string | JSX.Element;
                  }
                ) => option.value === item.value}
                renderOption={(
                  props: any,
                  option: {
                    value: string;
                    label: string | JSX.Element;
                  }
                ) => (
                  <Box component="li" {...props}>
                    {option.label}
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
              />

              <Autocomplete
                options={["Deputat", "Senator", ""]}
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
              />

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

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddJob}
              >
                Adauga functie
              </Button>
            </Box>
          )}

          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            onChange={handleChangeJob}
          >
            {subjectJobs.map((subjectJob: Job) => (
              <Box
                key={subjectJob.id}
                sx={{
                  px: "16px",
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                }}
              >
                <Radio
                  value={subjectJob.id}
                  checked={subjectJob.id === selectedJob?.id}
                  onClick={handleClickJob}
                />

                <Box>
                  <Typography variant="body1">
                    <b>{subjectJob.name}</b>
                  </Typography>

                  <Typography variant="body2">
                    {subjectJob.institution
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (str: string) =>
                          str.charAt(0).toUpperCase() + str.slice(1)
                      )
                      .join(" ")}{" "}
                    {subjectJob.uat
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (str: string) =>
                          str.charAt(0).toUpperCase() + str.slice(1)
                      )
                      .join(" ")}
                  </Typography>

                  <Typography variant="body2">
                    {moment(subjectJob.dateStart).format("MM.YYYY")}
                    {" - "}
                    {subjectJob.dateEnd
                      ? moment(subjectJob.dateEnd).format("MM.YYYY")
                      : " prezent"}
                  </Typography>
                </Box>
              </Box>
            ))}
          </RadioGroup>
        </Box>

        {loadingDocuments && <Loader />}

        {!loadingDocuments && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-start",
            }}
          >
            <TableContainer>
              <Table
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "calc(100vh - 230px)",
                }}
              >
                <CustomTableHeader
                  columnsGrid={columnsGrid}
                  headerCells={scrappedDocumentsTableHeaderData}
                />

                <TableBody style={{ flex: "1", overflow: "auto" }}>
                  {filteredDocuments.length > 0 &&
                    filteredDocuments
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((document, index) => ({
                        ...document,
                        index: index + 1,
                        type:
                          document.type === "A"
                            ? "Declaratie de avere"
                            : "Declaratie de interese",
                        chamberName:
                          document.chamber === 1
                            ? "Senat"
                            : "Camera deputatilor",
                      }))
                      .map(
                        (
                          document: DocumentsFromScrapperResult,
                          index: number
                        ) => (
                          <TableRow
                            key={index}
                            sx={{
                              display: "grid",
                              gridTemplateColumns: columnsGrid,
                            }}
                          >
                            <TableCell>
                              <Checkbox
                                value={document.uid}
                                checked={selectedDocumentUids.includes(
                                  document.uid
                                )}
                                disabled={!selectedJob || document.existent}
                                onChange={handleChangeDocuments}
                              />
                            </TableCell>

                            <TableCell>
                              <Typography variant="body1">
                                {document.type}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2">
                                <b>
                                  {document.name
                                    .toLowerCase()
                                    .split(" ")
                                    .map(
                                      (str: string) =>
                                        str.charAt(0).toUpperCase() +
                                        str.slice(1)
                                    )
                                    .join(" ")}
                                </b>
                              </Typography>
                            </TableCell>

                            <TableCell
                              sx={{
                                display: "grid",
                                gridTemplateColumns: "150px 1fr",
                              }}
                            >
                              <Typography variant="body2">
                                Institutie:
                              </Typography>
                              <Typography variant="body2">
                                {document.institution
                                  .toLowerCase()
                                  .split(" ")
                                  .map(
                                    (str: string) =>
                                      str.charAt(0).toUpperCase() + str.slice(1)
                                  )
                                  .join(" ")}{" "}
                                {document.locality
                                  .toLowerCase()
                                  .split(" ")
                                  .map(
                                    (str: string) =>
                                      str.charAt(0).toUpperCase() + str.slice(1)
                                  )
                                  .join(" ")}
                              </Typography>

                              <Typography variant="body2">Functie:</Typography>
                              <Typography variant="body2">
                                {document.function
                                  .toLowerCase()
                                  .split(" ")
                                  .map(
                                    (str: string) =>
                                      str.charAt(0).toUpperCase() + str.slice(1)
                                  )
                                  .join(" ")}{" "}
                              </Typography>

                              <Typography variant="body2">
                                Data depunerii:
                              </Typography>
                              <Typography variant="body2">
                                {document.date
                                  .toLowerCase()
                                  .split(" ")
                                  .map(
                                    (str: string) =>
                                      str.charAt(0).toUpperCase() + str.slice(1)
                                  )
                                  .join(" ")}{" "}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              style={{
                height: "60px",
                borderTop: "1px solid #bdbdbd",
                flex: "0 60px",
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredDocuments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Randuri pe pagina"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        )}
      </Box>

      <AddInstitutionDialogue
        open={addInstitutionOpened}
        onClose={handleNewInstitutionClose}
        onAction={handleNewInstitution}
      />
    </Box>
  );
};
