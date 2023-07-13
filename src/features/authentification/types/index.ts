export type AuthUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'CLIENT';
};

export type Client = {
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
    address: string;
}

export type UserResponse = {
    jwt: string;
    user: AuthUser;
};