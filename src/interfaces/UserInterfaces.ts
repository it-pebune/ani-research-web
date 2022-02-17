export interface User {
  [key: string]: any;
  role: string;
  roleId: number;
  displayName: string;
  profileImageUrl: string;
  email: string;
  provider: string;
  socialInfo: SocialInfo;
  phone: string;
  created: Date;
  updated: Date;
  lastLogin: Date;
}

export interface CurrentUser {
  id: number;
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  roles: number[];
}

export interface SpecifiedUser {
  id: number;
  email: string;

  firstName: string;
  lastName: string;
  displayName: string;

  profileImageUrl: string;
  socialInfo: SocialInfo;
  phone: string;

  roles: number[];

  settings: object;

  notes: string[];
}

export interface Filters {
  statusFilters: number[];
  roleFilters: number[];
  lastDateFilter: {
    logged: number | null;
    period?: number | null | string;
  };
}

export interface SocialInfo {
  facebook: string;
  linkedIn: string;
}
