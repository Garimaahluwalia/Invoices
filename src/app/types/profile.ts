export interface IAccountDetails {
    accHolderName: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    ifscCode: string;
  }
  
  export interface IUserProfile {
    name: string;
    email: string;
    mobile: string;
    registeredOn: string;
    gstIn: string;
    pan: string;
    address: string;
    accountDetails: IAccountDetails;
  }
  