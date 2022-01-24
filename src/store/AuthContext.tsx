import { createContext } from "react";
import useLocalStorage from "../utils/useLocalStorage";

interface AuthContextI{
    token: any,
    refreshToken: any,
    tokenExpAt: any,
    refreshTokenExpAt: any,
    setToken:any,
    setRefreshToken: any,
    setTokenExpAt: any,
    setRefreshTokenExpAt: any
}

const AuthContext = createContext<AuthContextI>({
  token: "",
  refreshToken: "",
  tokenExpAt: 0,
  refreshTokenExpAt: 0,
  setToken: (token: string) => {},
  setRefreshToken: (refershToken: string) => {},
  setTokenExpAt: (tokenExpAt: number) => {},
  setRefreshTokenExpAt: (tokenExpAt: number) => {},
});

export function AuthContextProvider(props: any) {
  const [token, setToken] = useLocalStorage("token");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");
  const [tokenExpAt, setTokenExpAt] = useLocalStorage("tokenExpAt");
  const [refreshTokenExpAt, setRefreshTokenExpAt] = useLocalStorage(
    "refreshTokenExpAt"
  );

  const setTokenHandler = (value: string) => {
    setToken(value);
  };

  const setRefreshTokenHandler = (value: string) => {
    setRefreshToken(value);
  };

  const setTokenExpiresAtHandler = (value: number) => {
    setTokenExpAt(value);
  };

  const setRefreshTokenExpAtHandler = (value: number) => {
    setRefreshTokenExpAt(value);
  };

  const context : AuthContextI = {
    token,
    refreshToken,
    tokenExpAt,
    refreshTokenExpAt,
    setToken: setTokenHandler,
    setRefreshToken: setRefreshTokenHandler,
    setTokenExpAt: setTokenExpiresAtHandler,
    setRefreshTokenExpAt: setRefreshTokenExpAtHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
