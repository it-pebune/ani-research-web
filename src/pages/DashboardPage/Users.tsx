import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import { useState, useEffect } from "react";
import UsersFiltersDialog from "../../components/UsersComponents/UsersFiltersDialog";
import UsersFIltersOverview from "../../components/UsersComponents/UsersFIltersOverview";

import UsersTableRow from "../../components/UsersComponents/UsersTableRow";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import SearchBarWithFiltersController from "../../components/Shared/SearchBarWithFiltersController";


import { User, Filters } from "../../interfaces/UserInterfaces";

import userService from "../../services/userService";
import useTokenStatus from "../../utils/useTokenStatus";

import { usersTableHeaderData } from "../../resources/tableHeaders/usersTableHeaderData";

import "./Users.css";

const Users = (props: any) => {

  const columnsGrid ="60px 200px 1fr 200px 150px 70px";
  const [users, setUsers] = useState<User[]>([]);
  const [filteredResult, setFilteredResult] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [myFilters, setFilters] = useState<Filters>({
    statusFilters: [],
    roleFilters: [],
    lastDateFilter: { logged: null, period: "" },
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [dialogOpened, setDialogOpened] = useState(false);
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

  const handleFilters = (filters: Filters) => {
    setDialogOpened(false);
    setFilters(filters);
    setPage(0);
  };

  const handleSearch = (string: string) => {
    setFilteredUsers(
      users.filter((user) =>
        user.displayName.toLowerCase().includes(string.toLowerCase())
      )
    );
    setPage(0);
  };


  const handleSort = (direction: "asc" | "desc" | undefined, field: string) => {
    if (direction === "asc") {
      setFilteredResult([
        ...filteredResult.sort((a, b) =>
          a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0
        )
      ]);
    } else if (direction === "desc") {
      setFilteredResult([
        ...filteredResult.sort((a, b) =>
          a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0
        )
      ]);
    }
  };

  const handleFiltersChanged = (changedFilters: Filters) => {
    setFilters(changedFilters);
  };

  useEffect(() => {
    if (
      myFilters.statusFilters.length === 0 &&
      myFilters.roleFilters.length === 0 &&
      myFilters.lastDateFilter.period === ""
    ) {
      setFilteredResult(filteredUsers);
    } else {
      let filteredResult = filteredUsers;
      if (myFilters.statusFilters.length === 1) {
        filteredResult = myFilters.statusFilters.includes(1)
          ? filteredResult.filter((user) => user.role)
          : filteredResult.filter((user) => !user.role);
      }
      if (
        (myFilters.statusFilters.length === 0 ||
          myFilters.statusFilters.includes(1)) &&
        myFilters.roleFilters.length > 0
      ) {
        filteredResult = filteredResult.filter((user) =>
          myFilters.roleFilters.includes(user.roleId)
        );
      }
      if (myFilters.lastDateFilter.period !== "") {
        if (myFilters.lastDateFilter.logged === 0) {
          filteredResult = filteredResult.filter((user) =>
            moment(user.lastLogin).isBefore(
              moment()
                .subtract(myFilters.lastDateFilter.period, "d")
                .format("YYYY-MM-DD"),
              "day"
            )
          );
        } else {
          filteredResult = filteredResult.filter((user) =>
            moment(user.lastLogin).isSameOrAfter(
              moment()
                .subtract(myFilters.lastDateFilter.period, "d")
                .format("YYYY-MM-DD"),
              "day"
            )
          );
        }
      }
      setFilteredResult(filteredResult);
    }
  }, [filteredUsers, myFilters]);

  useEffect(()=>{
    console.log(filteredResult)
  },[filteredResult]);

  useEffect(() => {
    if (tokenStatus.active) {
      const usersResponse = async () => {
        const response = await userService.getUsers({ ...tokenStatus });
        setUsers(response);
        setFilteredUsers(response);
      };
      usersResponse();
    }
  }, []);

  return (
    <div className="users-wrapper">
      <div className="filters-overview">
        <UsersFIltersOverview
          filters={myFilters}
          onFiltersChanged={handleFiltersChanged}
        ></UsersFIltersOverview>
      </div>
      <div className="search-field">

        <SearchBarWithFiltersController
          onSearchChanged={handleSearch}
          onFiltersOpen={handleFiltersOpen}
        ></SearchBarWithFiltersController>

      </div>
      <div className="table-wrapper">
        <div className="table-holder">
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
                headerCells={usersTableHeaderData}
                onSorted={handleSort}
              ></CustomTableHeader>
              <TableBody style={{ flex: "1", overflow: "auto" }}>
                {filteredResult.length > 0 &&
                  filteredResult
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => (
                      <UsersTableRow
                        columnsGrid={columnsGrid}
                        key={`table-row-${index}`}
                        user={user}
                      ></UsersTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="table-pagination">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredResult.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Randuri pe pagina"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <UsersFiltersDialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onFilters={handleFilters}
        filters={myFilters}
      ></UsersFiltersDialog>
    </div>
  );
};

export default Users;
