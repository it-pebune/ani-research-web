import axios from "axios";
import { Job, JobResponse } from "../interfaces/JobInterfaces";

import { API_BASE_URL } from "../resources/apiLinks";

export const jobService = {
  getSubjectsJobs: async (reqData: {
    token: any;
    active: boolean;
    subjectId: number;
  }): Promise<Job[]> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
        params: { subjectId: reqData.subjectId },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/jobs`, config);
        const data = await response.data;
        return data;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
  getSpecifiedInstitution: async (reqData: {
    token: string;
    active: boolean;
    id: number;
  }): Promise<JobResponse> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      try {
        response = await axios.get(
          `${API_BASE_URL}/jobs/${reqData.id}`,
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
  addInstitution: async (reqData: {
    token: string;
    active: boolean;
    subjectId: string;
    institutionId: string;
    sirutaId: string;
    name: string;
    dateStart: string;
    dateEnd: string;
    info: number;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      const {
        subjectId,
        institutionId,
        sirutaId,
        name,
        dateStart,
        dateEnd,
        info,
      } = reqData;
      const payload = JSON.parse(
        JSON.stringify({
          subjectId,
          institutionId,
          sirutaId,
          name,
          dateStart,
          dateEnd,
          info,
        })
      );

      try {
        response = await axios.post(`${API_BASE_URL}/insts`, payload, config);
        const data = await response.data;
        return data;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
  updateInstitution: async (reqData: {
    token: string;
    active: boolean;
    id: number;
    subjectId: string;
    institutionId: string;
    sirutaId: string;
    name: string;
    dateStart: string;
    dateEnd: string;
    info: number;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      const {
        subjectId,
        institutionId,
        sirutaId,
        name,
        dateStart,
        dateEnd,
        info,
      } = reqData;
      const payload = JSON.parse(
        JSON.stringify({
          subjectId,
          institutionId,
          sirutaId,
          name,
          dateStart,
          dateEnd,
          info,
        })
      );

      try {
        response = await axios.put(
          `${API_BASE_URL}/insts/${reqData.id}`,
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
  deleteInstitution: async (reqData: {
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
          `${API_BASE_URL}/insts/${reqData.id}`,
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
