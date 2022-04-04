import axios from "axios";
import { DocumentsFromScrapper } from "../interfaces/DocumentInterfaces";
import {
  SubjectDetailFromScrapper,
  SubjectFromDataBase,
  SubjectFromScrapperResult,
} from "../interfaces/SubjectInterfaces";
import { API_BASE_URL } from "../resources/apiLinks";

export const documentService = {
  getDocumentsFromScrapper: async (reqData: {
    token: string;
    active: boolean;
    lastName: string;
    firstName: string;
  }): Promise<DocumentsFromScrapper> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
        params: {
          name: reqData.lastName + " " + reqData.firstName,
        },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/webscrap/decls`, config);
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
