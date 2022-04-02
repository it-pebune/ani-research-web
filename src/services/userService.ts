import axios from "axios";
import { API_BASE_URL } from "../resources/apiLinks";
import {
  CurrentUser,
  SpecifiedUser,
  SpecifiedUserToUpdate,
  User,
} from "../interfaces/UserInterfaces";

const userService = {
  getUsers: async (tokenStatus: {
    token: string;
    active: boolean;
  }): Promise<User[]> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/users`, config);
        const data = await response.data;
        return data;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  getSpecifiedUser: async (
    tokenStatus: {
      token: string;
      active: boolean;
    },
    id: string | number | undefined
  ): Promise<SpecifiedUser> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      response = await axios.get(`${API_BASE_URL}/users/${id}`, config);

      if (response.status !== 200) {
        throw new Error(response);
      }
      if (response.data.socialInfo != null) {
        response.data.socialInfo = await JSON.parse(response.data.socialInfo);
      }
      return response.data;
    }
    return response;
  },

  getCurrentUser: async (tokenStatus: {
    token: string;
    active: boolean;
  }): Promise<CurrentUser> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/users/me`, config);
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  updateSpecifiedUserData: async (
    tokenStatus: { token: string; active: boolean },
    userData: SpecifiedUserToUpdate
  ): Promise<CurrentUser> => {
    if (!tokenStatus.active) {
      throw new Error("Active token required for updating user.");
    }

    const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      },
      { lastName, firstName, displayName, phone, socialInfo } = userData;

    return (
      await axios.put(
        `${API_BASE_URL}/users`,
        { lastName, firstName, displayName, phone, socialInfo },
        config
      )
    ).data;
  },

  updateSpecifiedUser: async (
    tokenStatus: {
      token: string;
      active: boolean;
    },
    userData: User
  ): Promise<User> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      const { lastName, firstName, displayName, roles, socialInfo, phone } =
        userData;
      try {
        response = await axios.put(
          `${API_BASE_URL}/users/${userData.id}`,
          {
            lastName,
            firstName,
            displayName,
            roles,
            socialInfo,
            phone,
          },
          config
        );
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  updateCurrentUser: async (
    tokenStatus: {
      token: string;
      active: boolean;
    },
    userData: User
  ): Promise<User> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.put(`${API_BASE_URL}/users`, userData, config);
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  deleteSpecifiedUser: async (
    tokenStatus: {
      token: string;
      active: boolean;
    },
    id: number
  ): Promise<User> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.put(
          `${API_BASE_URL}/users/${id}/delete`,
          config
        );
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  deleteCurrentUser: async (
    tokenStatus: {
      token: string;
      active: boolean;
    },
    id: number
  ): Promise<User> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.put(`${API_BASE_URL}/users/delete`, config);
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
  getUsersByRole: async (
    token: string,
    active: boolean,
    role: number
  ): Promise<User[]> => {
    let response: any;
    if (active) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { role },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/users/role`, config);
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  updateUserNotes: async (
    tokenStatus: {
      token: string;
      active: boolean;
    },
    id: number,
    notes: string
  ): Promise<User> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.put(
          `${API_BASE_URL}/users/${id}/notes`,
          { notes },
          config
        );
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
};

export default userService;
