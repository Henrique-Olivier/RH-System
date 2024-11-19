
export interface IUser {
    id: string;
    email: string | undefined;
    name: string | undefined;
}

export interface UserPermission {
    userId: string;
    permission: number;
}

export interface Permission {
    created_at: string;
    id: number;
    permissao: string;
}

