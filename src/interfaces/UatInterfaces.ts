export interface Uat {
  sirutaId: number;
  countyId: number;
  type: number;
  name: string;
}

export interface County {
  id: number;
  name: string;
}

export interface UatsResponse {
  uats: Uat[];
}

export interface CountiesResponse {
  counties: County[];
}
