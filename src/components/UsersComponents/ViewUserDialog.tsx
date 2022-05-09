import React, { useEffect, useState } from "react";
import { SpecifiedUser } from "../../interfaces/UserInterfaces";
import useTokenStatus from "../../utils/useTokenStatus";
import userService from "../../services/userService";
import CustomDialog from "../Shared/CustomDialog";
import { Avatar, Box, Grid, Link, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { makeStyles, styled } from "@mui/styles";
import CustomDialogSection from "../Shared/CustomDialogSection";

interface Props {
  id: number | string | undefined;
  open: boolean;
  onClose: () => void;
}

export const ViewUserDialog: React.FC<Props> = ({ id, open, onClose }) => {
  const tokenStatus = useTokenStatus(),
    [user, setUser] = useState<SpecifiedUser>(),
    classes = makeStyles(() => ({
      socialMediaIcon: {
        "&:hover": {
          color: "blue",
        },
      },
    }))(),
    LabelTypography = styled(Typography)({
      display: "inline-block",
      color: "#818386",
    });

  const loadUser = async (id: number | string | undefined) => {
    setUser(await userService.getSpecifiedUser(tokenStatus, id));
  };

  useEffect(() => {
    if (open) {
      loadUser(id);
    }
  }, [id, open]);

  return (
    <CustomDialog
      title="Vizualizeaza utilizator"
      actionText="modifica"
      icon="tune"
      justifyContent="space-between"
      open={open}
      onClose={onClose}
      onAction={onClose}
    >
      <Grid container direction="column" sx={{ margin: "40px 0" }}>
        <Grid container direction="row" justifyContent="space-around">
          <Grid item container justifyContent="center" xs={12} md={6} lg={4}>
            <Box>
              <Avatar
                variant="rounded"
                sx={{
                  margin: "0 20 px",
                  border: "7px white solid",
                  borderRadius: "50px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
                  height: "150px",
                  width: "150px",
                }}
                src={user?.profileImageUrl}
              />
            </Box>
          </Grid>
          <Grid item container direction="column" xs={12} md={6} lg={6}>
            <Typography variant="h5">{user?.firstName}</Typography>

            <Grid item container direction={"row"} sx={{ marginTop: "10px" }}>
              {user?.socialInfo?.facebook && (
                <Link href={user?.socialInfo?.facebook} target="_blank">
                  <FacebookIcon
                    fontSize="large"
                    className={classes.socialMediaIcon}
                  />
                </Link>
              )}

              {user?.socialInfo?.linkedIn && (
                <Link href={user?.socialInfo.linkedIn} target="_blank">
                  <LinkedInIcon
                    fontSize="large"
                    className={classes.socialMediaIcon}
                  />
                </Link>
              )}
            </Grid>

            <Typography variant="h6">
              <LabelTypography>Email:</LabelTypography> {user?.email}
            </Typography>

            {user?.phone && (
              <Typography variant="h6">
                <LabelTypography>Phone: </LabelTypography> {user?.phone}
              </Typography>
            )}
          </Grid>
        </Grid>

        <CustomDialogSection
          title="note"
          columnsGrid="1fr"
          sx={{ padding: "20px 40px" }}
        >
          <Typography>{user?.notes}</Typography>
        </CustomDialogSection>
      </Grid>
    </CustomDialog>
  );
};
