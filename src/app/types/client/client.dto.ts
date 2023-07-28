export interface IClient {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    street: string;
    gstin?: string;
    pan?: string;
    _id?: string;
    createdAt?: Date;
}

export interface IClientPayload {
    address: string;
    city: string;
    country: string;
    email: string;
    gstin: string;
    name: string;
    pan: string;
    phoneNumber: string;
    state: string;
    street: string;
    zipcode: number
}