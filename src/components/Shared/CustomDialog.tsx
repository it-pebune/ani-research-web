import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import CustomDialogHeader from "./CustomDialogHeader";

interface Props {
  title: string;
  actionText: string;
  icon: string;
  children: JSX.Element[] | JSX.Element;
  open: boolean;
  onClose: any;
  onAction: any;
}

const CustomDialog: React.FC<Props> = ({
  children,
  title,
  icon,
  actionText,
  open,
  onClose,
  onAction,
}) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "600px",
        },
      }}
      onClose={onClose}
      open={open}
    >
      <CustomDialogHeader
        title={title}
        icon={icon}
        onClose={onClose}
      ></CustomDialogHeader>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "450px",
          justifyContent: "space-around",
        }}
      >
        {children}
      </DialogContent>

      <DialogActions sx={{ padding: "16px", borderTop: "1px solid #bdbdbd" }}>
        <Button onClick={() => onAction()}>{actionText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
