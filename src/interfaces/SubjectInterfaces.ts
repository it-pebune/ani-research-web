export interface SubjectFilters {
  cham: number | undefined | null;
  party: string | undefined;
}

// export interface Subject {
//   [key: string]: any;
//   id: number;
//   name: string;
//   party: string;
//   loc: string;
//   cham: number;
// }

export interface Subject {
  [key: string]: any;
  id: number;
  name: string;
  party: string;
  location: string;
  chamber: number;
}

export interface SubjectsResponse {
  legislature: number;
  link: string;
  results: Subject[];
}
