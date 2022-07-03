export interface DocumentsFromScrapperResult {
  [key: string]: any;
  name: string;
  institution: string;
  function: string;
  locality: string;
  county: string;
  date: string;
  type: string;
  link: string;
  filename: string;
  uid: string;
  existent?: boolean;
}

export interface DocumentsFromScrapper {
  downloadUrl: string;
  results: DocumentsFromScrapperResult[];
}

export interface DocumentFromDataBase {
  [key: string]: any;
  id: number;
  name: string;
  md5: string;
  downloadedUrl: string;
  originalPath: string;
  created: string;
  createdByName: string;
  updated: string;
  updatedByName: string;
  institution?: string;
  dateStart?: string;
  dateEnd?: string;
}
