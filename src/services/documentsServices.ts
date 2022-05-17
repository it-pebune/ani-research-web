import axios from "axios";
import {
  DocumentFromDataBase,
  DocumentsFromScrapper,
} from "../interfaces/DocumentInterfaces";
import { API_BASE_URL } from "../resources/apiLinks";
import { jobService } from "./jobsService";

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
  addNewDocument: async (reqData: {
    token: string;
    active: boolean;
    subjectId: number | undefined;
    type?: number;
    jobId?: number;
    status: number;
    name: string;
    date?: string;
    downloadUrl: string;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const payload = JSON.parse(
        JSON.stringify({
          subjectId: reqData.subjectId,
          type: reqData.type,
          status: reqData.status,
          jobId: reqData.jobId,
          name: reqData.name,
          date: reqData.date,
          downloadUrl: reqData.downloadUrl,
        })
      );
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      try {
        response = await axios.post(`${API_BASE_URL}/docs`, payload, config);
        const data = await response.data;
        return data;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },
  getDocumentsFromDataBase: async (reqData: {
    token: string;
    active: boolean;
    subjectId: number;
  }): Promise<DocumentFromDataBase[]> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
        params: {
          subjectId: reqData.subjectId,
        },
      };
      try {
        response = await axios.get(`${API_BASE_URL}/docs`, config);
        const data = (await response.data) as DocumentFromDataBase[];
        const jobs = await jobService.getSubjectsJobs({
          token: reqData.token,
          active: reqData.active,
          subjectId: reqData.subjectId,
        });
        const transformed = Promise.all(
          data.map(async (document) => ({
            ...document,
            institution: jobs.find((job) => job.id === document.jobId)
              ?.institution,
            dateStart: jobs.find((job) => job.id === document.jobId)?.dateStart,
            dateEnd: jobs.find((job) => job.id === document.jobId)?.dateEnd,
          }))
        );
        return transformed;
      } catch (error) {
        response = error;
        console.log(error);
      }
    }
    return response;
  },

  getDocumentRawData: async (reqData: {
    token: string;
    active: boolean;
    docId?: string;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
        params: {
          subjectId: reqData.docId,
        },
      };
      try {
        response = await axios.get(
          `${API_BASE_URL}/docs/${reqData.docId}/dataraw`,
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
  getOriginalDocument: async (reqData: {
    token: string;
    active: boolean;
    docId?: string;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
        params: {
          subjectId: reqData.docId,
        },
      };
      try {
        response = await axios.get(
          `${API_BASE_URL}/docs/${reqData.docId}/odoc`,
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
  getDocumentDetails: async (reqData: {
    token: string;
    active: boolean;
    docId?: string;
  }): Promise<any> => {
    let response: any;
    if (reqData.active) {
      const config = {
        headers: { Authorization: `Bearer ${reqData.token}` },
      };
      try {
        response = await axios.get(
          `${API_BASE_URL}/docs/${reqData.docId}`,
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
