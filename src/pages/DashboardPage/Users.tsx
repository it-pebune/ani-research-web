import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import CustomTableHeader from "../../components/Shared/CustomTableHeader";
import CustomTableRow from "../../components/Shared/CustomTableRow";
import SearchBarWithFiltersController from "../../components/Shared/SearchBarWithFiltersController";
import AddRolesDialog from "../../components/UsersComponents/AddRolesDialog";
import UsersFiltersDialog from "../../components/UsersComponents/UsersFiltersDialog";
import UsersFIltersOverview from "../../components/UsersComponents/UsersFIltersOverview";
import { Filters, User } from "../../interfaces/UserInterfaces";
import { usersTableHeaderData } from "../../resources/tableHeaders/usersTableHeaderData";
import { usersTableRowDefs } from "../../resources/tableRowDefs/usersTableRowDefs";
import { userRoles } from "../../resources/userRoles";
import userService from "../../services/userService";
import useTokenStatus from "../../utils/useTokenStatus";

const Users = (props: any) => {
  const columnsGrid = "60px 200px 1fr 200px 150px 70px";
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

  const handleUserAction = async (action: string, id: string | number) => {
    if (action === "modify-roles") {
      setRolesDialogOpened(true);
      setSelectedId(id);
    }
    if (action === "delete") {
      const user = filteredUsers.find((user) => user.id === id);
      setFilteredUsers((prevState) =>
        prevState.filter((user) => user.id !== id)
      );

      if (tokenStatus.active) {
        await userService.deleteSpecifiedUser(tokenStatus, user);
      }
    }
  };

  const handleRoles = async (user: User, roles: number[]) => {
    const updatedUser = {
      ...user,
      phone: user.phone ? user.phone : "",
      socialInfo: user.socialInfo ? user.socialInfo : "{}",
      roles,
    };
    const response = await userService.updateSpecifiedUser(
      tokenStatus,
      updatedUser
    );
    if (response) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === response.id ? { ...user, ...response } : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === response.id
            ? {
                ...user,
                ...response,
                roleId:
                  response.roles && response.roles.length > 0
                    ? Math.max(...response.roles)
                    : 0,
                role:
                  response.roles &&
                  response.roles.length > 0 &&
                  userRoles.find(
                    (role) => role.id === Math.max(...response.roles)
                  )
                    ? userRoles.find(
                        (role) => role.id === Math.max(...response.roles)
                      )?.name
                    : "",
              }
            : user
        )
      );
    }
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

  useEffect(() => {
    if (
      myFilters.statusFilters.length === 0 &&
      myFilters.roleFilters.length === 0 &&
      myFilters.lastDateFilter.period === ""
    ) {
      setFilteredResult((prevUsers) => [...filteredUsers]);
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
      setFilteredResult([...filteredResult]);
    }
  }, [filteredUsers, myFilters]);

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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box>
        <UsersFIltersOverview
          filters={myFilters}
          onFiltersChanged={setFilters}
        ></UsersFIltersOverview>
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
            headerCells={usersTableHeaderData}
            onSorted={handleSort}
          ></CustomTableHeader>
          <TableBody style={{ flex: "1", overflow: "auto" }}>
            {filteredResult.length > 0 &&
              filteredResult
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <CustomTableRow
                    onAction={handleUserAction}
                    columnsGrid={columnsGrid}
                    rowDefs={usersTableRowDefs}
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
      <UsersFiltersDialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onFilters={handleFilters}
        filters={myFilters}
      ></UsersFiltersDialog>
      <AddRolesDialog
        open={rolesDialogOpened}
        onClose={() => setRolesDialogOpened(false)}
        id={selectedId}
        onRoles={handleRoles}
      ></AddRolesDialog>
    </Box>
  );
};

export default Users;
