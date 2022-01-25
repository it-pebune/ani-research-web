import {
  Avatar,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import UsersFiltersDialog from "../../components/UsersComponents/UsersFiltersDialog";
import UsersSearchBarWithFilters from "../../components/UsersComponents/UsersSearchBarWithFilters";
import UsersTableHeader from "../../components/UsersComponents/UsersTableHeader";
import UsersTableRow from "../../components/UsersComponents/UsersTableRow";
import { User, Filters } from "../../interfaces/UserInterfaces";
import { userRoles } from "../../resources/userRoles";

import userService from "../../services/userService";
import useTokenStatus from "../../utils/useTokenStatus";

import "./Users.css";

const Users = (props: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [dialogOpened, setDialogOpened] = useState(false)
  const tokenStatus = useTokenStatus();


  const handleFiltersOpen = () =>{
    setDialogOpened(true);
  }

  const handleChangePage = () => {};

  const handleChangeRowsPerPage = () => {};

  const handleFilters = (filters:Filters) => {
    setDialogOpened(false);
    console.log(filters);
    if(filters.statusFilters.length===0 && filters.roleFilters.length===0 && filters.lastDateFilter.period===null){
      setFilteredUsers(users);
    }else{
      let filteredResult = users;
      if(filters.statusFilters.length===1){
        filteredResult = filters.statusFilters.includes(1) ? filteredResult.filter(user=>user.role) : filteredResult.filter(user=>!user.role)
      };
      if((filters.statusFilters.length===0 || filters.statusFilters.includes(1))&&filters.roleFilters.length>0){
        filteredResult = filteredResult.filter(user=>filters.roleFilters.includes(user.roleId))
      }
      if(filters.lastDateFilter.period!==null){
        if(filters.lastDateFilter.logged===0){
          filteredResult = filteredResult.filter(user=> moment(user.lastLogin).isBefore(moment().subtract(filters.lastDateFilter.period,'d').format('YYYY-MM-DD'), 'day'))
        }else{
          filteredResult = filteredResult.filter(user=> moment(user.lastLogin).isSameOrAfter(moment().subtract(filters.lastDateFilter.period,'d').format('YYYY-MM-DD'), 'day'))
        }
      }
      setFilteredUsers(filteredResult);
    }

  }

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

      <div className="search-field">
      <UsersSearchBarWithFilters onFiltersOpen={handleFiltersOpen}></UsersSearchBarWithFilters>
      </div>
      <div className="table-wrapper">
        <div className="table-holder">
        <TableContainer
          style={{ display: "flex",  flexDirection: "column", height: "100%" }}
        >
          <Table
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <UsersTableHeader></UsersTableHeader>
            <TableBody style={{ flex: "1", overflow: "auto" }}>
              {filteredUsers.length > 0 &&
                filteredUsers.map((user, index) => (
                  <UsersTableRow
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
            count={users.length}
            rowsPerPage={10}
            page={0}
            labelRowsPerPage="Randuri pe pagina"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <UsersFiltersDialog open={dialogOpened} onClose={()=>setDialogOpened(false)} onFilters={handleFilters}></UsersFiltersDialog>
    </div>
  );
};

export default Users;
