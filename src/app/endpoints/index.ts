import { environment } from "src/environments/environment.development";
import { CLIENTS } from "../constants/routes";

const endpoints = {
  LOGIN: `${environment.BASE_URL}/login`,
  SIGNUP: `${environment.BASE_URL}/signupx`,
  CHECKEMAIL: `${environment.BASE_URL}/check-email`,
  CHECKUSERNAME: `${environment.BASE_URL}/check-username`,
  RESET_PASSWORD: `${environment.BASE_URL}/forgot-password`,
  LOGOUT: `${environment.BASE_URL}/logout`,


  INVOICES_LIST: {
    GETALL: `${environment.BASE_URL}/invoice`,
    GET: (InvoiceId: string) => `${environment.BASE_URL}/invoice/${InvoiceId}`,
    UPDATE: (InvoiceId: string) => `${environment.BASE_URL}/list/${InvoiceId}`,
    // DELETE: (InvoiceId: string) => `${environment.BASE_URL}/listx/${InvoiceId}`,
    GET_INVOICE_NUMBER: `${environment.BASE_URL}/invoice-number`,
    GET_TAX_AMOUNT : `${environment.BASE_URL}/invoice/getTaxes`
  },
  ADD_INVOICES: {
    ADD: `${environment.BASE_URL}/invoice`,
    GET: (InvoiceId: string) => `${environment.BASE_URL}/invoice/${InvoiceId}`,
    UPDATE: (InvoiceId: string) => `${environment.BASE_URL}/invoice/${InvoiceId}`,
  },
  CLIENTS: {
    CHECKPHONENUMBER: `${environment.BASE_URL}/check`,
    ADD: `${environment.BASE_URL}/client`,
    GETALL: `${environment.BASE_URL}/client`,
    GET: (ClientId: string) => `${environment.BASE_URL}/client/${ClientId}`,
    UPDATE: (ClientId: string) => `${environment.BASE_URL}/client/${ClientId}`,
    DELETE: (ClientId: string) => `${environment.BASE_URL}/client/${ClientId}`,
  }
}


export default endpoints;