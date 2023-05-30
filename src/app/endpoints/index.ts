import { environment } from "src/environments/environment.development"



const endpoints = {
    LOGIN: `${environment.BASE_URL}/login`,
    SIGNUP: `${environment.BASE_URL}/signupx`,
    EMAIL: `${environment.BASE_URL}/check-email`,
    USERNAME: `${environment.BASE_URL}/check-username`,


    INVOICES : {
      CREATE : '',
      GET : (InvoiceId: string) => `/${InvoiceId}`,
      UPDATE : (InvoiceId: string) => `/${InvoiceId}`,
      GETALL : '',
      DELETE: (InvoiceId: string) => `/${InvoiceId}`,
    }
  }
  
  
  export default endpoints;