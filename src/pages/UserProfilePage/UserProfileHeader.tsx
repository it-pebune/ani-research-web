import { Box, CircularProgress, Paper } from "@mui/material";

import { SpecifiedUser } from "../../interfaces/UserInterfaces";
import UserProfileNotFound from "../../components/UserProfileHeaderContent/UserProfileNotFound";
import UserProfileEditForm from "../../components/UserProfileHeaderContent/UserProfileEditForm";
import UserProfileDisplay from "../../components/UserProfileHeaderContent/UserProfileDisplay";
import { useState } from "react";

interface UserProfileHeaderProps {
  userData: SpecifiedUser | undefined;
  pageIsLoading: boolean;
  fetchDataError: boolean;
}

const UserProfileHeader = (props: UserProfileHeaderProps) => {
  const { userData, pageIsLoading, fetchDataError } = props;

  const [editMode, setEditMode] = useState<boolean>(false);

  const switchToEditModeHandler = () => {
    setEditMode((previousState) => !previousState);
  };

  if (pageIsLoading) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: 0,
          boxShadow: "-4px 10px 40px rgba(44, 63, 88, 0.05)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }
  if (fetchDataError) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: 0,
          boxShadow: "-4px 10px 40px rgba(44, 63, 88, 0.05)",
        }}
      >
        <UserProfileNotFound />
      </Paper>
    );
  }
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        boxShadow: "-4px 10px 40px rgba(44, 63, 88, 0.05)",
      }}
    >
      {!editMode ? (
        <UserProfileDisplay
          email={userData!.email}
          displayName={userData!.displayName}
          profileImageUrl={userData!.profileImageUrl}
          socialInfo={userData!.socialInfo}
          phone={userData!.phone}
          roles={userData!.roles}
          switchToEditModeHandler={switchToEditModeHandler}
        />
      ) : (
        <UserProfileEditForm
          displayName={userData!.displayName}
          profileImageUrl={userData!.profileImageUrl}
          socialInfo={userData!.socialInfo}
          phone={userData!.phone}
          switchToEditModeHandler={switchToEditModeHandler}
        />
      )}
    </Paper>
  );
};

export default UserProfileHeader;
