import { Avatar, Icon } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import UserContext from "../store/UserContext";
import LanguageSelector from "./LanguageSelector";

import "./DashHeader.css";

const DashHeader = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const handlePurgeUser = () => {
    authContext.setToken("");
    authContext.setRefreshToken("");
    authContext.setTokenExpAt(0);
    authContext.setRefreshTokenExpAt(0);
    userContext.setUser({
      id: undefined,
      roles: [],
      displayName: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      profileImageUrl: undefined,
    });
    navigate("/");
  };

  return (
    <div className="header-wrapper">
      <Link to={"/profile"}>
        <Avatar
          alt={userContext.displayName}
          src={userContext.profileImageUrl}
        />
      </Link>
      <p>{userContext.displayName}</p>
      <p>{userContext.email}</p>
      <LanguageSelector></LanguageSelector>
      <Icon
        sx={{ fontSize: 16 }}
        className="logout-icon"
        onClick={handlePurgeUser}
      >
        logout
      </Icon>
    </div>
  );
};

export default DashHeader;
