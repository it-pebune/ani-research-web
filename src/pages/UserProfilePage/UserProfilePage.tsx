import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserProfileBody from "./UserProfileBody";
import UserProfileHeader from "./UserProfileHeader";
import { SpecifiedUser } from "../../interfaces/UserInterfaces";
import userService from "../../services/userService";
import UserContext from "../../store/UserContext";
import useTokenStatus from "../../utils/useTokenStatus";

const UserProfilePage = () => {
  const { id } = useContext(UserContext);
  const tokenStatus = useTokenStatus();

  const [userData, setUserData] = useState<SpecifiedUser>();
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);
  const [fetchDataError, setFetchDataError] = useState<boolean>(false);

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
      <UserProfileHeader
        userData={userData}
        pageIsLoading={pageIsLoading}
        fetchDataError={fetchDataError}
      />
      {/* <UserProfileBody notes={userData.notes} /> */}
    </Box>
  );
};

export default UserProfilePage;
