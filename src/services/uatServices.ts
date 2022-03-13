import axios from "axios";
import {
  UatsResponse,
  CountiesResponse,
  County,
  Uat,
} from "../interfaces/UatInterfaces";
import { API_BASE_URL } from "../resources/apiLinks";

export const uatsServices = {
  getCounties: async (reqData: {
    token: string;
    active: boolean;
  }): Promise<County[]> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/uat/counties`, config);
        const data = await response.data;
        return data;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
  getUats: async (reqData: {
    token: string;
    active: boolean;
  }): Promise<Uat[]> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/uat/uats`, config);
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
