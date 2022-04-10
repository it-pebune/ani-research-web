import React, { useState, useEffect, useContext } from "react";
import auth from "../services/authService";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SignUpResponse } from "../interfaces/AuthInterfaces";
import SignUp from "../pages/SignUp";
import Terms from "../pages/Terms";
import Gdpr from "../pages/Gdpr";
import AuthContext from "../store/AuthContext";
import UserContext from "../store/UserContext";
import Loader from "../components/Shared/Loader";

const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [pageIsLoading, setPageIsLoading] = useState(false);
  const [authUrl, setAuthUrl] = useState("");
  const [appData, setAppData] = useState<SignUpResponse | undefined>();
  const params = new URLSearchParams(document.location.search);
  const googleState = params.get("state");

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
          navigate("/");
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
