import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDialog from "../Shared/CustomDialog";
import CustomDialogSection from "../Shared/CustomDialogSection";
import userService from "../../services/userService";
import useTokenStatus from "../../utils/useTokenStatus";

interface Props {
  open: boolean;
  onClose: any;
  id: string | number | undefined;
  onRoles: any;
}

const AddRolesDialog: React.FC<Props> = ({ open, onClose, id, onRoles }) => {
  const [roles, setRoles] = useState<number[]>([]);
  const tokenStatus = useTokenStatus();

  useEffect(() => {
    if (open) {
    }
  }, [open]);

  const handleActions = () => {};

  const handleRoles = (e: any) => {
    setRoles((prevValue: number[]) => [...prevValue, e.target.value]);
  };

  useEffect(() => {
    console.log(roles);
    onRoles(id, roles);
  }, [roles]);
  return (
    <CustomDialog
      title="Modifica roluri urilizator"
      actionText="modifica"
      icon="tune"
      open={open}
      onClose={onClose}
      onAction={handleActions}
    >
      <CustomDialogSection title="selecteaza roluri" columnsGrid="1fr 1fr 1fr">
        <FormControlLabel
          value={250}
          checked={roles.includes(250)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="admin"
        ></FormControlLabel>
        <FormControlLabel
          value={150}
          checked={roles.includes(150)}
          onChange={handleRoles}
          control={<Checkbox />}
          label="coordinator"
        ></FormControlLabel>
        <FormControlLabel
          value={70}
          onChange={handleRoles}
          checked={roles.includes(70)}
          control={<Checkbox />}
          label="reviewer"
        ></FormControlLabel>
        <FormControlLabel
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
