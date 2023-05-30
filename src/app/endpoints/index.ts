import { environment } from "src/environments/environment.development";

const endpoints = {
    LOGIN: `${environment.BASE_URL}/login`,
    SIGNUP: `${environment.BASE_URL}/signupx`,
    CHECKEMAIL: `${environment.BASE_URL}/check-email`,
    CHECKUSERNAME: `${environment.BASE_URL}/check-username`,
    RESET_PASSWORD : `${environment.BASE_URL}/` ,
    LOGOUT : `${environment.BASE_URL}`,


    INVOICES : {
      CREATE : '',
      GET : (InvoiceId: string) => `/${InvoiceId}`,
      UPDATE : (InvoiceId: string) => `/${InvoiceId}`,
      GETALL : '',
      DELETE: (InvoiceId: string) => `/${InvoiceId}`,
    }
  }
  
  
  export default endpoints;