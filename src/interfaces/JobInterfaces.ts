export interface Job {
  id: number;
  [key: string]: any;
  subjectId: string;
  institutionId: string;
  institution: string;
  sirutaId: string;
  uat: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  info: number;
}

export interface JobResponse {
  jobs: object[];
  job: Job;
}
