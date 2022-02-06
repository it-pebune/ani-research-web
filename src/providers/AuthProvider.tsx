import React, { useState, useEffect, useContext } from "react";
import auth from "../services/authService";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SignUpResponse } from "../interfaces/AuthInterfaces";
import SignUp from "../pages/SignUp";
import Terms from "../pages/Terms";
import Gdpr from "../pages/Gdpr";

import AuthContext from "../store/AuthContext";
import UserContext from "../store/UserContext";

interface Props {}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [appData, setAppData] = useState<SignUpResponse | undefined>();
  const [authUrl, setAuthUrl] = useState("");
  const params = new URLSearchParams(document.location.search);
  const googleState = params.get("state");

  useEffect(() => {
    if (!authContext.token && !googleState) {
      const getAuthUrl = async () => {
        const response = await auth.getAuthUrl();
        setAuthUrl(response.authUrl);
      };
      getAuthUrl();
    }
  }, [authContext, googleState]);

  useEffect(() => {
    if (googleState && params.get("code")) {
      const signIn = async () => {
        const response = await auth.signIn(params.get("code"));
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
      {!authContext.token ||
      (authContext.refreshTokenExpAt &&
        new Date().getTime() > authContext.refreshTokenExpAt) ? (
        <Routes>
          <Route path="/terms" element={<Terms></Terms>}></Route>
          <Route path="/gdpr" element={<Gdpr></Gdpr>}></Route>
          <Route path="/" element={<SignUp authUrl={authUrl}></SignUp>}></Route>
        </Routes>
      ) : (
        children
      )}
    </>
  );
};

export default AuthProvider;
