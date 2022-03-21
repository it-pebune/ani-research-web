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

export interface SocialInfo {
  facebook: string;
  linkedIn: string;
}

export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  socialInfo: string;
  phone: string;
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

export interface SpecifiedUserToUpdate {
  firstName?: string;
  lastName?: string;
  displayName?: string;

  socialInfo?: string;
  phone?: string;

  roles?: number[];
}

export interface Filters {
  statusFilters: number[];
  roleFilters: number[];
  lastDateFilter: {
    logged: number | null;
    period?: number | null | string;
  };
}
