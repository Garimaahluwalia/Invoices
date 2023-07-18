import { environment } from "src/environments/environment.development";

const endpoints = {
  LOGIN: `${environment.BASE_URL}/login`,
  SIGNUP: `${environment.BASE_URL}/signupx`,
  CHECKEMAIL: `${environment.BASE_URL}/check-email`,
  CHECKUSERNAME: `${environment.BASE_URL}/check-username`,
  RESET_PASSWORD: `${environment.BASE_URL}/forgot-password`,
  LOGOUT: `${environment.BASE_URL}/logout`,
  DASHBOARD: `${environment.BASE_URL}/dashboard`,
  


  INVOICES_LIST: {
    GETALL: (page: number, limit: number) => `${environment.BASE_URL}/invoice?page=${page}&limit=${limit}`,
    GET: (InvoiceId: string) => `${environment.BASE_URL}/invoice/${InvoiceId}`,
    UPDATE: (InvoiceId: string) => `${environment.BASE_URL}/invoice/${InvoiceId}`,
    DELETE: (InvoiceId: string) => `${environment.BASE_URL}/invoice/${InvoiceId}`,
    GET_INVOICE_NUMBER: `${environment.BASE_URL}/invoice-number`,
    GET_TAX_AMOUNT: `${environment.BASE_URL}/invoice/getTaxes`,
    UPDATE_STATUS: (InvoiceId: string) => `${environment.BASE_URL}/status/${InvoiceId}`,
    DOWNLOAD_INVOICE: (InvoiceId: string) => `${environment.BASE_URL}/invoice/getInvoicePdf/${InvoiceId}`,
    CHECK_INVOICENUMBER: (InvoiceNumber: string, InvoiceId: string) => `${environment.BASE_URL}/invoice-number/${InvoiceNumber}/${InvoiceId}`,
    DUPLICATE_INVOICE :(InvoiceId: any) => `${environment.BASE_URL}/invoice/${InvoiceId}`,
    BULK_DELETE : `${environment.BASE_URL}/invoice/bulkDelete`,

  },
  ADD_INVOICES: {
    ADD: `${environment.BASE_URL}/invoice`,
    GET: (InvoiceId: string) => `${environment.BASE_URL}/invoice/${InvoiceId}`,
    UPDATE: (InvoiceId: string) => `${environment.BASE_URL}/invoice/${InvoiceId}`,
  },
  CLIENTS: {
    CHECKPHONENUMBER: `${environment.BASE_URL}/check`,
    ADD: `${environment.BASE_URL}/client`,
    GETALL: (page: number, limit: number) => `${environment.BASE_URL}/client?page=${page}&limit=${limit}`,
    GET: (ClientId: string) => `${environment.BASE_URL}/client/${ClientId}`,
    UPDATE: (ClientId: string) => `${environment.BASE_URL}/client/${ClientId}`,
    DELETE: (ClientId: string) => `${environment.BASE_URL}/client/${ClientId}`,
  },

  PROFILE: {
    ADD: `${environment.BASE_URL}/profile`,
    UPDATE: `${environment.BASE_URL}/profile`,
    UPLOAD_PROFILE: `${environment.BASE_URL}/profile/upload-photo`
  }
}


export default endpoints;