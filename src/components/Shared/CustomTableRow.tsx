import {
  Avatar,
  Button,
  Chip,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import {
  DocumentFromDataBase,
  DocumentsFromScrapperResult,
} from "../../interfaces/DocumentInterfaces";
import { Job } from "../../interfaces/JobInterfaces";
import {
  SubjectFromDataBase,
  SubjectFromScrapper,
} from "../../interfaces/SubjectInterfaces";
import { RowCell } from "../../interfaces/TableRowDefinitionInterface";
import { User } from "../../interfaces/UserInterfaces";

interface Props {
  data:
    | User
    | SubjectFromDataBase
    | SubjectFromScrapper
    | DocumentsFromScrapperResult
    | Job
    | DocumentFromDataBase;

  columnsGrid: string;
  rowDefs: RowCell[];
  onAction: any;
  highlighted?: boolean;
  disabled?: boolean;
}

const CustomTableRow: React.FC<Props> = ({
  data,
  rowDefs,
  onAction,
  columnsGrid,
  highlighted,
  disabled,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleDropDown = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAction = (action: string | undefined, data?: any | undefined) => {
    setAnchorEl(null);
    onAction(action, data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow
      sx={{
        display: "grid",
        gridTemplateColumns: columnsGrid,
        "&:hover": {
          background: "#f6f6f6",
        },
        "& .MuiTableCell-root": {
          height: "50px",
          color: "#6B636B",
          display: "grid",
          alignContent: "center",
          fontFamily: "'Montserrat',  sans-serif",
        },
        ...(highlighted && {
          "& .MuiTableCell-root": {
            color: "blue",
          },
        }),
      }}
    >
      {rowDefs.map((cellDef, index) => (
        <TableCell
          id={`cell-${index}`}
          key={`cell-${index}`}
          align={cellDef.align}
        >
          {cellDef.cellType === "avatar" &&
            cellDef.altField &&
            cellDef.field && (
              <Avatar
                alt={data[cellDef.altField]}
                src={data[cellDef.field]}
              ></Avatar>
            )}
          {cellDef.cellType === "image" && cellDef.field && (
            <img
              style={{ height: "50px", width: "auto", margin: "0 auto" }}
              src={data[cellDef.field]}
            />
          )}
          {cellDef.cellType === "text" && cellDef.fields && cellDef.inline && (
            <Typography sx={{ fontWeight: cellDef.fields[0].weight }}>
              {cellDef.fields.map((field) => `${data[field.name]} `)}
            </Typography>
          )}
          {cellDef.cellType === "text" &&
            cellDef.fields &&
            !cellDef.inline &&
            cellDef.fields.map((field) => (
              <Typography key={field.name} sx={{ fontWeight: field.weight }}>
                {data[field.name]}
              </Typography>
            ))}
          {cellDef.cellType === "date" && cellDef.field && (
            <Typography>
              {moment(data[cellDef.field]).format(cellDef.dateFormat)}
            </Typography>
          )}
          {cellDef.cellType === "icon-action" && (
            <IconButton
              color={
                cellDef.color
                  ? highlighted
                    ? "error"
                    : cellDef.color
                  : "warning"
              }
              disabled={disabled}
              onClick={() =>
                handleAction(
                  cellDef.action,
                  cellDef.fields?.map((field) => ({
                    [field.name]: data[field.name],
                  }))
                )
              }
            >
              <Icon>{cellDef.icon}</Icon>
            </IconButton>
          )}
          {cellDef.cellType === "action-button" && (
            <Button
              color="primary"
              variant="contained"
              sx={{ width: "200px", margin: "0 auto" }}
              onClick={() =>
                handleAction(
                  cellDef.action,
                  cellDef.fields?.map((field) => ({
                    [field.name]: data[field.name],
                  }))
                )
              }
            >
              {cellDef.text}
            </Button>
          )}
          {cellDef.cellType === "index" && cellDef.field && (
            <Typography>{data[cellDef.field]}</Typography>
          )}
          {cellDef.cellType === "status-chip" && cellDef.field && (
            <>
              {data[cellDef.field] !== undefined && cellDef.states && (
                <>
                  <Chip
                    label={
                      cellDef.states.find(
                        (state) => data[cellDef.field] === state.value
                      )?.text
                    }
                    sx={{
                      color: cellDef.states.find(
                        (state) => data[cellDef.field] === state.value
                      )?.color,
                      borderColor: cellDef.states.find(
                        (state) => data[cellDef.field] === state.value
                      )?.color,
                      width: "120px",
                    }}
                    variant="outlined"
                  />
                </>
              )}
            </>
          )}
          {cellDef.cellType === "conditional-chip" && cellDef.field && (
            <>
              {data[cellDef.field] && (
                <Chip
                  label={cellDef.ifExistsText}
                  sx={{ color: "green", borderColor: "green", width: "120px" }}
                  variant="outlined"
                />
              )}
              {!data[cellDef.field] && (
                <Chip
                  label={cellDef.ifNotExistsText}
                  sx={{
                    color: "orange",
                    borderColor: "orange",
                    width: "120px",
                  }}
                  variant="outlined"
                />
              )}
            </>
          )}
          {cellDef.cellType === "dropdown-button" && cellDef.menuItems && (
            <>
              {" "}
              <IconButton
                aria-label="more"
                id={`long-button-${data.id}`}
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleDropDown}
              >
                <Icon>more_vert</Icon>
              </IconButton>
              <Menu
                id={`long-menu-${data.id}`}
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
                    width: "130px",
                    transform: "translateX(-30px) translateY(-10px)",
                  },
                }}
              >
                {cellDef.menuItems.map((item) => (
                  <MenuItem
                    key={item.action}
                    onClick={() => handleAction(item.action, data.id)}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default CustomTableRow;
