import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import userService from "../../services/userService";
import useTokenStatus from "../../utils/useTokenStatus";
import UserProfileNotFound from "../../components/CurrentUserProfile/UserProfileNotFound";
import CurrentUserProfileHeader from "../../components/CurrentUserProfile/CurrentUserProfileHeader";
import CurrentUserProfileHeaderContent from "../../components/CurrentUserProfile/CurrentUserProfileHeaderContent";
import CurrentUserProfileHeaderEditContent from "../../components/CurrentUserProfile/CurrentUserProfileHeaderEditContent";
import { CurrentUser } from "../../interfaces/UserInterfaces";
import UserContext from "../../store/UserContext";

const CurrentUserProfilePage = () => {
  const tokenStatus = useTokenStatus(),
    userContext = useContext(UserContext);

  const [currentUserData, setCurrentUserData] = useState<CurrentUser>();
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);
  const [fetchDataError, setFetchDataError] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const switchToEditModeHandler = () => {
    setEditMode((previousState) => !previousState);
  };
  const updateCurrentUser = (user: CurrentUser): void => {
    setCurrentUserData(user);

    userContext.setUser(user);
  };

  useEffect(() => {
    if (tokenStatus.active) {
      const usersResponse = async () => {
        setPageIsLoading(true);
        setFetchDataError(false);
        const response = await userService.getCurrentUser({ ...tokenStatus });
        setCurrentUserData(response);
        setPageIsLoading(false);
      };
      usersResponse().catch((error) => {
        setPageIsLoading(false);
        setFetchDataError(true);
      });
    }
  }, []);

  return (
    <Box sx={{ padding: "100px 90px" }}>
      <CurrentUserProfileHeader elevation={0}>
        {pageIsLoading && (
          <Box
            sx={{ display: "flex", justifyContent: "center", paddingTop: 20 }}
          >
            <CircularProgress />
          </Box>
        )}
        {fetchDataError && <UserProfileNotFound />}
        {!editMode && currentUserData && (
          <CurrentUserProfileHeaderContent
            email={currentUserData.email}
            displayName={currentUserData.displayName}
            profileImageUrl={currentUserData.profileImageUrl}
            socialInfo={currentUserData.socialInfo}
            phone={currentUserData.phone}
            roles={currentUserData.roles}
            switchToEditModeHandler={switchToEditModeHandler}
          />
        )}
        {editMode && currentUserData && (
          <CurrentUserProfileHeaderEditContent
            firstName={currentUserData.firstName}
            lastName={currentUserData.lastName}
            displayName={currentUserData.displayName}
            phone={currentUserData.phone}
            socialInfo={currentUserData.socialInfo}
            profileImageUrl={currentUserData.profileImageUrl}
            switchToEditModeHandler={switchToEditModeHandler}
            updateCurrentUser={updateCurrentUser}
          />
        )}
      </CurrentUserProfileHeader>
    </Box>
  );
};

export default CurrentUserProfilePage;
