import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import { useState, useEffect } from "react";
import SubjectsFIltersOverview from "../../components/SubjectsComponents.js/SubjectsFIltersOverview";
import CustomTableRow from "../../components/Shared/CustomTableRow";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import SearchBarWithFiltersController from "../../components/Shared/SearchBarWithFiltersController";
import {
  Subject,
  SubjectFilters,
  SubjectsResponse,
} from "../../interfaces/SubjectInterfaces";

import { subjectService } from "../../services/subjectService";
import useTokenStatus from "../../utils/useTokenStatus";

import { subjectsTableHeaderData } from "../../resources/tableHeaders/subjectsTableHeaderData";
import { subjectsTableRowDefs } from "../../resources/tableRowDefs/subjectsTableRowDefs";
// import AddRolesDialog from "../../components/SubjectsComponents/AddRolesDialog";
// import { subjectRoles } from "../../resources/subjectRoles";

const Subjects = (props: any) => {
  const columnsGrid = "60px 1fr .5fr .5fr .5fr .7fr";
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectResponse, setSubjectResponse] = useState<SubjectsResponse>();
  const [filteredResult, setFilteredResult] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [myFilters, setFilters] = useState<SubjectFilters | undefined>();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | string>();
  const [rolesDialogOpened, setRolesDialogOpened] = useState(false);
  const tokenStatus = useTokenStatus();

  const handleFiltersOpen = () => {
    setDialogOpened(true);
  };

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleFilters = (filters: SubjectFilters) => {
    setDialogOpened(false);
    setFilters(filters);
    setPage(0);
  };

  const handleSearch = (string: string) => {
    setFilteredSubjects(
      subjects.filter((subject) =>
        subject.name.toLowerCase().includes(string.toLowerCase())
      )
    );
    setPage(0);
  };

  const handleSubjectAction = (action: string, id: string | number) => {
    if (action === "modify-roles") {
      setRolesDialogOpened(true);
      setSelectedId(id);
    }
  };

  const handleSort = (direction: "asc" | "desc" | undefined, field: string) => {
    if (direction === "asc") {
      setFilteredResult([
        ...filteredResult
          .sort((a, b) =>
            a[field].toLowerCase() < b[field].toLowerCase()
              ? -1
              : a[field].toLowerCase() > b[field].toLowerCase()
              ? 1
              : 0
          )
          .map((item, index) => ({ ...item, index: index + 1 })),
      ]);
    } else if (direction === "desc") {
      setFilteredResult([
        ...filteredResult
          .sort((a, b) =>
            a[field].toLowerCase() < b[field].toLowerCase()
              ? 1
              : a[field].toLowerCase() > b[field].toLowerCase()
              ? -1
              : 0
          )
          .map((item, index) => ({ ...item, index: index + 1 })),
      ]);
    }
  };

  useEffect(() => {
    setFilteredResult((prevUsers) =>
      filteredSubjects.map((subject, index) => ({
        ...subject,
        district: subject.district ? subject.district : "",
        index: index + 1,
      }))
    );
  }, [filteredSubjects, myFilters]);

  useEffect(() => {
    if (tokenStatus.active) {
      const subjectsResponse = async () => {
        const response = await subjectService.getSubjectsFromDataBase({
          ...tokenStatus,
        });

        console.log(response);
        // setSubjectResponse(response);
        setSubjects(response);
        setFilteredSubjects(response);
      };
      subjectsResponse();
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box>
        <SubjectsFIltersOverview
          filters={myFilters}
          onFiltersChanged={setFilters}
        ></SubjectsFIltersOverview>
      </Box>
      <Box sx={{ p: "16px 16px 0 16px" }}>
        <SearchBarWithFiltersController
          onSearchChanged={handleSearch}
          onFiltersOpen={handleFiltersOpen}
        ></SearchBarWithFiltersController>
      </Box>

      <TableContainer
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
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
            headerCells={subjectsTableHeaderData}
            onSorted={handleSort}
          ></CustomTableHeader>
          <TableBody style={{ flex: "1", overflow: "auto" }}>
            {filteredResult.length > 0 &&
              filteredResult
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subject, index) => (
                  <CustomTableRow
                    onAction={handleSubjectAction}
                    columnsGrid={columnsGrid}
                    rowDefs={subjectsTableRowDefs}
                    key={`table-row-${index}`}
                    data={subject}
                  ></CustomTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ height: "70px", borderTop: "1px solid #bdbdbd" }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredResult.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="Randuri pe pagina"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <SubjectsFiltersDialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onFilters={handleFilters}
        filters={myFilters}
      ></SubjectsFiltersDialog> */}
    </Box>
  );
};

export default Subjects;
