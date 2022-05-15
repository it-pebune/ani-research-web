import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SpecifiedUser } from "../../interfaces/UserInterfaces";
import useTokenStatus from "../../utils/useTokenStatus";
import userService from "../../services/userService";
import { Box } from "@mui/material";
import UserProfileHeader from "../../components/UserProfile/UserProfileHeader";
import Loader from "../../components/Shared/Loader";
import UserProfileHeaderContent from "../../components/UserProfile/UserProfileHeaderContent";

const UserProfilePage: React.FC = () => {
  const tokenStatus = useTokenStatus(),
    id: number = useParams().id as unknown as number,
    [user, setUser] = useState<SpecifiedUser>();

  useEffect(() => {
    const loadUser = async () => {
      setUser(await userService.getSpecifiedUser(tokenStatus, id));
    };

    loadUser();
  }, [id]);

  return (
    <Box sx={{ padding: "100px 90px" }}>
      <UserProfileHeader elevation={0}>
        {!user && <Loader />}

        {user && (
          <UserProfileHeaderContent
            email={user.email}
            displayName={user.displayName}
            profileImageUrl={user.profileImageUrl}
            socialInfo={user.socialInfo}
            phone={user.phone}
            roles={user.roles}
          />
        )}
      </UserProfileHeader>
    </Box>
  );
};

export default UserProfilePage;
