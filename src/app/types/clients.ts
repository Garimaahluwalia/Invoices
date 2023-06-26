export interface IClientsResponse {
    clients: IClients[];
    totalPages: number;
  }
  
  export interface IClients {
    _id: string;
    name: string;
    email: string;
    user_id: string;
    phoneNumber: string;
    address : string;
   
  }
  