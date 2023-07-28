export interface IAccountDetails {
  accHolderName: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface IUserProfile {
  accountDetails: IAccountDetails;
  address: string;
  email: string;
  gstIn: string;
  mobile: string;
  name: string;
  pan: string;
  photoUrl: string;
  registeredOn: string;
  userId?: string;
  __v?: number;
  _id?: string;
}





