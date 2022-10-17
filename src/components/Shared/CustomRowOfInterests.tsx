import { IconButton, Icon, TableRow, Box, TableCell } from "@mui/material";
import { useEffect } from "@storybook/addons";
import React, { useLayoutEffect, useState } from "react";
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

  const handleValidate = () => {
    onRowValidate(index);
  };

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
        <Box>
          <IconButton
            style={{
              background: valid ? "green" : "white",
              color: valid ? "white" : "grey",
            }}
            onClick={handleValidate}
          >
            <Icon>done</Icon>
          </IconButton>
        </Box>
      </TableCell>

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
          onBlur={onBlur}
        ></CustomTableCellWithFunctions>
      ))}
    </TableRow>
  );
};

export default CustomRowOfInterests;
