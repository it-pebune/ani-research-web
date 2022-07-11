import axios from "axios";
import {
  Institution,
  InstitutionResponse,
} from "../interfaces/IntitutionInterfaces";
import { API_BASE_URL } from "../resources/apiLinks";

export const institutionService = {
  getInstitutions: async (tokenStatus: {
    token: string;
    active: boolean;
  }): Promise<Institution[]> => {
    let response: any;
    if (tokenStatus.active) {
      const config = {
        headers: { Authorization: `Bearer ${tokenStatus.token}` },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/insts`, config);
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
  }): Promise<InstitutionResponse> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      try {
        response = await axios.get(
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

  /**
   * @throws {Error}
   */
  addInstitution: async (reqData: {
    token: string;
    active: boolean;
    name: string;
    type: number | null;
    requireDecls: number;
    sirutaId: number | null;
    dateStart: Date | undefined;
    dateEnd: Date | undefined;
    address?: string;
    cui?: string;
    regCom?: string;
    info?: string;
  }): Promise<void> => {
    if (!reqData.active) {
      throw new Error("Active token required for adding institution.");
    }

    const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      },
      {
        name,
        type,
        sirutaId,
        dateStart,
        dateEnd,
        requireDecls,
        address,
        cui,
        regCom,
        info,
      } = reqData,
      payload = JSON.parse(
        JSON.stringify({
          name,
          type,
          sirutaId,
          requireDecls,
          dateStart,
          dateEnd,
          address,
          cui,
          regCom,
          info,
        })
      );

    await axios.post(`${API_BASE_URL}/insts`, payload, config);
  },

  updateInstitution: async (reqData: {
    token: string;
    active: boolean;
    id: number;
    name: string;
    type: number;
    sirutaId: number;
    uat: string;
    dateStart: Date;
    dateEnd: string;
    address: string;
    cui: string;
    regCom: string;
    info: string;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      const {
        name,
        type,
        sirutaId,
        uat,
        dateStart,
        dateEnd,
        address,
        cui,
        regCom,
        info,
      } = reqData;
      const payload = JSON.parse(
        JSON.stringify({
          name,
          type,
          sirutaId,
          uat,
          dateStart,
          dateEnd,
          address,
          cui,
          regCom,
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
