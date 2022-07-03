export interface Job {
  id: number;
  [key: string]: any;
  subjectId: string;
  institutionId: string;
  sirutaId: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  info: number;
}

export interface JobResponse {
  jobs: object[];
  job: Job;
}
