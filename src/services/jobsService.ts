import axios from "axios";
import { Job } from "../interfaces/JobInterfaces";
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
  getSpecifiedJob: async (reqData: {
    token: string;
    active: boolean;
    id: number;
  }): Promise<Job> => {
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

  /**
   * @throws {Error}
   */
  addJob: async (reqData: {
    token: string;
    active: boolean;
    subjectId?: number | undefined;
    institutionId: number;
    sirutaId: number;
    name: string;
    dateStart: string | undefined;
    dateEnd?: string | undefined;
    info?: string;
  }): Promise<any> => {
    if (!reqData.active) {
      throw new Error("Active token required for adding job.");
    }

    const config = { headers: { Authorization: `Bearer ${reqData.token}` } },
      { subjectId, institutionId, sirutaId, name, dateStart, dateEnd, info } =
        reqData,
      payload = JSON.parse(
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

    return (await axios.post(`${API_BASE_URL}/jobs`, payload, config)).data;
  },

  /**
   * @throws {Error}
   */
  deleteJob: async (
    tokenStatus: { token: string; active: boolean },
    id: number
  ): Promise<void> => {
    if (!tokenStatus.active) {
      throw new Error("Active token required for deleting job.");
    }

    const config = {
      headers: { Authorization: `Bearer ${tokenStatus.token}` },
    };

    await axios.delete(`${API_BASE_URL}/jobs/${id}`, config);
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
