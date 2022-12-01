export interface SubjectFilters {
  cham: number | undefined | null;
  party: string | undefined;
}

export interface SubjectFromDataBase {
  [key: string]: any;
  id: number;
  assignedTo: string;
  assignedToId: number;
  city: string;
  county: string;
  countyId: number;
  created: string;
  deleted: number;
  dob: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  sirutaId: number;
  status: number;
  docCount: number | null;
}

export interface SubjectFromScrapper {
  [key: string]: any;
  id: number;
  name: string;
  party: string;
  district: string;
  chamber: number | string;
  added: boolean;
}

export interface SubjectFromScrapperResult {
  [key: string]: any;
  legislature: number;
  profileUrl: string;
  results: SubjectFromScrapper[];
}

export interface SubjectsResponse {
  legislature: number;
  link: string;
  results: SubjectFromScrapper[];
}

export interface SubjectDetailFromScrapper {
  name: string;
  photo: string;
  dateOfBirth: string;
}

export interface SubjectData {
  firstName: string;
  lastName: string;
  photoUrl: string;
  dob: string;
  sirutaId?: number | null;
}
