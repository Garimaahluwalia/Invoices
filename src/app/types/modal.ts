export enum ModalEvents {
  AddorUpdateClient = "AddorUpdateClient",
  Delete = "Delete",
  invoiceactions = "invoiceactions"
}

export interface IEventResponse {
    status: boolean;
    data?: { [key: string]: string | number | boolean }
}