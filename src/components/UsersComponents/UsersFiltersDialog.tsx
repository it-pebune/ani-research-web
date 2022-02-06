import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
} from "@mui/material";

import { Filters } from "../../interfaces/UserInterfaces";
import CustomDialogSection from "../Shared/CustomDialogSection";
import { Box } from "@mui/system";
import CustomDialog from "../Shared/CustomDialog";

interface Props {
  open: boolean;
  filters: Filters;
  onClose: any;
  onFilters: any;
}

const UsersFiltersDialog: React.FC<Props> = ({
  open,
  onClose,
  onFilters,
  filters,
}) => {
  const [selectedFilters, setFilters] = useState<Filters>(filters);
  const [wereLogged, setWereLogged] = useState<number | null>(null);

  const handleStatuses = (e: any) => {
    const statuses = selectedFilters.statusFilters.includes(
      parseInt(e.target.value)
    )
      ? selectedFilters.statusFilters.filter(
          (item) => item !== parseInt(e.target.value)
        )
      : [...selectedFilters.statusFilters, parseInt(e.target.value)];
    setFilters({ ...selectedFilters, statusFilters: [...statuses] });
  };

  const handleRoles = (e: any) => {
    const roles = selectedFilters.roleFilters.includes(parseInt(e.target.value))
      ? selectedFilters.roleFilters.filter(
          (item) => item !== parseInt(e.target.value)
        )
      : [...selectedFilters.roleFilters, parseInt(e.target.value)];
    setFilters({ ...selectedFilters, roleFilters: [...roles] });
  };

  const handleWereLogged = (e: any) => {
    setWereLogged(parseInt(e.target.value));
    setFilters({
      ...selectedFilters,
      lastDateFilter: {
        logged: parseInt(e.target.value),
        period: selectedFilters.lastDateFilter.period,
      },
    });
  };

  const handlePeriod = (e: any) => {
    const loggedSelected = selectedFilters.lastDateFilter.logged;
    setWereLogged(!loggedSelected ? 0 : loggedSelected);
    setFilters({
      ...selectedFilters,
      lastDateFilter: {
        logged: !loggedSelected ? 0 : loggedSelected,
        period: parseInt(e.target.value),
      },
    });
  };

  const handleActions = () => {
    onFilters(selectedFilters);
  };

  useEffect(() => {
    setFilters(filters);
  }, [filters]);

  return (
    <CustomDialog
      title="Filtreaza utilizatori"
      actionText="filtreaza"
      icon="tune"
      open={open}
      onClose={onClose}
      onAction={handleActions}
    >
      <CustomDialogSection
        title="filtreaza utilizatori dupa status"
        columnsGrid="1fr 1fr 1fr"
      >
        <FormControlLabel
          value={0}
          onChange={handleStatuses}
          checked={selectedFilters.statusFilters.includes(0)}
          control={<Checkbox />}
          label="in asteptare"
        ></FormControlLabel>
        <FormControlLabel
          value={1}
          checked={selectedFilters.statusFilters.includes(1)}
          onChange={handleStatuses}
          control={<Checkbox />}
          label="activi"
        ></FormControlLabel>
      </CustomDialogSection>
      <CustomDialogSection
        title="filtreaza utilizatori dupa rol"
        columnsGrid="1fr 1fr 1fr"
      >
        <FormControlLabel
          value={250}
          checked={selectedFilters.roleFilters.includes(250)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="admin"
        ></FormControlLabel>
        <FormControlLabel
          value={150}
          checked={selectedFilters.roleFilters.includes(150)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="coordinator"
        ></FormControlLabel>
        <FormControlLabel
          value={70}
          onChange={handleRoles}
          checked={selectedFilters.roleFilters.includes(70)}
          control={<Checkbox />}
          label="reviewer"
        ></FormControlLabel>
        <FormControlLabel
          value={10}
          checked={selectedFilters.roleFilters.includes(10)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="researcher"
        ></FormControlLabel>
      </CustomDialogSection>

      <CustomDialogSection
        title="filtreaza utilizatori dupa ultima logare"
        columnsGrid="1fr 1fr"
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={<Radio />}
            label="s-au logat"
            value={1}
            checked={wereLogged === 1}
            onChange={handleWereLogged}
          ></FormControlLabel>
          <FormControlLabel
            control={<Radio />}
            label="nu s-au logat"
            value={0}
            checked={wereLogged === 0}
            onChange={handleWereLogged}
          ></FormControlLabel>
        </Box>

        <FormControl fullWidth>
          <InputLabel>alege perioada</InputLabel>
          <Select
            value={selectedFilters.lastDateFilter.period}
            label="alege perioada"
            onChange={handlePeriod}
          >
            <MenuItem value={7}>ultima saptamana</MenuItem>
            <MenuItem value={30}>ultima luna</MenuItem>
            <MenuItem value={90}>ultimile 3 luni</MenuItem>
          </Select>
        </FormControl>
      </CustomDialogSection>
    </CustomDialog>
  );
};

export default UsersFiltersDialog;
