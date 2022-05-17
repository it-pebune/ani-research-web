import axios from "axios";
import {
  AuthUrl,
  RefreshTokenResponse,
  SignUpResponse,
} from "../interfaces/AuthInterfaces";
import { API_BASE_URL, WEB_BASE_URL } from "../resources/apiLinks";

console.log(API_BASE_URL);

const auth = {
  getAuthUrl: async (): Promise<AuthUrl> => {
    let response: any;
    try {
      response = await axios.get(`${API_BASE_URL}/auth/google/auth-url`, {
        params: { redirect_uri: WEB_BASE_URL },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      response = error;
      console.log(error);
    }
    return response;
  },
  signIn: async (code: string | null): Promise<SignUpResponse> => {
    let response: any;
    try {
      response = await axios.get(`${API_BASE_URL}/auth/google/signin`, {
        params: { code, redirect_uri: WEB_BASE_URL },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      response = error;
      console.log(error);
    }
    return response;
  },
  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    let response: any;

    try {
      response = await axios.get(`${API_BASE_URL}/auth/refresh`, {
        params: { token: refreshToken },
      });

      return await response.data;
    } catch (error) {
      response = error;
      console.log(error);
    }

    return response;
  },
  signOutUser: async (tokenStatus: {
    token: string;
    active: boolean;
  }): Promise<any> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/auth/signout`, config);
        const data = await response.data;
        return data;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
};

export default auth;
