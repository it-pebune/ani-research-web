import { DialogTitle, Icon, IconButton } from '@mui/material';
import React from 'react';

interface Props{
    icon: string,
    title: string,
    onClose: any
}

const  CustomDialogHeader: React.FC<Props> = ({icon, title, onClose}) => {
  return   <DialogTitle
  sx={{
    color: "#6B636B",
    fontSize: "17px",
    borderBottom: "1px solid #bdbdbd",
  }}
>
  <Icon sx={{ fontSize: "16px", marginRight: "16px" }}>{icon}</Icon>
  {title}
  <IconButton
    sx={{ position: "absolute", right: "8px", top: "8px" }}
    onClick={onClose}
  >
    <Icon>close</Icon>
  </IconButton>
</DialogTitle>;
}

export default CustomDialogHeader;
