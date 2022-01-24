import axios from "axios";
import { API_BASE_URL } from "../resources/apiLinks";
import { User } from "../interfaces/UserInterfaces";

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

    
  getSpecifiedUser: async(tokenStatus: {
    token: string;
    active: boolean;
  }, id: number): Promise<User> => {
    let response: any;
    if(tokenStatus.active){
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/users/${id}` , config);
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  getCurrentUser: async(tokenStatus: {
    token: string;
    active: boolean;
  }): Promise<User> => {
    let response: any;
    if(tokenStatus.active){
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


  updateSpecifiedUser: async(tokenStatus: {
    token: string;
    active: boolean;
  }, userData: User): Promise<User> => {
    let response: any;
    if(tokenStatus.active){
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.put(`${API_BASE_URL}/users/${userData.id}`,userData , config);
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  updateCurrentUser: async(tokenStatus: {
    token: string;
    active: boolean;
  }, userData: User): Promise<User> => {
    let response: any;
    if(tokenStatus.active){
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.put(`${API_BASE_URL}/users`,userData , config);
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },


  deleteSpecifiedUser: async(tokenStatus: {
    token: string;
    active: boolean;
  }, id: number): Promise<User> => {
    let response: any;
    if(tokenStatus.active){
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.put(`${API_BASE_URL}/users/${id}/delete` , config);
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  deleteCurrentUser: async(tokenStatus: {
    token: string;
    active: boolean;
  }, id: number): Promise<User> => {
    let response: any;
    if(tokenStatus.active){
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.put(`${API_BASE_URL}/users/delete` , config);
        const resData = await response.data;
        return resData;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  updateUserNotes: async(tokenStatus: {
    token: string;
    active: boolean;
  },id:number, notes: string): Promise<User> => {
    let response: any;
    if(tokenStatus.active){
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.put(`${API_BASE_URL}/users/${id}/notes`, {notes} , config);
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
