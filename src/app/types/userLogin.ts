export interface IUserLoginDetails {
    username: string,
    password: string
}
export interface UserLogin {
    name: string;
    email: string;
    role: string;
    timezone: string;
    image: string;
    created: string;
    updated: string;
    token: string
    access_token?: string
}

export interface ITokens {
    access_token: string,
    refresh_token: string
}

