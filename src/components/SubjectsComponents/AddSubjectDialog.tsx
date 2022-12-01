import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import "moment/locale/ro";
import React, { useEffect, useState } from "react";
import {
  SubjectData,
  SubjectFromDataBase,
  SubjectFromScrapper,
  SubjectFromScrapperResult,
} from "../../interfaces/SubjectInterfaces";
import { County, Uat } from "../../interfaces/UatInterfaces";
import { scrappedSubjectsTableHeaderData } from "../../resources/tableHeaders/subjectsTableHeaderData";
import { scrappedSubjectsTableRowDefs } from "../../resources/tableRowDefs/subjectsTableRowDefs";
import { subjectService } from "../../services/subjectService";
import { uatsServices } from "../../services/uatServices";
import useTokenStatus from "../../utils/useTokenStatus";
import CustomTableHeader from "../Shared/CustomTableHeader";
import CustomTableRow from "../Shared/CustomTableRow";
import SearchBarWithFiltersController from "../Shared/SearchBarWithFiltersController";

interface Props {
  open: boolean;
  onClose: any;
  onAction: any;
  definedSubjects: SubjectFromDataBase[];
}

moment().locale("ro");

const AddSubjectDialog: React.FC<Props> = ({
  definedSubjects,
  open,
  onClose,
  onAction,
}) => {
  const columnsGrid = "60px 1fr 1fr 1fr 1fr 70px";
  const [scrappedSubjects, setScrappedSubjects] = useState<
    SubjectFromScrapper[]
  >([]);
  const [scrapperResult, setScrapperResult] =
    useState<SubjectFromScrapperResult>();

  const [filteredSubjects, setFilteredSubjects] = useState<
    SubjectFromScrapper[]
  >([]);

  const [subjectToAdd, setSubjectToAdd] = useState<SubjectFromScrapper>();
  const [subjectData, setSubjectData] = useState<SubjectData>({
    firstName: "",
    lastName: "",
    photoUrl: "",
    dob: "",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [fromScrapperView, setFromScrapperView] = useState(true);
  const [subjectDialogOpened, setSubjectDialogOpened] = useState(false);
  const [filtersDialogOpened, setFiltersDialogOpened] = useState(false);
  const [counties, setCounties] = useState<County[]>([]);
  const [allUats, setAllUats] = useState<Uat[]>([]);
  const [uats, setUats] = useState<Uat[]>([]);
  const tokenStatus = useTokenStatus();

  const handleView = (e: any) => {
    setFromScrapperView(e.target.value);
  };

  const handleSearch = (string: string) => {
    setFilteredSubjects(
      scrappedSubjects.filter((subject) =>
        subject.name.toLowerCase().includes(string.toLowerCase())
      )
    );
    setPage(0);
  };

  const handleFiltersOpen = () => {
    setSubjectDialogOpened(true);
  };

  const handleScrappedSort = () => {};

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const onSubjectDialogClose = () => {
    setSubjectDialogOpened(false);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleCounty = (evt: any, data: any) => {
    setUats(allUats.filter((uat) => uat.countyId === data.id));
  };

  const handleUat = (evt: any, data: any) => {
    setSubjectData((prevData: SubjectData) => ({
      ...prevData,
      sirutaId: data.sirutaId,
    }));
  };

  const handleScrappedSubjectAction = (action: string, data: any) => {
    if (action === "view-subject") {
      setSubjectDialogOpened(true);
      setSubjectToAdd(
        scrappedSubjects.find(
          (subject) =>
            subject.id === data[1].id && subject.chamber === data[0].chamber
        )
      );
    }
  };

  const disableScrappedSubjectActionIf = (
    action: string,
    data: SubjectFromScrapper
  ): boolean => action === "view-subject" && data.added;

  const handleLastNameChange = (e: any) => {
    setSubjectData((prevData: SubjectData) => ({
      ...prevData,
      lastName: e.target.value,
    }));
  };

  const handleFirstNameChange = (e: any) => {
    setSubjectData((prevData: SubjectData) => ({
      ...prevData,
      firstName: e.target.value,
    }));
  };

  const handleDOBChange = (e: any) => {};

  const handleAddSubject = async () => {
    const response = await subjectService.addSubject({
      token: tokenStatus.token as string,
      active: tokenStatus.active,
      firstName: subjectData.firstName,
      lastName: subjectData.lastName,
      photoUrl: subjectData.photoUrl,
      dob: subjectData.dob,
      sirutaId: subjectData.sirutaId,
    });
    if (response) {
      setSubjectDialogOpened(false);
    }
  };

  useEffect(() => {
    if (subjectToAdd?.id) {
      const subjectDetailsResponse = async () => {
        const response = await subjectService.getSubjectDetailFromScrapper({
          token: tokenStatus.token as string,
          active: tokenStatus.active,
          legislature: scrapperResult?.legislature,
          cham: subjectToAdd.chamber,
          id: subjectToAdd.id,
        });
        if (response) {
          const lastNameArray = response.name.split(" ");
          const lastName = lastNameArray.shift();
          setSubjectData({
            firstName: lastNameArray.join(" "),
            lastName: lastName as string,
            photoUrl: response.photo,
            dob: moment(response.dateOfBirth, "DD MMM. YYYY").format(
              "YYYY-MM-DD"
            ) as string,
          });
        }
      };
      subjectDetailsResponse();
    }
  }, [subjectToAdd]);

  useEffect(() => {
    // if (scrappedSubjects) {
    //   console.log(scrappedSubjects[0].name.split(" ").slice(1).join(" "));
    //   console.log(scrappedSubjects[0].name.split(" ").shift());
    // }
    setFilteredSubjects(scrappedSubjects);
  }, [scrappedSubjects]);

  useEffect(() => {
    if (tokenStatus.active) {
      const getSubjectsResponse = async () => {
        const response = await subjectService.getSubjectsFromScrapper({
          token: tokenStatus.token as string,
          active: tokenStatus.active,
          cham: 2,
          mustRefresh: false,
          leg: 2020,
        });

        setScrapperResult(response);
        setScrappedSubjects(
          response?.results.map((item) => ({
            ...item,
            district: item.district ? item.district : "",
          }))
        );
      };

      const getCountiesResponse = async () => {
        const countiesResponse = await uatsServices.getCounties({
          token: tokenStatus.token as string,
          active: tokenStatus.active,
        });
        setCounties(countiesResponse);
      };

      const getUatsResponse = async () => {
        const uatsResponse = await uatsServices.getUats({
          token: tokenStatus.token as string,
          active: tokenStatus.active,
        });
        setAllUats(uatsResponse);
      };

      getSubjectsResponse();
      getCountiesResponse();
      getUatsResponse();
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
            aria-labelledby="radio-buttons-group-label"
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
                    chamberName: subject.chamber === 1 ? "Senator" : "Deputat",
                  }))
                  .map((subject, index) => (
                    <CustomTableRow
                      onAction={handleScrappedSubjectAction}
                      disableIf={disableScrappedSubjectActionIf}
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
        <Button onClick={() => onAction()}>Inapoi la lista principala</Button>
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
            width: "60%",
            maxWidth: "80%",
            height: "50%",
          },
        }}
        onClose={onSubjectDialogClose}
        open={subjectDialogOpened}
      >
        <DialogTitle
          sx={{
            color: "#6B636B",
            fontSize: "17px",
            borderBottom: "1px solid #bdbdbd",
          }}
        >
          <Icon sx={{ fontSize: "16px", marginRight: "16px" }}>add</Icon>
          Verifica date subiect
          <IconButton
            sx={{ position: "absolute", right: "8px", top: "8px" }}
            onClick={onSubjectDialogClose}
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
          <Box
            sx={{
              p: "24px",
              display: "grid",
              gridTemplateColumns: "160px 1fr",
              gap: "24px",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <img
                src={subjectData?.photoUrl}
                style={{ width: "150px", height: "auto" }}
              ></img>
              <Typography>
                {subjectToAdd?.chamber === 1 ? "Senator" : "Deputat"} in
                Parlamentul Romaniei
              </Typography>
            </Box>

            <FormGroup
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >
              <TextField
                id="lastName"
                type="text"
                label="Nume"
                value={subjectData?.lastName}
                onChange={(e) => handleLastNameChange(e)}
              ></TextField>
              <TextField
                type="text"
                label="Prenume"
                value={subjectData?.firstName}
                onChange={(e) => handleFirstNameChange(e)}
              ></TextField>

              <Autocomplete
                id="county-select"
                options={counties}
                getOptionLabel={(option) => option && option.name}
                onChange={(e, newValue) => handleCounty(e, newValue)}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Alege judet"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              ></Autocomplete>

              <Autocomplete
                id="uat-select"
                options={uats}
                getOptionLabel={(option) => option && option.name}
                onChange={(e, newValue) => handleUat(e, newValue)}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Alege localitate"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              ></Autocomplete>

              <TextField
                type="text"
                label="Data nasterii"
                value={moment(subjectData?.dob, "YYYY-MM-DD").format(
                  "DD MMMM YYYY"
                )}
                onChange={(e) => handleDOBChange(e)}
                disabled
              ></TextField>
            </FormGroup>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: "16px", borderTop: "1px solid #bdbdbd" }}>
          <Button onClick={handleAddSubject}>adauga</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default AddSubjectDialog;
