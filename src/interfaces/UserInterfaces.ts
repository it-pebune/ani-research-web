export interface User {
    id: number;
    role: string;
    roleId: number;
    displayName: string;
    profileImageUrl: string,
    email: string;
    provider: string;
    socialInfo: string,
    phone: string,
    created: Date;
    updated: Date;
    lastLogin: Date;
}

export interface CurrentUser {
    id: number,
    displayName: string,
    email: string,
    firstName: string,
    lastName: string,
    profileImageUrl: string
    roles: number[]
}

export interface Filters {
    statusFilters: number[],
    roleFilters: number[],
    lastDateFilter:{
      logged: number|null,
      period?: number|null
    }
  }