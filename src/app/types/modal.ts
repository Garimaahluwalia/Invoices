export enum ModalEvents {
  AddorUpdateClient = "AddorUpdateClient",
  Delete = "Delete",
  invoiceactions = "invoiceactions",
  RemovePayment = "RemovePayment",
  BulkDelete = "BulkDelete",
  SentEmail = "SentEmail",
  RecordPayment = "RecordPayment",
  ViewPayment = "ViewPayment"
}

export interface IEventResponse {
  status: boolean;
  data?: { [key: string]: string | number | boolean }
}


export enum ROUTER_ACTIONS {
  SAVE_INVOICE_PAGE = "save-invoice-page",
  INVOICE = "invoice",
  CLIENTS = "clients",
  QUOTATIONS = "quotations",
  SAVE_QUOTATIONS_PAGE = "save-quotations-page",
  VIEW_INVOICE_LIST = "view-invoice-list",
  VIEW_QUOTATIONS_LIST = "view-quotations-list"
}