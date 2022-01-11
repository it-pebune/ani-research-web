export interface User {
    id: number;
    role: string;
    roleId: number;
    displayName: string;
    profileImageUrl: string,
    email: string;
    provider: string;
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