import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import { UserRoles } from "../enums/UsersEnums";
import { SignUpResponse } from "../interfaces/AuthInterfaces";
import Gdpr from "../pages/Gdpr";
import SignUp from "../pages/SignUp";
import Terms from "../pages/Terms";
import auth from "../services/authService";
import AuthContext from "../store/AuthContext";
import UserContext from "../store/UserContext";

interface Props {
  children?: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [pageIsLoading, setPageIsLoading] = useState(false);
  const [authUrl, setAuthUrl] = useState("");
  const [appData, setAppData] = useState<SignUpResponse | undefined>();
  const params = new URLSearchParams(document.location.search);
  const googleState = params.get("state");

  const getLandingPageAfterLogin = (response: SignUpResponse): string => {
    const roles: number[] = response.user.roles;

    switch (true) {
      case roles.includes(UserRoles.RESEARCHER):
        return "/assigned-subjects";

      case roles.includes(UserRoles.COORDINATOR):
        return "/subjects";

      case roles.includes(UserRoles.ADMIN):
        return "/users";

      default:
        return "/";
    }
  };

  useEffect(() => {
    if (!authContext.hasValidToken() && !googleState) {
      const getAuthUrl = async () => {
        setPageIsLoading(true);

        const response = await auth.getAuthUrl();

        setPageIsLoading(false);
        setAuthUrl(response.authUrl);
        navigate("/");
      };

      getAuthUrl();
    }
  }, [authContext, googleState]);

  useEffect(() => {
    if (googleState && params.get("code")) {
      const signIn = async () => {
        setPageIsLoading(true);

        const response = await auth.signIn(params.get("code"));

        setPageIsLoading(false);

        if (response) {
          setAppData(response);
          navigate(getLandingPageAfterLogin(response));
        }
      };

      signIn();
    }
  }, [googleState]);

  useEffect(() => {
    if (appData?.token) {
      authContext.setToken(appData.token.access);
      authContext.setRefreshToken(appData.token.refresh);
      authContext.setTokenExpAt(
        new Date().getTime() + appData.token.accessExpiresIn * 1000
      );
      authContext.setRefreshTokenExpAt(
        new Date().getTime() + appData.token.refreshExpiresIn * 1000
      );
    }

    if (appData?.user) {
      userContext.setUser(appData.user);
    }
  }, [appData]);

  return (
    <>
      {pageIsLoading ? (
        <Loader />
      ) : !authContext.hasValidToken() ? (
        <Routes>
          <Route path="/terms" element={<Terms />} />
          <Route path="/gdpr" element={<Gdpr />} />
          <Route path="/" element={<SignUp authUrl={authUrl} />} />
        </Routes>
      ) : (
        children
      )}
    </>
  );
};

export default AuthProvider;
