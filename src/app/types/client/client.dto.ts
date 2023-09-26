

export interface IClient {
  _id: string;
  name: string;
  email: string;
  user_id: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  street: string;
  gstin: string;
  pan: string;
  createdAt: string;
  __v: number;
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

export enum ClientRouterModalAction {
  Client = "Client",
  AddInvoice = "AddInvoice",
  EditInvoice = "EditInvoice",
  ViewInvoice = "ViewInvoice",
  DuplicateInvoice = "DuplicateInvoice",
  RecordPayment = "RecordPayment",
  Quotations = "quotations"
}