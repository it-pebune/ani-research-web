export interface Institution {
  [key: string]: any;
  id?: number;
  name: string;
  type: number | null;
  sirutaId: number | null;
  requireDecls: boolean | number;
  dateStart: string | Date;
  dateEnd: string | Date;
  address: string;
  cui: string;
  regCom: string;
  aditionalInfo: string;
  info?: string;
}

export interface InstitutionResponse {
  jobs?: object[];
  inst: Institution;
}
