export enum ModalEvents {
  AddorUpdateClient = "AddorUpdateClient",
  Delete = "Delete",
  invoiceactions = "invoiceactions",
  RemovePayment = "RemovePayment",
  BulkDelete = "BulkDelete",
  SentInvoiceEmail = "SentInvoiceEmail",
  RecordPayment = "RecordPayment"
}

export interface IEventResponse {
  status: boolean;
  data?: { [key: string]: string | number | boolean }
}