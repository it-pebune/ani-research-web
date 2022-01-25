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
import UsersSearchBarWithFilters from "../../components/UsersComponents/UsersSearchBarWithFilters";
import UsersTableHeader from "../../components/UsersComponents/UsersTableHeader";
import UsersTableRow from "../../components/UsersComponents/UsersTableRow";
import { User, Filters } from "../../interfaces/UserInterfaces";

import userService from "../../services/userService";
import useTokenStatus from "../../utils/useTokenStatus";

import "./Users.css";

const Users = (props: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredResult, setFilteredResult] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [myFilters, setFilters] = useState<Filters>({statusFilters:[], roleFilters:[], lastDateFilter:{logged:null, period:""}});
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [dialogOpened, setDialogOpened] = useState(false)
  const tokenStatus = useTokenStatus();

  const handleFiltersOpen = () =>{
    setDialogOpened(true);
  }

  const handleChangePage = (e:any, newPage:number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e:any) => {
    setRowsPerPage(e.target.value)
    setPage(0);
  };

  const handleFilters = (filters:Filters) => {
    setDialogOpened(false);
    setFilters(filters);
    setPage(0);
  }

  const handleSearch = (string: string)=>{
    setFilteredUsers(users.filter(user=>user.displayName.toLowerCase().includes(string.toLowerCase())));
    setPage(0);
  }

  const handleSortByName = (direction: string) => {
    if(direction==="asc"){
      setFilteredResult([...filteredResult.sort((a,b)=>a.displayName < b.displayName ? -1 : a.displayName > b.displayName ? 1 : 0)])
    }else if(direction==="desc"){
      setFilteredResult([...filteredResult.sort((a,b)=>a.displayName < b.displayName ? 1 : a.displayName > b.displayName ? -1 : 0)])
    }
  }

  const handleSortByLastLogin = (direction: string) => {
    if(direction==="asc"){
      setFilteredResult([...filteredResult.sort((a,b)=>a.lastLogin < b.lastLogin ? -1 : a.lastLogin > b.lastLogin ? 1 : 0)])
    }else if(direction==="desc"){
      setFilteredResult([...filteredResult.sort((a,b)=>a.lastLogin < b.lastLogin ? 1 : a.lastLogin > b.lastLogin ? -1 : 0)])
    }
  }

  const handleFiltersChanged = (changedFilters: Filters) => {
    setFilters(changedFilters)
  }

  useEffect(()=>{
    if(myFilters.statusFilters.length===0 && myFilters.roleFilters.length===0 && myFilters.lastDateFilter.period===""){
      setFilteredResult(filteredUsers);
    }else{
      let filteredResult = filteredUsers;
      if(myFilters.statusFilters.length===1){
        filteredResult = myFilters.statusFilters.includes(1) ? filteredResult.filter(user=>user.role) : filteredResult.filter(user=>!user.role)
      };
      if((myFilters.statusFilters.length===0 || myFilters.statusFilters.includes(1))&&myFilters.roleFilters.length>0){
        filteredResult = filteredResult.filter(user=>myFilters.roleFilters.includes(user.roleId))
      }
      if(myFilters.lastDateFilter.period!==""){
        if(myFilters.lastDateFilter.logged===0){
          filteredResult = filteredResult.filter(user=> moment(user.lastLogin).isBefore(moment().subtract(myFilters.lastDateFilter.period,'d').format('YYYY-MM-DD'), 'day'))
        }else{
          filteredResult = filteredResult.filter(user=> moment(user.lastLogin).isSameOrAfter(moment().subtract(myFilters.lastDateFilter.period,'d').format('YYYY-MM-DD'), 'day'))
        }
      }
      setFilteredResult(filteredResult);
    }  
  }, [filteredUsers, myFilters])

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
        <UsersFIltersOverview filters={myFilters} onFiltersChanged={handleFiltersChanged}></UsersFIltersOverview>
      </div>
      <div className="search-field">
      <UsersSearchBarWithFilters onSearchChanged={handleSearch} onFiltersOpen={handleFiltersOpen}></UsersSearchBarWithFilters>
      </div>
      <div className="table-wrapper">
        <div className="table-holder">
        <TableContainer
          style={{ display: "flex",  flexDirection: "column", height: "100%" }}
        >
          <Table
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <UsersTableHeader changeNameDirection={handleSortByName} changeLastLoginDirection={handleSortByLastLogin}></UsersTableHeader>
            <TableBody style={{ flex: "1", overflow: "auto" }}>
              {filteredResult.length > 0 &&
                filteredResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
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
            count={filteredResult.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Randuri pe pagina"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <UsersFiltersDialog open={dialogOpened} onClose={()=>setDialogOpened(false)} onFilters={handleFilters} filters={myFilters}></UsersFiltersDialog>
    </div>
  );
};

export default Users;
