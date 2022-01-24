import {
  Avatar,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import UsersFiltersDialog from "../../components/UsersComponents/UsersFiltersDialog";
import ModalEditUser from "../../components/ModalEditUser/ModalEditUser";
import UsersSearchBarWithFilters from "../../components/UsersComponents/UsersSearchBarWithFilters";
import UsersTableHeader from "../../components/UsersComponents/UsersTableHeader";
import UsersTableRow from "../../components/UsersComponents/UsersTableRow";
import { User } from "../../interfaces/UserInterfaces";

import userService from "../../services/userService";
import CustomButton from "../../shared/CustomButton";
import CustomTypography from "../../shared/CustomTypography";
import useTokenStatus from "../../utils/useTokenStatus";

import "./Users.css";

const Users = (props: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [dialogOpened, setDialogOpened] = useState(false)
  const tokenStatus = useTokenStatus();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [focusedUser, setFocusedUser] = useState<User>();

  const handleOpeningModal = (userOnFocus: User) => {
    setModalIsOpen(true);
    setFocusedUser(userOnFocus);
  } 

  const handleClosingModal = () => {
    setModalIsOpen(false);
  } 

  const handleFiltersOpen = () =>{
    setDialogOpened(true);
  }

  const handleChangePage = () => {};

  const handleChangeRowsPerPage = () => {};

  const handleFilters = () => {

  }

  useEffect(() => {
    if (tokenStatus.active) {
      const usersResponse = async () => {
        const response = await userService.getUsers({ ...tokenStatus });
        setUsers(response);
      };
      usersResponse();
    }
  }, []);

  return (
    <div className="users-wrapper">
      <ModalEditUser focusedUser={focusedUser!} modalIsOpen={modalIsOpen} handleCloseModal={handleClosingModal}></ModalEditUser>
            <CustomButton onClick={()=>{handleOpeningModal(user)}}>
              <CustomTypography withBg transKey='second-main'/>
            </CustomButton>

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
              {users.length > 0 &&
                users.map((user, index) => (
                  <UsersTableRow
                    key={`table-row-${index}`}
                    user={user}
                  ></UsersTableRow>
                ))}
              {users.length > 0 &&
                users.map((user, index) => (
                  <UsersTableRow
                    key={`table-rox-${index}`}
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
            count={users.length*2}
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
