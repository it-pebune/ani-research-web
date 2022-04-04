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
