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
    roles: number[];
    displayName: string;
    email: string;
    sessionId: string;
    profileImageUrl: string;
  };
}

export interface RefreshTokenResponse {
  access: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
}

export interface AuthUrl {
  authUrl: string;
}
