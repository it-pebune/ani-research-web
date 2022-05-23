import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  SubjectFilters,
  SubjectFromDataBase,
} from "../../interfaces/SubjectInterfaces";
import { assignedSubjectsTableHeaderData } from "../../resources/tableHeaders/subjectsTableHeaderData";
import { assignedSubjectsTableRowDefs } from "../../resources/tableRowDefs/subjectsTableRowDefs";
import useTokenStatus from "../../utils/useTokenStatus";
import CustomTableHeader from "../Shared/CustomTableHeader";
import CustomTableRow from "../Shared/CustomTableRow";
import SearchBarWithFiltersController from "../Shared/SearchBarWithFiltersController";

type Props = {
  subjects: SubjectFromDataBase[];
  onSubjectSelected: any;
};

const MySubjects = ({ subjects, onSubjectSelected }: Props) => {
  const columnsGrid = "100px .5fr .5fr .3fr .3fr 60px";

  const [filteredResult, setFilteredResult] = useState<SubjectFromDataBase[]>(
    []
  );
  const [filteredSubjects, setFilteredSubjects] = useState<
    SubjectFromDataBase[]
  >([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<number>();
  const [myFilters, setFilters] = useState<SubjectFilters | undefined>();
  const tokenStatus = useTokenStatus();

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

  const handleSubjectAction = async (action: string, data: any) => {
    setSelectedSubject(data);
    onSubjectSelected(
      subjects.find((subject) => subject.id === data),
      action
    );
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

  useEffect(() => {
    if (selectedSubject) {
      console.log(selectedSubject);
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (subjects.length > 0) {
      setFilteredResult(subjects);
    }
  }, [subjects]);

  return (
    <Box sx={{ p: "24px" }}>
      <SearchBarWithFiltersController
        onSearchChanged={handleSearch}
        onFiltersOpen={handleFiltersOpen}
      ></SearchBarWithFiltersController>

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
            headerCells={assignedSubjectsTableHeaderData}
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
                    rowDefs={assignedSubjectsTableRowDefs}
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
    </Box>
  );
};

export default MySubjects;
