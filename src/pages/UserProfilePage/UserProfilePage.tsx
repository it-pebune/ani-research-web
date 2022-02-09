import { Box } from "@mui/material";
import { useContext } from "react";
import UserProfileHeader from "../../components/UserProfileComponents/UserProfileHeader";
import UserContext from "../../store/UserContext";

const UserProfilePage = () => {
  const userContext = useContext(UserContext);

  return (
    <Box sx={{ padding: "100px 90px" }}>
      <UserProfileHeader
        firstName={userContext.firstName}
        lastName={userContext.lastName}
        roles={userContext.roles}
        email={userContext.email}
        profileImageUrl={userContext.profileImageUrl}
      />
    </Box>
  );
};

export default UserProfilePage;
