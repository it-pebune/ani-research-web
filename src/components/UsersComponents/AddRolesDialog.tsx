import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SpecifiedUser } from "../../interfaces/UserInterfaces";
import userService from "../../services/userService";
import useTokenStatus from "../../utils/useTokenStatus";
import CustomDialog from "../Shared/CustomDialog";
import CustomDialogSection from "../Shared/CustomDialogSection";

interface Props {
  open: boolean;
  onClose: any;
  id: string | number | undefined;
  onRoles: any;
}

const AddRolesDialog: React.FC<Props> = ({ open, onClose, id, onRoles }) => {
  const [roles, setRoles] = useState<number[]>([]);
  const [user, setUser] = useState<SpecifiedUser>();
  const tokenStatus = useTokenStatus();

  const currentUser = async () => {
    let response = await userService.getSpecifiedUser(tokenStatus, id);
    setUser(response);
  };

  useEffect(() => {
    if (open) {
      currentUser();
    }
  }, [open]);

  useEffect(() => {
    if (user) {
      setRoles(user.roles);
    }
  }, [user]);

  const handleActions = () => {
    onRoles(user, roles);
    onClose();
  };

  const handleRoles = (e: any) => {
    setRoles((prevValue: number[]) => {
      if (e.target.checked) {
        return [...prevValue, parseInt(e.target.value)];
      } else {
        return [
          ...prevValue.filter((value) => value !== parseInt(e.target.value)),
        ];
      }
    });
  };

  return (
    <CustomDialog
      title="Modifica roluri urilizator"
      actionText="modifica"
      icon="tune"
      open={open}
      onClose={onClose}
      onAction={handleActions}
    >
      <CustomDialogSection
        title="selecteaza roluri"
        columnsGrid="1fr"
        sx={{ padding: "0 100px" }}
      >
        <FormControlLabel
          sx={{ px: "100px" }}
          value={250}
          checked={roles.includes(250)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="admin"
        ></FormControlLabel>
        <FormControlLabel
          sx={{ px: "100px" }}
          value={150}
          checked={roles.includes(150)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="coordinator"
        ></FormControlLabel>
        <FormControlLabel
          sx={{ px: "100px" }}
          value={70}
          onChange={handleRoles}
          checked={roles.includes(70)}
          control={<Checkbox />}
          label="reviewer"
        ></FormControlLabel>
        <FormControlLabel
          sx={{ px: "100px" }}
          value={10}
          checked={roles.includes(10)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="researcher"
        ></FormControlLabel>
      </CustomDialogSection>
    </CustomDialog>
  );
};

export default AddRolesDialog;
