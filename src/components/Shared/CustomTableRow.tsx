import {
  Avatar,
  TableRow,
  TableCell,
  Chip,
  IconButton,
  Icon,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import React, { useEffect } from "react";
import { User } from "../../interfaces/UserInterfaces";
import { RowCell } from "../../interfaces/TableRowDefinitionInterface";
import moment from "moment";
import {
  SubjectFromDataBase,
  SubjectFromScrapper,
} from "../../interfaces/SubjectInterfaces";

interface Props {
  data: User | SubjectFromDataBase | SubjectFromScrapper;
  columnsGrid: string;
  rowDefs: RowCell[];
  onAction: any;
}

const CustomTableRow: React.FC<Props> = ({
  data,
  rowDefs,
  onAction,
  columnsGrid,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDropDown = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAction = (action: string | undefined) => {
    setAnchorEl(null);
    onAction(action, data.id);
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
              color="warning"
              onClick={() => handleAction(cellDef.action)}
            >
              <Icon>{cellDef.icon}</Icon>
            </IconButton>
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
                    onClick={() => handleAction(item.action)}
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
