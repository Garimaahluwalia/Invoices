export enum ModalEvents {
  AddorUpdateClient = "AddorUpdateClient",
  Delete = "Delete",
  invoiceactions = "invoiceactions",
  BulkDelete = "BulkDelete",
  addField = "addField"
}

export interface IEventResponse {
    status: boolean;
    data?: { [key: string]: string | number | boolean }
}