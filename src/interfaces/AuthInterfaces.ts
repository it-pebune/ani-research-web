export interface SignUpResponse {
  token: {
    access: string;
    accessExpiresIn: number;
    refresh: string;
    refreshExpiresIn: number;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
    roles: string[];
    displayName: string;
    email: string;
    sessionId: string;
    profileImageUrl: string;
  };
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  tokenExpAt: number | null;
  refreshTokenExpAt: number | null;
  setToken(token: string | null): void;
  setTokenExpAt(tokenExpAt: number | null): void;
}

export interface AuthUrl {
  authUrl: string;
}
