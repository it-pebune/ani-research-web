import {
  Avatar,
  TableRow,
  TableCell,
  Chip,
  IconButton,
  Icon,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { User } from "../../interfaces/UserInterfaces";
import "./UsersTableRow.css";
import { makeStyles } from "@mui/styles";
import moment from "moment";

interface Props {
  user: User;
}

const useStyles = makeStyles({
  tableCell: {
    color: "#6B636B",
    display: "grid",
    alignContent: "center",
    fontFamily: "'Montserrat',  sans-serif",
  },
});

const UsersTableRow: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDropDown = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddRoles = () => {
    setAnchorEl(null);
  };

  const handleBlacklist = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow
      sx={{
        display: "grid",
        gridTemplateColumns: "60px 200px 1fr 200px 150px 70px",
      }}
    >
      <TableCell className={classes.tableCell}>
        <Avatar alt={user.displayName} src={user.profileImageUrl}></Avatar>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <p className="display-name">{user.displayName}</p>
        <p>{user.email}</p>
      </TableCell>

      <TableCell align="center" className={classes.tableCell}>
        <p>{user.role}</p>
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <p>{moment(user.lastLogin).format("DD.MM.YYYY")}</p>
      </TableCell>
      <TableCell align="center">
        {user.role && (
          <Chip
            label="Activ"
            sx={{ color: "green", borderColor: "green", width: "120px" }}
            variant="outlined"
          />
        )}
        {!user.role && (
          <Chip
            label="In asteptare"
            sx={{ color: "orange", borderColor: "orange", width: "120px" }}
            variant="outlined"
          />
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleDropDown}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: "auto",
              width: "20ch",
              transform: "translateX(-30px) translateY(-10px)",
            },
          }}
        >
          <MenuItem onClick={handleAddRoles}>Adauga roluri</MenuItem>
          <MenuItem onClick={handleBlacklist}>BlackList</MenuItem>
          <MenuItem onClick={handleDelete}>Sterge</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default UsersTableRow;
