import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserProfileBody from "./UserProfileBody";
import UserProfileHeader from "./UserProfileHeader";
import { SpecifiedUser } from "../../interfaces/UserInterfaces";
import userService from "../../services/userService";
import UserContext from "../../store/UserContext";
import useTokenStatus from "../../utils/useTokenStatus";
import UserProfileNotFound from "../../components/UserProfileHeaderContent/UserProfileNotFound";
import UserProfileDisplay from "../../components/UserProfileHeaderContent/UserProfileDisplay";
import UserProfileEditForm from "../../components/UserProfileHeaderContent/UserProfileEditForm";

const UserProfilePage = () => {
  const { id } = useContext(UserContext);
  const tokenStatus = useTokenStatus();

  const [userData, setUserData] = useState<SpecifiedUser>();
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);
  const [fetchDataError, setFetchDataError] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const switchToEditModeHandler = () => {
    setEditMode((previousState) => !previousState);
  };

  const changeUserDataHandler = () => {
    setEditMode((previousState) => !previousState);
  };

  useEffect(() => {
    if (tokenStatus.active) {
      const usersResponse = async () => {
        setPageIsLoading(true);
        const response = await userService.getSpecifiedUser(
          { ...tokenStatus },
          id
        );
        setUserData(response);
        setPageIsLoading(false);
      };
      usersResponse().catch((error) => {
        setFetchDataError(true);
        setPageIsLoading(false);
      });
    }
  }, []);

  return (
    <Box sx={{ padding: "100px 90px" }}>
      <UserProfileHeader elevation={0}>
        {pageIsLoading && (
          <Box
            sx={{ display: "flex", justifyContent: "center", paddingTop: 20 }}
          >
            <CircularProgress />
          </Box>
        )}
        {fetchDataError && <UserProfileNotFound />}
        {!pageIsLoading && !fetchDataError && !editMode && (
          <UserProfileDisplay
            email={userData!.email}
            displayName={userData!.displayName}
            profileImageUrl={userData!.profileImageUrl}
            socialInfo={userData!.socialInfo}
            phone={userData!.phone}
            roles={userData!.roles}
            switchToEditModeHandler={switchToEditModeHandler}
          />
        )}
        {!pageIsLoading && !fetchDataError && editMode && (
          <UserProfileEditForm
            firstName={userData!.firstName}
            lastName={userData!.lastName}
            displayName={userData!.displayName}
            profileImageUrl={userData!.profileImageUrl}
            socialInfo={userData!.socialInfo}
            phone={userData!.phone}
            roles={userData!.roles}
            switchToEditModeHandler={switchToEditModeHandler}
          />
        )}
      </UserProfileHeader>
      {/* <UserProfileBody notes={userData.notes} /> */}
    </Box>
  );
};

export default UserProfilePage;
