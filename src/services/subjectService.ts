import axios from "axios";
import { SubjectsResponse, Subject } from "../interfaces/SubjectInterfaces";
import { API_BASE_URL } from "../resources/apiLinks";

export const subjectService = {
  getSubjectsFromScrapper: async (reqData: {
    token: string;
    active: boolean;
    cham: number;
    mustRefresh: boolean;
    leg: number;
  }): Promise<Subject[]> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
        params: {
          leg: reqData.leg,
          cham: reqData.cham,
          refresh: reqData.mustRefresh,
        },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/webscrap/mps`, config);
        const data = await response.data;
        return data;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
  getSubjectsFromDataBase: async (reqData: {
    token: string;
    active: boolean;
  }): Promise<Subject[]> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/subjects`, config);
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
