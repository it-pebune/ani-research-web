import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import "./UsersFiltersDialog.css";

import { User } from "../../interfaces/UserInterfaces";
import CustomDialogHeader from "../Custom/CustomDialogHeader";

interface Props {
  open: boolean;
  onClose: any;
  user: User
}


const AddUserRolesDialog: React.FC<Props> = ({ open, onClose, user }) => {

    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const handleRoles = () => {

    }

    const updateRoles = () => {

    }

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
      <CustomDialogHeader title="Adauga roluri utilizator" icon="manage_accounts" onClose={onClose}></CustomDialogHeader>
      <DialogContent>
        
        <div className="filters-section">
          <h5>selecteaza roluri utilizator</h5>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <FormControlLabel
              value = {250}
              checked={selectedRoles.includes(250)}
              onChange={handleRoles}
              control={<Checkbox />}
              label="admin"
            ></FormControlLabel>
            <FormControlLabel
              value = {150}
              checked={selectedRoles.includes(150)}
              onChange={handleRoles}
              control={<Checkbox />}
              label="coordinator"
            ></FormControlLabel>
            <FormControlLabel
              value = {70}
              onChange={handleRoles}
              checked={selectedRoles.includes(70)}
              control={<Checkbox />}
              label="reviewer"
            ></FormControlLabel>
            <FormControlLabel
              value = {10}
              checked={selectedRoles.includes(10)}
              onChange={handleRoles}
              control={<Checkbox />}
              label="researcher"
            ></FormControlLabel>
          </div>
        </div>
        
      </DialogContent>
      <DialogActions sx={{padding: "16px", borderTop: "1px solid #bdbdbd"}}>
        <Button onClick={()=>updateRoles()}>Filtreaza</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserRolesDialog;
