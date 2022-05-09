import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";
import { User } from "../../interfaces/UserInterfaces";
import { researchersTableHeaderData } from "../../resources/tableHeaders/usersTableHeaderData";
import { researcherTableRowDefs } from "../../resources/tableRowDefs/usersTableRowDefs";
import { subjectService } from "../../services/subjectService";
import userService from "../../services/userService";
import useTokenStatus from "../../utils/useTokenStatus";
import CustomTableHeader from "../Shared/CustomTableHeader";
import CustomTableRow from "../Shared/CustomTableRow";
import SearchBarWithFiltersController from "../Shared/SearchBarWithFiltersController";

interface Props {
  open: boolean;
  onClose: any;
  onAction: any;
  subject?: SubjectFromDataBase;
}

const AssignDialog: React.FC<Props> = ({
  open,
  onClose,
  onAction,
  subject,
}) => {
  const columnsGrid = "60px 1fr 1fr 1fr";
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [filteredResult, setFilteredResult] = useState<User[]>([]);
  const [researchers, setResearchers] = useState<User[]>([]);
  const tokenStatus = useTokenStatus();

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleSearch = (string: string) => {
    setFilteredResult(
      researchers.filter((user) =>
        user.displayName.toLowerCase().includes(string.toLowerCase())
      )
    );
    setPage(0);
  };

  const handleSort = (direction: "asc" | "desc" | undefined, field: string) => {
    if (direction === "asc") {
      setFilteredResult([
        ...filteredResult.sort((a, b) =>
          a[field].toLowerCase() < b[field].toLowerCase()
            ? -1
            : a[field].toLowerCase() > b[field].toLowerCase()
            ? 1
            : 0
        ),
      ]);
    } else if (direction === "desc") {
      setFilteredResult([
        ...filteredResult.sort((a, b) =>
          a[field].toLowerCase() < b[field].toLowerCase()
            ? 1
            : a[field].toLowerCase() > b[field].toLowerCase()
            ? -1
            : 0
        ),
      ]);
    }
  };

  const handleFiltersOpen = () => {
    // setSubjectDialogOpened(true);
  };

  const handleAction = async (action: any, data: any) => {
    const response = await subjectService.assignSubject({
      ...tokenStatus,
      subjectId: subject?.id,
      userId: data[0].id,
      status: subject?.status,
    });
    console.log(data);
    onAction(subject?.id, data[0].id, data[1].displayName);
  };

  useEffect(() => {
    if (tokenStatus.active) {
      const getSubjectsResponse = async () => {
        const response = await userService.getUsersByRole(
          tokenStatus.token as string,
          tokenStatus.active,
          10
        );
        setResearchers(response);
        setFilteredResult(response);
      };

      getSubjectsResponse();
    }
  }, []);

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
        Asigneaza cercetator pentru {subject?.lastName} {subject?.firstName}
        <IconButton
          sx={{ position: "absolute", right: "8px", top: "8px" }}
          onClick={onClose}
        >
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          mt: "24px",
          display: "flex",
          flexDirection: "column",
          height: "450px",
          justifyContent: "space-around",
        }}
      >
        <SearchBarWithFiltersController
          onSearchChanged={handleSearch}
          onFiltersOpen={handleFiltersOpen}
        ></SearchBarWithFiltersController>

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
              headerCells={researchersTableHeaderData}
              onSorted={handleSort}
            ></CustomTableHeader>
            <TableBody style={{ flex: "1", overflow: "auto" }}>
              {filteredResult.length > 0 &&
                filteredResult
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <CustomTableRow
                      onAction={handleAction}
                      columnsGrid={columnsGrid}
                      rowDefs={researcherTableRowDefs}
                      key={`table-row-${index}`}
                      data={user}
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
      </DialogContent>

      <DialogActions sx={{ padding: "16px", borderTop: "1px solid #bdbdbd" }}>
        <Button onClick={() => onClose()}>Inapoi la lista principala</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignDialog;
