import axios from "axios";
import {
  SubjectDetailFromScrapper,
  SubjectFromDataBase,
  SubjectFromScrapperResult,
} from "../interfaces/SubjectInterfaces";
import { API_BASE_URL } from "../resources/apiLinks";

export const subjectService = {
  getSubjectsFromScrapper: async (reqData: {
    token: string;
    active: boolean;
    cham: number;
    mustRefresh: boolean;
    leg: number;
  }): Promise<SubjectFromScrapperResult> => {
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
  deleteSubject: async (reqData: {
    token: string;
    active: boolean;
    id: number;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      try {
        response = await axios.delete(
          `${API_BASE_URL}/subjects/${reqData.id}`,
          config
        );
        const data = await response.data;
        return data;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
  getSubjectDetailFromScrapper: async (reqData: {
    token: string;
    active: boolean;
    id: number;
    cham: number | string;
    legislature?: number;
  }): Promise<SubjectDetailFromScrapper> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
        params: {
          leg: reqData.legislature,
          cham: reqData.cham,
          id: reqData.id,
        },
      };
      try {
        response = await axios.get(
          `${API_BASE_URL}/webscrap/mps/details`,
          config
        );
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
  }): Promise<SubjectFromDataBase[]> => {
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
  addSubject: async (reqData: {
    token: string;
    active: boolean;
    firstName?: string;
    lastName?: string;
    photoUrl?: string;
    dob?: string;
    sirutaId?: number | null;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      const payload = JSON.parse(
        JSON.stringify({
          firstName: reqData.firstName,
          lastName: reqData.lastName,
          photoUrl: reqData.photoUrl,
          dob: reqData.dob,
          sirutaId: reqData.sirutaId && reqData.sirutaId,
        })
      );

      try {
        response = await axios.post(
          `${API_BASE_URL}/subjects`,
          payload,
          config
        );
        const data = await response.data;
        return data;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
  assignSubject: async (reqData: {
    token: string;
    active: boolean;
    subjectId: number | undefined;
    userId: number;
    status: number | undefined;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };

      try {
        response = await axios.put(
          `${API_BASE_URL}/subjects/${reqData.subjectId}/assign`,
          { userId: reqData.userId, status: reqData.status },
          config
        );
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
