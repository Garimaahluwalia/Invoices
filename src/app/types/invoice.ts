export interface IInvoice {
   invoiceNo: IInvoiceClass;
   company: ICompany;
   billing: IIng;
   shipping: IIng;
   productDetails: IProductDetails[];
   paymentDetails: IPaymentDetails;
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
   name: string;
   postalCode: string;
   emailaddress: string;
   website: string;
   contactNo: string;
}

export interface IIng {
   address: IAddress;
   name: string;
}

export interface IAddress {
   fullName: string;
   address: string;
   phoneNo: string;
   taxnumber: string;
   postalCode: string;
   country: string;
}

export enum PaymentMethod {
   Mastercard = 'mastercard',
   CreditCard = 'creditcard',
   Visa = 'visa',
   Paypal = 'paypal',
   AccountNumber = 'account number',
}
export interface IPaymentDetails {
   paymentMethod: PaymentMethod;
   cardHolderName: string;
   accountNumber: string;
   subTotal: number;
   tax: number;
   discount: number;
   shippingcharge: number;
   totalamount: number;
   IFSC_Code: number;
   Bank_name: string
}

export interface IProductDetails {
   productName: string;
   productDescription: string;
   Rate: number,
   Quantity: number,
   Amount: number
}


export class Invoice implements IInvoice {
   public invoiceNo!: IInvoiceClass;
   private _company!: ICompany;
   public _billing!: IIng;
   public _shipping!: IIng;
   public _productDetails!: IProductDetails[];
   public _paymentDetails!: IPaymentDetails;
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
   setBilling({ address }: IIng) {
      this.billing = {
         address: {
            fullName: address.fullName,
            address: address.address,
            phoneNo: address.phoneNo,
            taxnumber: address.taxnumber,
            postalCode: address.postalCode,
            country: address.country,
         },
         name: address.fullName
      }
   }
   set billing(value: IIng) {
      this._billing = value;
   }
   get billing(): IIng {
      return this._billing;
   }
   // BillingDetails ends 



   // shippingDetails starts 
   setShipping({ address }: IIng) {
      this.shipping = {
         address: {
            fullName: address.fullName,
            address: address.address,
            phoneNo: address.phoneNo,
            taxnumber: address.taxnumber,
            postalCode: address.postalCode,
            country: address.country,
         },
         name: address.fullName
      }
   }

   set shipping(value: IIng) {
      this._shipping = value;
   }

   get shipping(): IIng {
      return this._shipping;
   }
   // shippingDetails ends 




   //   CompanyDetails starts
   setCompany({ contactNo, emailaddress, name, postalCode, website }: ICompany) {
      this.company = {
         contactNo: contactNo,
         emailaddress: emailaddress,
         name: emailaddress,
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

   setPaymentDetails({ paymentMethod, cardHolderName, accountNumber, subTotal, tax, discount, shippingcharge, totalamount, IFSC_Code, Bank_name }: IPaymentDetails) {
      this.paymentDetails = {
         paymentMethod: paymentMethod,
         cardHolderName: cardHolderName,
         accountNumber: accountNumber,
         subTotal: subTotal,
         tax: tax,
         discount: discount,
         shippingcharge: shippingcharge,
         totalamount: totalamount,
         IFSC_Code: IFSC_Code,
         Bank_name: Bank_name
      }
   }
   set paymentDetails(value: IPaymentDetails) {
      this._paymentDetails = value;
   }
   get paymentDetails(): IPaymentDetails {
      return this._paymentDetails;
   }

   // PaymentDetails ends 





   setData(values: { [key: string]: string | number | { [key: string]: string | number } }) {
      this.setInvoice(values["invoice"] as unknown as IInvoiceClass);
      this.setCompany(values["company"] as unknown as ICompany);
      const productDetailsArray: IProductDetails[] = [
         { productName: 'Product 1', productDescription: 'Description 1', Rate: 78, Quantity: 3, Amount: 100 },
         { productName: 'Product 2', productDescription: 'Description 2', Rate: 78, Quantity: 3, Amount: 100 },
      ];

      this.setProductDetails(productDetailsArray);
      this.setPaymentDetails(values["paymentDetails"] as unknown as IPaymentDetails);
      this.setBilling(values["billing"] as unknown as IIng);
      this.setShipping(values["shipping"] as unknown as IIng);
   }

   getPayload() {
      return {
         "invoice": this.invoiceNo,
         "company": this.company,
         "billing": this.billing,
         "shipping": this.shipping,
         "productDetails": this.productDetails,
         "paymentDetails": this.paymentDetails
      }
   }




}