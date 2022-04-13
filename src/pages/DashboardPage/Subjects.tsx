import {
  Box,
  Icon,
  IconButton,
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
  SubjectFromDataBase,
  SubjectFilters,
  SubjectsResponse,
} from "../../interfaces/SubjectInterfaces";

import { subjectService } from "../../services/subjectService";
import useTokenStatus from "../../utils/useTokenStatus";

import { subjectsTableHeaderData } from "../../resources/tableHeaders/subjectsTableHeaderData";
import { subjectsTableRowDefs } from "../../resources/tableRowDefs/subjectsTableRowDefs";
import AddSubjectDialog from "../../components/SubjectsComponents.js/AddSubjectDialog";
import AssignDialog from "../../components/SubjectsComponents.js/AssignDialog";
// import AddRolesDialog from "../../components/SubjectsComponents/AddRolesDialog";
// import { subjectRoles } from "../../resources/subjectRoles";

const Subjects = (props: any) => {
  const columnsGrid = "100px .8fr .7fr .6fr .8fr .5fr .9fr 60px ";
  const [subjects, setSubjects] = useState<SubjectFromDataBase[]>([]);
  const [subjectResponse, setSubjectResponse] = useState<SubjectsResponse>();
  const [filteredResult, setFilteredResult] = useState<SubjectFromDataBase[]>(
    []
  );
  const [filteredSubjects, setFilteredSubjects] = useState<
    SubjectFromDataBase[]
  >([]);
  const [myFilters, setFilters] = useState<SubjectFilters | undefined>();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [assignDialogOpened, setAssignDialogOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | string>();
  const [selectedSubject, setSelectedSubject] = useState<SubjectFromDataBase>();
  const [addDialogOpened, setAddDialogOpened] = useState(false);
  const tokenStatus = useTokenStatus();

  const handleFiltersOpen = () => {
    // setDialogOpened(true);
  };

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleAddSubject = () => {
    setAddDialogOpened(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpened(false);
  };

  const handleCloseAssignDialog = () => {
    setAssignDialogOpened(false);
  };

  const handleAddDialogAction = () => {
    setAddDialogOpened(false);
    if (tokenStatus.active) {
      const subjectsResponse = async () => {
        const response = await subjectService.getSubjectsFromDataBase({
          ...tokenStatus,
        });
        setSubjects([...response]);
        setFilteredSubjects([...response]);
      };
      subjectsResponse();
    }
  };

  const handleAssingDialogAction = (
    subjectId: number,
    userId: number,
    userName: string
  ) => {
    setSubjects((prevData) =>
      prevData.map((item) => ({
        ...item,
        assignedToId: item.id === subjectId ? userId : item.assignedToId,
        assignedTo: item.id === subjectId ? userName : item.assignedTo,
      }))
    );
    setFilteredSubjects((prevData) =>
      prevData.map((item) => ({
        ...item,
        assignedToId: item.id === subjectId ? userId : item.assignedToId,
        assignedTo: item.id === subjectId ? userName : item.assignedTo,
      }))
    );
    setAssignDialogOpened(false);
  };

  const handleFilters = (filters: SubjectFilters) => {
    // setDialogOpened(false);
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

  const handleSubjectAction = async (action: string, id: string | number) => {
    if (action === "delete") {
      const response = await subjectService.deleteSubject({
        token: tokenStatus.token,
        active: tokenStatus.active,
        id: id as number,
      });

      if (response.id === id) {
        setSubjects((prevData) => prevData.filter((item) => item.id !== id));
        setFilteredSubjects((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
      }
    } else if (action === "assign") {
      setAssignDialogOpened(true);
      setSelectedSubject(subjects.find((subject) => subject.id == id));
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

  // useEffect(() => {
  //   console.log(filteredSubjects);
  // }, [filteredSubjects]);

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

        setSubjects(response.filter((item) => item.deleted === 0));
        setFilteredSubjects(response.filter((item) => item.deleted === 0));
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
      <Box
        sx={{
          p: "16px 16px 0 16px",
          display: "grid",
          gridTemplateColumns: "1fr 60px",
          gap: "16px",
        }}
      >
        <SearchBarWithFiltersController
          onSearchChanged={handleSearch}
          onFiltersOpen={handleFiltersOpen}
        ></SearchBarWithFiltersController>
        <IconButton onClick={handleAddSubject}>
          <Icon color="primary">add</Icon>
        </IconButton>
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

      <AddSubjectDialog
        open={addDialogOpened}
        onClose={handleCloseAddDialog}
        onAction={handleAddDialogAction}
        definedSubjects={subjects}
      ></AddSubjectDialog>

      <AssignDialog
        open={assignDialogOpened}
        subject={selectedSubject}
        onClose={handleCloseAssignDialog}
        onAction={handleAssingDialogAction}
      ></AssignDialog>
    </Box>
  );
};

export default Subjects;
