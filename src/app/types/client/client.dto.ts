export interface Client {
    name: string;
    email: string;
    phoneNumber: string;
    registeredNo: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    street: string;
    gstin: string;
    pan: string;
    _id?: string;
    createdAt: Date;
}