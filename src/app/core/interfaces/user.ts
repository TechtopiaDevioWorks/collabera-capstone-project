export interface MinUser {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
    team?: Team;
}

export interface User extends MinUser {
    token: string;
}

export interface NewUser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    token: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface Team {
    id: number;
    name: string;
}