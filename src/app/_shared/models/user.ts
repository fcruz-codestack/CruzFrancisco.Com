export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
}

export interface SignInResponse {
    message: string;
    error: boolean;
    returnUrl: string;
}
