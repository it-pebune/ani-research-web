import { Box, Card, CircularProgress, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserProfileBody from "../../components/UserProfileComponents/UserProfileBody";
import UserProfileHeader from "../../components/UserProfileComponents/UserProfileHeader";
import { SpecifiedUser } from "../../interfaces/UserInterfaces";
import userService from "../../services/userService";
import UserContext from "../../store/UserContext";
import useTokenStatus from "../../utils/useTokenStatus";

const UserProfilePage = () => {
  const { id } = useContext(UserContext);
  const tokenStatus = useTokenStatus();

  const [userData, setUserData] = useState<SpecifiedUser>();

  useEffect(() => {
    if (tokenStatus.active) {
      const usersResponse = async () => {
        const response = await userService.getSpecifiedUser(
          { ...tokenStatus },
          id
        );
        setUserData(response);
      };
      usersResponse();
    }
  }, [id, tokenStatus]);

  if (!userData)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
        <CircularProgress />
      </Box>
    );
  else
    return (
      <Box sx={{ padding: "100px 90px" }}>
        <UserProfileHeader
          email={userData.email}
          firstName={userData.firstName}
          lastName={userData.lastName}
          profileImageUrl={userData.profileImageUrl}
          socialInfo={userData.socialInfo}
          phone={userData.phone}
          roles={userData.roles}
        />
        <UserProfileBody notes={userData.notes} />
      </Box>
    );
};

export default UserProfilePage;
