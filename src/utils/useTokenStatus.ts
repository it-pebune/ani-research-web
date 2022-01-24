import auth from "../services/authService";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/AuthContext";

const useTokenStatus = () => {
  const authContext = useContext(AuthContext);
  const [result, setResult] = useState({
    token: authContext.token,
    active: true,
  });
  useEffect(() => {
    const checkTokenStatus = async () => {
      if (
        authContext.refreshTokenExpAt &&
        new Date().getTime() < authContext.refreshTokenExpAt
      ) {
        if (
          authContext.tokenExpAt &&
          new Date().getTime() < authContext.tokenExpAt
        ) {
          setResult({
            token: authContext.token,
            active: true,
          });
        } else {
          let response: any;
          try {
            response = await auth.refreshToken(authContext.refreshToken);
            const data = await response.data;
            console.log(data);
            authContext.setToken(data.token.access);
            authContext.setTokenExpAt(
              new Date().getTime() + data.token.TokenExpAt * 1000
            );
            setResult({
              token: authContext.token,
              active: true,
            });
          } catch (error) {
            response = error;
            console.log(error);
          }
          return response;
        }
      } else {
        authContext.setToken("");
        authContext.setRefreshToken("");
        authContext.setRefreshTokenExpAt(0);
        authContext.setTokenExpAt(0);
        setResult({
          token:"",
          active: false,
        });
      }
    }

    if(authContext.token){
      checkTokenStatus()
    }
  }, [authContext]);
  return result;
};

export default useTokenStatus;
