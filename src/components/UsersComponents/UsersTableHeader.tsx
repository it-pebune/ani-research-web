import React, { useState } from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Icon,
} from "@mui/material";

import "./UsersTableRow.css";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableCell: {
    color: "#6B636B",
  },
  tableCellSortLabel:{
    color: "#6B636B",
    fontSize: "30px",
    '&:hover': {
        color: "#3A63DE",
    } 
  }
});

interface Props{
  changeNameDirection:any,
  changeLastLoginDirection: any
}

const UsersTableHeader: React.FC<Props> = ({changeNameDirection, changeLastLoginDirection}) => {
  const classes = useStyles();

  const [nDirection, setNDirection] = useState<"asc"|"desc">("asc")
  const [lLDirection, setLLDirection] = useState<"asc"|"desc">("asc")

  const handleNDirection = (direction:"asc"|"desc") =>{
    console.log(direction);
    setNDirection(direction);
    changeNameDirection(direction);
  }

  const handleLLDirection = (direction:"asc"|"desc") =>{
    setLLDirection(direction);
    changeLastLoginDirection(direction);
  }

  return (

    <TableHead style={{ width: "100%", tableLayout: "auto", flex:"0 63px" }}>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "60px 200px 1fr 200px 150px 70px",
        }}
      >
        <TableCell></TableCell>
        <TableCell className={classes.tableCell} align="justify">
          NUME
          <TableSortLabel
            direction={nDirection}
            active={true}
            IconComponent={() => (
              <>
              {nDirection==="desc"&&<Icon onClick={()=>{handleNDirection("asc")}} className={classes.tableCellSortLabel}>arrow_drop_down</Icon>}
              {nDirection==="asc"&&<Icon onClick={()=>{handleNDirection("desc")}} className={classes.tableCellSortLabel}>arrow_drop_up</Icon>}
              </>
            )}
          ></TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">ROLURI </TableCell>
        <TableCell className={classes.tableCell} align="center">
          ULTIMA LOGARE
          <TableSortLabel
            direction={lLDirection}
            active={true}
            IconComponent={() => (
              <>
              {lLDirection==="asc"&&<Icon onClick={()=>{handleLLDirection("desc")}} className={classes.tableCellSortLabel}>arrow_drop_down</Icon>}
              {lLDirection==="desc"&&<Icon onClick={()=>{handleLLDirection("asc")}} className={classes.tableCellSortLabel}>arrow_drop_up</Icon>}
              </>
            )}
          ></TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">STATUS</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>

  );
};

export default UsersTableHeader;
