import React from "react";
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

const UsersTableHeader = () => {
  const classes = useStyles();

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
            direction="asc"
            active={true}
            IconComponent={() => (
              <Icon className={classes.tableCellSortLabel}>arrow_drop_down</Icon>
            )}
          ></TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">ROLURI </TableCell>
        <TableCell className={classes.tableCell} align="center">
          ULTIMA LOGARE
          <TableSortLabel
            direction="asc"
            active={true}
            IconComponent={() => (
              <Icon sx={{ fontSize: 30 }}>arrow_drop_down</Icon>
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
