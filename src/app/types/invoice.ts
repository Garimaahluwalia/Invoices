export interface IInvoice {
   invoiceNo: IInvoiceClass;
   company: ICompany;
   // billing: IIng;
   // shipping: IIng;
   productDetails: IProductDetails[];
   BankDetails: IBankDetails;
   _id?: string;
   InvoiceId?: string;
   Email?: string;
   Client?: string;
   Date?: Date;
   Billed?: number;
   Status?: string;
   __v: number;
}
export interface IInvoiceClass {
   invoiceNo: string;
}

export interface ICompany {
   Businessname: string;
   address: string;
   GSTIN: string;
   pan: string;
   postalCode?: string;
   emailaddress: string;
   website?: string;
   contactNo?: string;
}

// export interface IIng {
//    address: IAddress;
//    name: string;
// }

export interface IAddress {
   fullName: string;
   address: string;
   phoneNo: string;
   taxnumber: string;
   postalCode: string;
   country: string;
}

// export enum PaymentMethod {
//    Mastercard = 'mastercard',
//    CreditCard = 'creditcard',
//    Visa = 'visa',
//    Paypal = 'paypal',
//    AccountNumber = 'account number',
// }
export interface IBankDetails {
  
   Bankname: string
   cardHolderName: string;
   accountNumber: string;
   IFSC_Code: string;
}

export interface IProductDetails {
   tax: number;
   currency: number;
   productName: string;
   productDescription: string;
}


export class Invoice implements IInvoice {
   public invoiceNo!: IInvoiceClass;
   private _company!: ICompany;
   // public _billing!: IIng;
   // public _shipping!: IIng;
   public _productDetails!: IProductDetails[];
   public _BankDetails!: IBankDetails;
   public _id?: string;
   public invoiceNumber!: string;
   public InvoiceId?: string;
   public Email?: string;
   public Client?: string;
   public Date?: Date;
   public Billed?: number;
   public Status?: string;
   public __v!: number;

   constructor() { }


   // InvoiceDetails starts 
   setInvoice({ invoiceNo }: IInvoiceClass) {
      this.invoiceNo = {
         invoiceNo: invoiceNo,
      };
   }
   // InvoiceDetails ends 

   //  BillingDetails starts 
   // setBilling({ address }: IIng) {
   //    this.billing = {
   //       address: {
   //          fullName: address.fullName,
   //          address: address.address,
   //          phoneNo: address.phoneNo,
   //          taxnumber: address.taxnumber,
   //          postalCode: address.postalCode,
   //          country: address.country,
   //       },
   //       name: address.fullName
   //    }
   // }
   // set billing(value: IIng) {
   //    this._billing = value;
   // }
   // get billing(): IIng {
   //    return this._billing;
   // }
   // BillingDetails ends 



   // shippingDetails starts 
   // setShipping({ address }: IIng) {
   //    this.shipping = {
   //       address: {
   //          fullName: address.fullName,
   //          address: address.address,
   //          phoneNo: address.phoneNo,
   //          taxnumber: address.taxnumber,
   //          postalCode: address.postalCode,
   //          country: address.country,
   //       },
   //       name: address.fullName
   //    }
   // }

   // set shipping(value: IIng) {
   //    this._shipping = value;
   // }

   // get shipping(): IIng {
   //    return this._shipping;
   // }
   // shippingDetails ends 




   //   CompanyDetails starts
   setCompany({ Businessname, address, contactNo, emailaddress, postalCode, website, GSTIN, pan }: ICompany) {
      this.company = {
         Businessname: Businessname,
         address: address,
         GSTIN: GSTIN,
         pan: pan,
         contactNo: contactNo,
         emailaddress: emailaddress,
         postalCode: postalCode,
         website: website,
      }
   }

   set company(value: ICompany) {
      this._company = value;
   }
   get company(): ICompany {
      return this._company;
   }

   // companyDetails ends 


   //  ProductDetails starts 
   setProductDetails(productDetails: IProductDetails[]) {
      this._productDetails = productDetails;
   }

   set productDetails(value: IProductDetails[]) {
      this._productDetails = value;
   }

   get productDetails(): IProductDetails[] {
      return this._productDetails;
   }
   // ProductDetails ends 



   // PaymentDetails starts 

   setBankDetails({  Bankname  , cardHolderName, accountNumber, IFSC_Code,}: IBankDetails) {
      this.BankDetails = {
         Bankname: Bankname,
         cardHolderName: cardHolderName,
         accountNumber: accountNumber,
         IFSC_Code: IFSC_Code,
      }
   }
   set BankDetails(value: IBankDetails) {
      this._BankDetails = value;
   }
   get BankDetails(): IBankDetails {
      return this._BankDetails;
   }

   // PaymentDetails ends 





   setData(values: { [key: string]: string | number | { [key: string]: string | number } }) {
      this.setInvoice(values["invoice"] as unknown as IInvoiceClass);
      this.setCompany(values["company"] as unknown as ICompany);
      const productDetailsArray: IProductDetails[] = [];
      this.setProductDetails(productDetailsArray);
      this.setBankDetails(values["BankDetails"] as unknown as IBankDetails);
      // this.setBilling(values["billing"] as unknown as IIng);
      // this.setShipping(values["shipping"] as unknown as IIng);
   }

   getPayload() {
      return {
         "invoice": this.invoiceNo,
         "company": this.company,
         // "billing": this.billing,
         // "shipping": this.shipping,
         "productDetails": this.productDetails,
         "BankDetails": this.BankDetails
      }
   }
}