import { environment } from "src/environments/environment.development";

const endpoints = {
  LOGIN: `${environment.BASE_URL}/login`,
  SIGNUP: `${environment.BASE_URL}/signupx`,
  CHECKEMAIL: `${environment.BASE_URL}/check-email`,
  CHECKUSERNAME: `${environment.BASE_URL}/check-username`,
  RESET_PASSWORD: `${environment.BASE_URL}/forgot-password`,
  LOGOUT: `${environment.BASE_URL}`,


  INVOICES: {
    CREATE: `${environment.BASE_URL}/listx`,
    GET: (InvoiceId: string) => `${environment.BASE_URL}/${InvoiceId}`,
    UPDATE: (InvoiceId: string) => `${environment.BASE_URL}/${InvoiceId}`,
    GETALL: `${environment.BASE_URL}`,
    DELETE: (InvoiceId: string) => `${environment.BASE_URL}/${InvoiceId}`,
  },
  ADD_INVOICES: {
    ADD: `${environment.BASE_URL}/invoices`,
    GET: (InvoiceId: string) => `${environment.BASE_URL}/invoices${InvoiceId}`,
    UPDATE: (InvoiceId: string) => `${environment.BASE_URL}/invoices${InvoiceId}`,
  }
}


export default endpoints;