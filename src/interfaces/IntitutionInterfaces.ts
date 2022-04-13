export interface Institution {
  [key: string]: any;
  id?: number;
  name: string;
  type: number;
  sirutaId: number;
  uat: string;
  dateStart: Date;
  dateEnd: string;
  address: string;
  cui: string;
  regCom: string;
  aditionalInfo: string;
}

export interface InstitutionResponse {
  jobs?: object[];
  inst: Institution;
}
