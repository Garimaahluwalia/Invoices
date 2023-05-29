import { environment } from "src/environments/environment.development"



const endpoints = {
    LOGIN: `${environment.BASE_URL}/login`,
    SIGNUP: `${environment.BASE_URL}/signupx`,
    INVOICES : {
      CREATE : '',
      GET : (InvoiceId: string) => `/${InvoiceId}`,
      UPDATE : (InvoiceId: string) => `/${InvoiceId}`,
      GETALL : '',
      DELETE: (InvoiceId: string) => `/${InvoiceId}`,
    }
  };
  
  export default endpoints;