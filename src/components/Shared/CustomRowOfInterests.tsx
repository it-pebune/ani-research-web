import { IconButton, Icon, TableRow, Box, TableCell } from "@mui/material";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { FieldData } from "../../interfaces/ReviewPdf";
import CustomTableCellWithFunctions from "./CustomTableCellWithFunctions";

interface Props {
  columnsGrid: string;
  values: FieldData[];
  index: number;
  noOfRows: number | undefined;
  noOfColumns: number;
  onElementSelected: any;
  onHoveredState: any;
  cellActive: boolean;
  tableTouched: boolean;
  onTouched: any;
  onCellActive: any;
  onValueChanged: any;
  onShiftAllLeft: any;
  onShiftAllRight: any;
  onMoveLeft: any;
  onMoveRight: any;
  onMoveUp: any;
  onRowValidate: any;
  onBlur: any;
}

const CustomRowOfInterests: React.FC<Props> = ({
  columnsGrid,
  values,
  index,
  noOfRows,
  noOfColumns,
  onElementSelected,
  onHoveredState,
  cellActive,
  tableTouched,
  onTouched,
  onRowValidate,
  onCellActive,
  onValueChanged,
  onShiftAllLeft,
  onShiftAllRight,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
  onBlur,
}) => {
  const handleSelectElement = (index: number, rowIndex: number) => {
    onElementSelected(index, rowIndex);
  };

  const [valid, setValid] = useState(true);
  const [cellHeights, setCellHeights] = useState(
    [...Array.from(Array(noOfColumns).keys())].map((i) => 20)
  );
  const [rowHeight, setRowHeight] = useState(Math.max(...cellHeights));

  const handleValidate = () => {
    onRowValidate(index);
  };

  const handleRowHeight = (index: number, height: number) => {
    setCellHeights((prevState) =>
      prevState.map((value, idx) => (idx === index ? height : value))
    );
  };

  useEffect(() => {
    setRowHeight(Math.max(...cellHeights));
  }, [cellHeights]);

  useLayoutEffect(() => {
    let validRow = true;
    values.forEach((value) => {
      if (!value.valid) {
        validRow = false;
      }
    });
    setValid(validRow);
  }, [values]);

  return (
    <TableRow
      sx={{
        display: "grid",
        gridTemplateColumns: `50px ${columnsGrid}`,
        "&:hover": {
          background: "#f6f6f6",
        },
        "& .MuiTableCell-root": {
          fontSize: ".8rem",
          px: "0px",
          display: "grid",
          alignContent: "center",
          fontFamily: "'Montserrat',  sans-serif",
        },
        "&MuiInputBase-input": {
          padding: "4px",
        },
        "&.MuiTextField-root": {
          p: "0px",
          fontSize: "10px",
        },
      }}
    >
      <TableCell sx={{ alignSelf: "center", background: "white", py: "30px" }}>
        <IconButton
          style={{
            background: valid ? "green" : "white",
            color: valid ? "white" : "grey",
          }}
          onClick={handleValidate}
        >
          <Icon>done</Icon>
        </IconButton>
      </TableCell>
      {values.map((data, vIndex) => (
        <CustomTableCellWithFunctions
          key={`cell-${index}-${vIndex}`}
          data={data}
          noOfRows={noOfRows}
          noOfColumns={noOfColumns}
          index={vIndex}
          rowIndex={index}
          cellHeight={rowHeight}
          cellActive={cellActive}
          tableTouched={tableTouched}
          onTouched={onTouched}
          onCellActive={onCellActive}
          onElementSelected={handleSelectElement}
          onHoveredState={onHoveredState}
          onValueChanged={onValueChanged}
          onShiftAllLeft={onShiftAllLeft}
          onShiftAllRight={onShiftAllRight}
          onHeightChanged={handleRowHeight}
          onMoveLeft={onMoveLeft}
          onMoveRight={onMoveRight}
          onMoveUp={onMoveUp}
          onBlur={onBlur}
        ></CustomTableCellWithFunctions>
      ))}
    </TableRow>
  );
};

export default CustomRowOfInterests;
