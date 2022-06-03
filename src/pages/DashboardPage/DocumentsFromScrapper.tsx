import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import CustomTableRow from "../../components/Shared/CustomTableRow";
import SearchBarWithFiltersController from "../../components/Shared/SearchBarWithFiltersController";
import { DocumentsFromScrapperResult } from "../../interfaces/DocumentInterfaces";
import { Institution } from "../../interfaces/IntitutionInterfaces";
import { Job } from "../../interfaces/JobInterfaces";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";
import { scrappedDocumentsTableHeaderData } from "../../resources/tableHeaders/documentsTableHeaderData";
import { scrappedDocumentsTableRowDefs } from "../../resources/tableRowDefs/documentsTableRowDefs";
import { documentService } from "../../services/documentsServices";
import { institutionService } from "../../services/institutionsService";
import { jobService } from "../../services/jobsService";
import useTokenStatus from "../../utils/useTokenStatus";
import { useParams } from "react-router-dom";
import { subjectService } from "../../services/subjectService";

export const DocumentsFromScrapper = () => {
  const params = useParams();
  const tokenStatus = useTokenStatus();
  const columnsGrid = "60px 1fr 1fr 1fr 1fr 1fr 1fr 70px";
  const jobsColumnsGrid = "60px 1fr 1fr 1fr 1fr 70px";
  const [documents, setDocuments] = useState<DocumentsFromScrapperResult[]>([]);
  const [downloadedDocuments, setDownloadedDocuments] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [subject, setSubject] = useState<SubjectFromDataBase>();
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
  const [sirutaId, setSirutaId] = useState<number>();

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

  const handleFiltersOpen = () => {};

  const handleSearch = () => {};

  const handleScrappedDocumentAction = (action: string, data: any) => {
    if (action === "download-document") {
      setFileName(data[0].filename);
      setUid(data[1].uid);
      setDocType(data[2].type === "I" ? 2 : data[2].type === "A" ? 1 : 2);
      setDocDate(moment(data[3].date, "DD.MM.YYYY").format("YYYY-MM-DD"));
      setJobsListOpened(true);
    }
  };

  useEffect(() => {
    if (tokenStatus.active && subject) {
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
  }, [subject]);

  useEffect(() => {
    console.log(params);
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

      <Box sx={{ display: "grid", gridTemplateColumns: "250px 1fr" }}>
        <Box sx={{ display: "flex", flexDirection: "column", p: "24px" }}>
          Functii inregistrate
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
      </Box>
    </Box>
  );
};
