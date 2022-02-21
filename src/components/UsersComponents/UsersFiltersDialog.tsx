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
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  useEffect(() => {
    setFilters(filters);
  }, [filters]);

  return (
    <CustomDialog
      title={t("UsersFiltersDialog.FilterUsers")} //Filtreaza utilizatori
      actionText={t("UsersFiltersDialog.Filter")} //filtreaza
      icon="tune"
      open={open}
      onClose={onClose}
      onAction={handleActions}
    >
      <CustomDialogSection
        title={t("UsersFiltersDialog.FilterByStatus")} //filtreaza utilizatori dupa status
        columnsGrid="1fr 1fr 1fr"
      >
        <FormControlLabel
          value={0}
          onChange={handleStatuses}
          checked={selectedFilters.statusFilters.includes(0)}
          control={<Checkbox />}
          label={t("UserStatus.Pending")} //"in asteptare" //{t("UserStatus.Pending")}
        ></FormControlLabel>
        <FormControlLabel
          value={1}
          checked={selectedFilters.statusFilters.includes(1)}
          onChange={handleStatuses}
          control={<Checkbox />}
          label="activi" //{t("UserStatus.Active")} //activi
        ></FormControlLabel>
      </CustomDialogSection>
      <CustomDialogSection
        title={t("UsersFiltersDialog.FilterByRole")} //filtreaza utilizatori dupa rol
        columnsGrid="1fr 1fr 1fr"
      >
        <FormControlLabel
          value={250}
          checked={selectedFilters.roleFilters.includes(250)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="admin" //{t("UserRoles.Admin")} //admin
        ></FormControlLabel>
        <FormControlLabel
          value={150}
          checked={selectedFilters.roleFilters.includes(150)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="coordinator" //{t("UserRoles.Coordinator")} //coordinator
        ></FormControlLabel>
        <FormControlLabel
          value={70}
          onChange={handleRoles}
          checked={selectedFilters.roleFilters.includes(70)}
          control={<Checkbox />}
          label="reviewer" //{t("UserRoles.Reviewer")} //reviewer
        ></FormControlLabel>
        <FormControlLabel
          value={10}
          checked={selectedFilters.roleFilters.includes(10)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="researcher" //{t("UserRoles.Researcher")} //researcher
        ></FormControlLabel>
      </CustomDialogSection>

      <CustomDialogSection
        title={t("UsersFiltersDialog.FilterByLastLogIn")} //"filtreaza utilizatori dupa ultima logare"
        columnsGrid="1fr 1fr"
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={<Radio />}
            label="s-au logat" //{t("UsersFiltersDialog.HaveLoggedIn")} //s-au logat
            value={1}
            checked={wereLogged === 1}
            onChange={handleWereLogged}
          ></FormControlLabel>
          <FormControlLabel
            control={<Radio />}
            label="nu s-au logat" //{t("UsersFiltersDialog.NeverLoggedIn")} //nu s-au logat
            value={0}
            checked={wereLogged === 0}
            onChange={handleWereLogged}
          ></FormControlLabel>
        </Box>

        <FormControl fullWidth>
          <InputLabel>{t("UsersFiltersDialog.ChoosePeriod")}</InputLabel>
          <Select
            value={selectedFilters.lastDateFilter.period}
            label={t("UsersFiltersDialog.ChoosePeriod")} //"alege perioada"
            onChange={handlePeriod}
          >
            <MenuItem value={7}>{t("UsersFiltersDialog.LastWeek")}</MenuItem>
            <MenuItem value={30}>{t("UsersFiltersDialog.LastMonth")}</MenuItem>
            <MenuItem value={90}>
              {t("UsersFiltersDialog.Last3Months")}
            </MenuItem>
          </Select>
        </FormControl>
      </CustomDialogSection>
    </CustomDialog>
  );
};

export default UsersFiltersDialog;
