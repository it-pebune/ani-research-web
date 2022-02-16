import { Box, Card } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserProfileBody from "../../components/UserProfileComponents/UserProfileBody";
import UserProfileHeader from "../../components/UserProfileComponents/UserProfileHeader";
import { SpecifiedUser } from "../../interfaces/UserInterfaces";
import userService from "../../services/userService";
import UserContext from "../../store/UserContext";
import useTokenStatus from "../../utils/useTokenStatus";

const UserProfilePage = () => {
  const { id } = useContext(UserContext);
  const [userData, setUserData] = useState<SpecifiedUser>();
  const tokenStatus = useTokenStatus();

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

  if (userData)
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
  else {
    return <Card>Not Found</Card>;
  }
};

export default UserProfilePage;
