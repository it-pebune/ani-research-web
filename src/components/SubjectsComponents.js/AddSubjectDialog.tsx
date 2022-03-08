import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  SubjectFromScrapper,
  SubjectFromScrapperResult,
} from "../../interfaces/SubjectInterfaces";
import { scrappedSubjectsTableHeaderData } from "../../resources/tableHeaders/subjectsTableHeaderData";
import { scrappedSubjectsTableRowDefs } from "../../resources/tableRowDefs/subjectsTableRowDefs";

import { subjectService } from "../../services/subjectService";
import useTokenStatus from "../../utils/useTokenStatus";
import CustomTableHeader from "../Shared/CustomTableHeader";
import CustomTableRow from "../Shared/CustomTableRow";
import SearchBarWithFiltersController from "../Shared/SearchBarWithFiltersController";

interface Props {
  open: boolean;
  onClose: any;
  onAction: any;
}

const AddSubjectDialog: React.FC<Props> = ({
  children,
  open,
  onClose,
  onAction,
}) => {
  const columnsGrid = "60px 1fr 1fr 1fr 1fr 70px";
  const [scrappedSubjects, setScrapperdSubjects] = useState<
    SubjectFromScrapper[]
  >([]);
  const [scrapperResult, setScrapperResult] =
    useState<SubjectFromScrapperResult>();

  const [filteredSubjects, setFilteredSubjects] = useState<
    SubjectFromScrapper[]
  >([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [fromScrapperView, setFromScrapperView] = useState(true);
  const [subjectDialogOpened, setSubjectDialogOpened] = useState(false);
  const [filtersDialogOpened, setFiltersDialogOpened] = useState(false);
  const tokenStatus = useTokenStatus();

  const handleView = (e: any) => {
    setFromScrapperView(e.target.value);
  };

  const handleSearch = () => {};

  const handleFiltersOpen = () => {
    setSubjectDialogOpened(true);
  };

  const handleScrappedSort = () => {};

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleScrappedSubjectAction = (action: string, id: number) => {
    console.log(action, id);
  };

  useEffect(() => {
    setFilteredSubjects(scrappedSubjects);
  }, [scrappedSubjects]);

  useEffect(() => {
    if (tokenStatus.active) {
      const subjectsResponse = async () => {
        const response = await subjectService.getSubjectsFromScrapper({
          token: tokenStatus.token as string,
          active: tokenStatus.active,
          cham: 2,
          mustRefresh: false,
          leg: 2020,
        });
        setScrapperResult(response);
        setScrapperdSubjects(response?.results);
      };
      subjectsResponse();
    }
  }, []);
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "70%",
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
        Adauga subiect din lista
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
          height: "450px",
          justifyContent: "space-around",
        }}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={fromScrapperView}
            onChange={handleView}
            sx={{
              display: "flex",
              alignSelf: "start",
              flexDirection: "row",
              gap: "24px",
              py: "12px",
            }}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Introdu din lista parlamentari"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Introdu manual"
            />
          </RadioGroup>
        </FormControl>

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
              headerCells={scrappedSubjectsTableHeaderData}
              onSorted={handleScrappedSort}
            ></CustomTableHeader>
            <TableBody style={{ flex: "1", overflow: "auto" }}>
              {filteredSubjects.length > 0 &&
                filteredSubjects
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subject, index) => ({
                    ...subject,
                    index: index + 1,
                    chamber: subject.chamber === 1 ? "Senator" : "Deputat",
                  }))
                  .map((subject, index) => (
                    <CustomTableRow
                      onAction={handleScrappedSubjectAction}
                      columnsGrid={columnsGrid}
                      rowDefs={scrappedSubjectsTableRowDefs}
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
          count={filteredSubjects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Randuri pe pagina"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DialogContent>

      <DialogActions sx={{ padding: "16px", borderTop: "1px solid #bdbdbd" }}>
        <Button onClick={() => onAction()}>adauga</Button>
      </DialogActions>

      <Dialog
        PaperProps={{
          sx: {
            width: "70%",
            maxWidth: "80%",
            height: "90%",
          },
        }}
        onClose={onClose}
        open={filtersDialogOpened}
      >
        ceva
      </Dialog>

      <Dialog
        PaperProps={{
          sx: {
            width: "70%",
            maxWidth: "80%",
            height: "90%",
          },
        }}
        onClose={onClose}
        open={subjectDialogOpened}
      >
        ceva
      </Dialog>
    </Dialog>
  );
};

export default AddSubjectDialog;
