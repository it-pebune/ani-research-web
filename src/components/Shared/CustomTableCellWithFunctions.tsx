import {
  Icon,
  IconButton,
  TableCell,
  TextareaAutosize,
  TextareaAutosizeProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { FieldData } from "../../interfaces/ReviewPdf";

interface Props {
  data: FieldData;
  index: number;
  rowIndex: number;
  cellHeight: number;
  noOfColumns: number;
  noOfRows: number | undefined;
  onHoveredState: any;
  cellActive: boolean;
  tableTouched: boolean;
  onTouched: any;
  onCellActive: any;
  onValueChanged: any;
  onShiftAllLeft: any;
  onShiftAllRight: any;
  onHeightChanged: any;
  onElementSelected: any;
  onMoveLeft: any;
  onMoveRight: any;
  onMoveUp: any;
  onBlur: any;
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
  cellHeight,
  cellActive,
  onHeightChanged,
  onElementSelected,
  onHoveredState,
  onTouched,
  onCellActive,
  onValueChanged,
  onShiftAllLeft,
  onShiftAllRight,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
  onBlur,
}) => {
  const textField = useRef<HTMLTextAreaElement | null>(null);
  const [myValue, setValue] = useState("");
  const [height, setHeight] = useState(`${cellHeight}px`);
  const handleEnter = () => {
    if (!cellActive) {
      onHoveredState(index, rowIndex, true);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    if (textField.current) {
      setTimeout(() => {
        textField.current?.focus();
      }, 20);
    }
    onCellActive(index, rowIndex, true);
  };

  const handleTouched = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    onTouched(index, rowIndex);
  };

  const handleTextChange = () => {
    if (textField.current) {
      onValueChanged(index, rowIndex, textField.current.value);
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

  const handleBlur = (): void => {
    onBlur(index, rowIndex, textField.current?.value ?? "");
  };

  useEffect(() => {
    if (data.value) {
      onHeightChanged(index, textField.current?.scrollHeight);
    }
  }, [data.value]);

  useEffect(() => {
    if (index === 0 && rowIndex === 0) {
      // console.log(data);
    }
  }, [rowIndex]);

  useEffect(() => {
    setHeight(cellHeight + "px");
    onHeightChanged(index, textField.current?.scrollHeight);
  }, [cellHeight]);

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
      {(data.hovered || data.active) && !data.valid && rowIndex !== 0 && (
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
      {(data.hovered || data.active) && !data.valid && (
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
      {(data.hovered || data.active) && !data.valid && (
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
      {(data.hovered || data.active) && !data.valid && (
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
      {(data.hovered || data.active) && !data.valid && (
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
      {(data.hovered || data.active) && !data.valid && (
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
      <textarea
        ref={textField}
        style={{
          width: "100%",
          display: "grid",
          border: "1px solid rgba(0, 0, 0, .01)",
          cursor: "pointer",
          textAlign: "center",
          color: data.valid ? "green" : data.touched ? "orange" : "red",
          height: height,
        }}
        value={data.value ?? ""}
        onFocus={handleTouched}
        onChange={handleTextChange}
        onBlur={handleBlur}
      />
    </TableCell>
  );
};

export default CustomTableCellWithFunctions;
