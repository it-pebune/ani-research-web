import {
  Icon,
  IconButton,
  TableCell,
  TextareaAutosize,
  TextareaAutosizeProps,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { FieldData } from "../../interfaces/ReviewPdf";
import { styled } from "@mui/material/styles";

interface Props {
  data: FieldData;
  index: number;
  rowIndex: number;
  noOfColumns: number;
  noOfRows: number | undefined;
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

interface StyledTextareaAutosizeProps extends TextareaAutosizeProps {
  validated?: boolean;
  touched?: boolean;
  unTouched?: boolean;
}

const StyledTextareaAutosize = styled(TextareaAutosize, {
  shouldForwardProp: (prop) =>
    prop !== "validated" && prop !== "touched" && prop !== "unTouched",
})<StyledTextareaAutosizeProps>(({ validated, touched, unTouched }) => ({
  ...(validated && {
    color: "green",
  }),
  ...(touched && {
    color: "orange",
  }),
  ...(unTouched && {
    color: "red",
  }),
}));

const CustomTableCellWithFunctions: React.FC<Props> = ({
  data,
  index,
  rowIndex,
  noOfColumns,
  noOfRows,
  onElementSelected,
  cellActive,
  tableTouched,
  onHoveredState,
  onTouched,
  onCellActive,
  onValueChanged,
  onShiftAllLeft,
  onShiftAllRight,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
}) => {
  const textField = useRef<HTMLTextAreaElement | null>(null);
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [myValue, setValue] = useState("");

  const handleEnter = () => {
    if (!cellActive) {
      onHoveredState(index, rowIndex, true);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    if (textField.current) {
      setSelectionStart(textField.current.selectionStart);
      setTimeout(() => {
        textField.current?.focus();
      }, 20);
    }
    onCellActive(index, rowIndex, true);
  };

  const handleTextChange = () => {
    if (textField.current) {
      onValueChanged(index, rowIndex, textField.current.value);
      setSelectionStart(textField.current.selectionStart);
    }
  };

  const handleShiftAllLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onShiftAllLeft(index, rowIndex);
  };

  const handleShiftAllRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onShiftAllRight(index, rowIndex);
  };

  const handleMoveLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onMoveLeft(index, rowIndex);
  };

  const handleMoveRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onMoveRight(index, rowIndex);
  };

  const handleMoveUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onMoveUp(index, rowIndex);
  };

  useEffect(() => {
    if (data.active) {
      if (textField.current) {
        textField.current.selectionStart = selectionStart;
      }
    }
  }, [data]);

  return (
    <TableCell
      sx={{
        position: "relative",
        py: "30px",
        borderRight: "1px solid #",
        "& .MuiIconButton-root": {
          fontSize: ".8rem",
          display: "grid",
          alignContent: "center",
          fontFamily: "'Montserrat',  sans-serif",
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        },
      }}
      align="center"
      key={`cell-${index}`}
      onClick={handleClick}
      onMouseEnter={handleEnter}
    >
      {(data.hovered || data.active) && rowIndex !== 0 && (
        <IconButton
          sx={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={handleMoveUp}
          color="primary"
        >
          <Icon>expand_less</Icon>
        </IconButton>
      )}
      {(data.hovered || data.active) && (
        <IconButton
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            transform: "translate(-25%, -25%)",
          }}
          disabled={rowIndex === 0 && index === 0}
          color="primary"
          onClick={handleMoveLeft}
        >
          <Icon>chevron_left</Icon>
        </IconButton>
      )}
      {(data.hovered || data.active) && (
        <IconButton
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            transform: "translate(25%, -25%)",
          }}
          disabled={
            noOfRows
              ? rowIndex === noOfRows - 1 && index === noOfColumns - 1
              : false
          }
          color="primary"
          onClick={handleMoveRight}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      )}
      {(data.hovered || data.active) && (
        <IconButton
          sx={{
            position: "absolute",
            bottom: "0",
            left: "0",
            transform: "translate(-25%, 25%)",
          }}
          color="error"
          disabled={rowIndex === 0 && index === 0}
          onClick={handleShiftAllLeft}
        >
          <Icon>keyboard_double_arrow_left</Icon>
        </IconButton>
      )}
      {(data.hovered || data.active) && (
        <IconButton
          sx={{
            position: "absolute",
            bottom: "0",
            right: "0",
            transform: "translate(25%, 25%)",
          }}
          disabled={
            noOfRows
              ? rowIndex === noOfRows - 1 && index === noOfColumns - 1
              : false
          }
          onClick={handleShiftAllRight}
          color="error"
        >
          <Icon>keyboard_double_arrow_right</Icon>
        </IconButton>
      )}
      {(data.hovered || data.active) && (
        <IconButton
          sx={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translate(-50%, 50%)",
          }}
          color="success"
        >
          <Icon>list</Icon>
        </IconButton>
      )}
      <StyledTextareaAutosize
        ref={textField}
        style={{
          display: "grid",
          border: "1px solid rgba(0, 0, 0, .01)",
          cursor: "pointer",
          textAlign: "center",
        }}
        touched={data.valid === 2}
        validated={data.valid === 1}
        unTouched={data.valid === 0}
        value={data.value}
        onChange={handleTextChange}
      ></StyledTextareaAutosize>
    </TableCell>
  );
};

export default CustomTableCellWithFunctions;
