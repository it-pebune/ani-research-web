import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Icon,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import "./UsersFiltersDialog.css";

import { Filters } from "../../interfaces/UserInterfaces";
import CustomDialogHeader from "../Custom/CustomDialogHeader";

interface Props {
  open: boolean;
  onClose: any;
  onFilters: any;
}


const UsersFiltersDialog: React.FC<Props> = ({ open, onClose, onFilters }) => {

  const [filters, setFilters] = useState<Filters>({statusFilters:[], roleFilters:[], lastDateFilter:{logged:null, period:null}});
  const [wereLogged, setWereLogged] =useState<number|null>(null)

  const handleStatuses = (e:any) =>{
    console.log(parseInt(e.target.value));
    const statuses =  filters.statusFilters.includes(parseInt(e.target.value)) ? filters.statusFilters.filter(item=>item!==parseInt(e.target.value)) : [...filters.statusFilters, parseInt(e.target.value)];
    setFilters({...filters, statusFilters: [...statuses]});
  }

  const handleRoles = (e:any) =>{
    const roles = filters.roleFilters.includes(parseInt(e.target.value)) ? filters.roleFilters.filter(item=>item!==parseInt(e.target.value)) : [...filters.roleFilters, parseInt(e.target.value)];
    setFilters({...filters, roleFilters: [...roles]});
  }

  const handleWereLogged = (e:any) =>{
    setWereLogged(parseInt(e.target.value));
    setFilters({...filters, lastDateFilter:{logged:parseInt(e.target.value), period: filters.lastDateFilter.period}});
  }

  const handlePeriod = (e:any) => {
    const loggedSelected = filters.lastDateFilter.logged;
    setWereLogged(!loggedSelected ? 0 : loggedSelected);
    setFilters({...filters, lastDateFilter:{logged: !loggedSelected ? 0 : loggedSelected,  period:parseInt(e.target.value)}});
  }

  const handleClose = () =>{
    onFilters(filters);
    setFilters({statusFilters:[], roleFilters:[], lastDateFilter:{logged:null, period:null}})
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
      <CustomDialogHeader title="Filtreaza utilizatori" icon="tune" onClose={onClose}></CustomDialogHeader>
      <DialogContent>
        <div className="filters-section">
          <h5>filtreaza utilizatori dupa status</h5>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <FormControlLabel
              value = {0}
              onChange={handleStatuses}
              control={<Checkbox />}
              label="in asteptare"
            ></FormControlLabel>
            <FormControlLabel
              value = {1}
              onChange={handleStatuses}
              control={<Checkbox />}
              label="activi"
            ></FormControlLabel>
          </div>
        </div>
        <div className="filters-section">
          <h5>filtreaza utilizatori dupa rol</h5>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <FormControlLabel
              value = {250}
              onChange={handleRoles}
              control={<Checkbox />}
              label="admin"
            ></FormControlLabel>
            <FormControlLabel
              value = {150}
              onChange={handleRoles}
              control={<Checkbox />}
              label="coordinator"
            ></FormControlLabel>
            <FormControlLabel
              value = {70}
              onChange={handleRoles}
              control={<Checkbox />}
              label="reviewer"
            ></FormControlLabel>
            <FormControlLabel
              value = {10}
              onChange={handleRoles}
              control={<Checkbox />}
              label="researcher"
            ></FormControlLabel>
          </div>
        </div>
        <div className="filters-section">
          <h5>filtreaza utilizatori dupa ultima logare</h5>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div className="logged-status-group">
              <FormControlLabel
                control={<Checkbox />}
                label="s-au logat"
                value = {1}
                checked = { wereLogged == 1}
                onChange={handleWereLogged}
              ></FormControlLabel>
              <FormControlLabel
                control={<Checkbox />}
                label="nu s-au logat"
                value = {0}
                checked = { wereLogged == 0 }
                onChange={handleWereLogged}
              ></FormControlLabel>
            </div>

            <FormControl fullWidth>
              <InputLabel>alege perioada</InputLabel>
              <Select defaultValue="" label="alege perioada" onChange={handlePeriod}>
                <MenuItem value={7}>ultima saptamana</MenuItem>
                <MenuItem value={30}>ultima luna</MenuItem>
                <MenuItem value={90}>ultimile 3 luni</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{padding: "16px", borderTop: "1px solid #bdbdbd"}}>
        <Button onClick={()=>handleClose()}>Filtreaza</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersFiltersDialog;
