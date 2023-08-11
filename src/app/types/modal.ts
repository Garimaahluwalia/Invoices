export enum ModalEvents {
  AddorUpdateClient = "AddorUpdateClient",
  Delete = "Delete",
  invoiceactions = "invoiceactions",
  BulkDelete = "BulkDelete",
  SentInvoiceEmail = "SentInvoiceEmail"
}

export interface IEventResponse {
  status: boolean;
  data?: { [key: string]: string | number | boolean }
}