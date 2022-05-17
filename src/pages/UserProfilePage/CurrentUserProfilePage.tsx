import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CurrentUserProfileHeader from "../../components/CurrentUserProfile/CurrentUserProfileHeader";
import CurrentUserProfileHeaderContent from "../../components/CurrentUserProfile/CurrentUserProfileHeaderContent";
import CurrentUserProfileHeaderEditContent from "../../components/CurrentUserProfile/CurrentUserProfileHeaderEditContent";
import UserProfileNotFound from "../../components/CurrentUserProfile/UserProfileNotFound";
import Loader from "../../components/Shared/Loader";
import { CurrentUser } from "../../interfaces/UserInterfaces";
import userService from "../../services/userService";
import UserContext from "../../store/UserContext";
import useTokenStatus from "../../utils/useTokenStatus";

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

      usersResponse().catch(() => {
        setPageIsLoading(false);
        setFetchDataError(true);
      });
    }
  }, []);

  return (
    <Box sx={{ padding: "100px 90px" }}>
      <CurrentUserProfileHeader elevation={0}>
        {pageIsLoading && <Loader />}

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
