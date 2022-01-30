import React, { useState } from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Icon,
} from "@mui/material";
import { HeaderCell } from '../../interfaces/TableHeaderInterface';

interface Props {
  headerCells: HeaderCell[];
  columnsGrid: string;
  onSorted: any;
}

const CustomTableHeader: React.FC<Props> = ({
  headerCells,
  columnsGrid,
  onSorted,
}) => {
  const [headerData, setHeaderData] = useState(headerCells);

  const handleDirection = (direction:"asc"|"desc"|undefined, field:string|undefined) => {
    setHeaderData((prevState:HeaderCell[]) => {
      onSorted(direction, field);
      return prevState.map((cell) =>
        cell.field === field ? { ...cell, direction } : cell
      );
    });
  };

  return (
    <TableHead style={{ width: "100%", tableLayout: "auto", flex: "0 63px" }}>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: columnsGrid,
        }}
      >
        {headerData.map((cell, index) => (
          <TableCell
            key={`cell-${index}`}
            sx={{ color: "#6B636B" }}
            align={cell.align || "justify"}
          >
            {cell.title}
            {cell.hasSortFunction && (
              <TableSortLabel
                direction={cell.direction}
                active={cell.sortActive}
                IconComponent={() => (
                  <>
                    {cell.direction === "desc" && (
                      <Icon
                        onClick={() => {
                          handleDirection("asc", cell.field);
                        }}
                        sx={{
                          color: "#6B636B",
                          fontSize: "30px",
                          "&:hover": {
                            color: "#3A63DE",
                          },
                        }}
                      >
                        arrow_drop_down
                      </Icon>
                    )}
                    {cell.direction === "asc" && (
                      <Icon
                        sx={{
                          color: "#6B636B",
                          fontSize: "30px",
                          "&:hover": {
                            color: "#3A63DE",
                          },
                        }}
                        onClick={() => {
                          handleDirection("desc", cell.field);
                        }}
                      >
                        arrow_drop_up
                      </Icon>
                    )}
                  </>
                )}
              ></TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
