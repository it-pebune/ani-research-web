export interface User {
  [key: string]: any;
  role?: string | undefined;
  roleId: number;
  displayName: string;
  profileImageUrl: string | undefined;
  email: string | undefined;
  provider: string | undefined;
  socialInfo: string | undefined;
  phone: string | undefined;
  created: Date | undefined;
  updated: Date | undefined;
  lastLogin: Date | undefined;
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
