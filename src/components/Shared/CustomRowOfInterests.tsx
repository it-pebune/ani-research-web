import { TableRow } from "@mui/material";
import React, { useState } from "react";
import CustomTableCellWithFunctions from "./CustomTableCellWithFunctions";
import { FieldData } from "../../interfaces/ReviewPdf";

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
  onCellActive,
  onValueChanged,
  onShiftAllLeft,
  onShiftAllRight,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
}) => {
  const handleSelectElement = (index: number, rowIndex: number) => {
    onElementSelected(index, rowIndex);
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
      {values.map((data, vIndex) => (
        <CustomTableCellWithFunctions
          key={`cell-${index}-${vIndex}`}
          data={data}
          noOfRows={noOfRows}
          noOfColumns={noOfColumns}
          index={vIndex}
          rowIndex={index}
          cellActive={cellActive}
          tableTouched={tableTouched}
          onTouched={onTouched}
          onCellActive={onCellActive}
          onElementSelected={handleSelectElement}
          onHoveredState={onHoveredState}
          onValueChanged={onValueChanged}
          onShiftAllLeft={onShiftAllLeft}
          onShiftAllRight={onShiftAllRight}
          onMoveLeft={onMoveLeft}
          onMoveRight={onMoveRight}
          onMoveUp={onMoveUp}
        ></CustomTableCellWithFunctions>
      ))}
    </TableRow>
  );
};

export default CustomRowOfInterests;
