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

export class AccountDetails implements IAccountDetails {
  accHolderName: string = "";
  bankName: string = "";
  branchName: string = "";
  accountNumber: string = "";
  ifscCode: string = "";

}

export class UserProfile implements IUserProfile {
  accountDetails: IAccountDetails = new AccountDetails();
  address: string = "";
  email: string = "";
  gstIn: string = "";
  mobile: string = "";
  name: string = "";
  pan: string = "";
  photoUrl: string = "";
  registeredOn: string = "";
  userId?: string | undefined;
  __v?: number | undefined;
  _id?: string | undefined;
}


export interface userProfilepayload {
  accountDetails: IAccountDetails;
  address: string,
  email: string,
  gstIn: string,
  mobile: string,
  name: string,
  pan: string,
  registeredOn: string
}





