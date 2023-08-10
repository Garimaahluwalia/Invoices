export enum ModalEvents {
  AddorUpdateClient = "AddorUpdateClient",
  Delete = "Delete",
  invoiceactions = "invoiceactions",
  BulkDelete = "BulkDelete",
  RecordPayment = "RecordPayment"
}

export interface IEventResponse {
  status: boolean;
  data?: { [key: string]: string | number | boolean }
}