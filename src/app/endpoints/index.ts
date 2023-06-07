import { environment } from "src/environments/environment.development";

const endpoints = {
  LOGIN: `${environment.BASE_URL}/login`,
  SIGNUP: `${environment.BASE_URL}/signupx`,
  CHECKEMAIL: `${environment.BASE_URL}/check-email`,
  CHECKUSERNAME: `${environment.BASE_URL}/check-username`,
  RESET_PASSWORD: `${environment.BASE_URL}/forgot-password`,
  LOGOUT: `${environment.BASE_URL}`,


  INVOICES_LIST: {
    GETALL: `${environment.BASE_URL}/invoices`,
    GET: (InvoiceId: string) => `${environment.BASE_URL}/invoices/${InvoiceId}`,
    UPDATE: (InvoiceId: string) => `${environment.BASE_URL}/listx/${InvoiceId}`,
    // DELETE: (InvoiceId: string) => `${environment.BASE_URL}/listx/${InvoiceId}`,
  },
  ADD_INVOICES: {
    ADD: `${environment.BASE_URL}/invoices`,
    GET: (InvoiceId: string) => `${environment.BASE_URL}/invoices/${InvoiceId}`,
    UPDATE: (InvoiceId: string) => `${environment.BASE_URL}/invoices/${InvoiceId}`,
  }
}


export default endpoints;