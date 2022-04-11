export interface DocumentsFromScrapperResult {
  [key: string]: any;
  name: string;
  institution: string;
  function: string;
  locality: string;
  county: string;
  date: string;
  type: number;
  link: string;
  uid: string;
}

export interface DocumentsFromScrapper {
  downloadUrl: string;
  results: DocumentsFromScrapperResult[];
}

export interface DocumentFromDataBase {
  id: number;
  name: string;
  md5: string;
  downloadedUrl: string;
  originalPath: string;
  created: string;
  createdByName: string;
  updated: string;
  updatedByName: string;
}
