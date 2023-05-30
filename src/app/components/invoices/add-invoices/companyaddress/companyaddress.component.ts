import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm,} from '@angular/forms';


@Component({
  selector: 'app-companyaddress',
  templateUrl: './companyaddress.component.html',
  styleUrls: ['./companyaddress.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CompanyaddressComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  ngOnInit(): void {
   
  }
  model: any = {
    invoiceNumber: 'sfjhfdjg',
    fkhdkfhsd: "dsh",
    company: {
      name: 'sdffdfs',
      postalCode: 'dsfsds',
      contact: 'sddff',
      emailaddress: 'sdfdf',
      website: 'sdfd',
      contactNo: 'dsffsd'
    },
    billing: {
      address: {
        fullName: '',
        address: '',
        phoneNo: '',
        taxnumber: '',
        postalCode: '',
        country: ''
      },
      name: ''
    },
    shipping: {
      address: {
        fullName: '',
        address: '',
        phoneNo: '',
        taxnumber: '',
        postalCode: '',
        country: ''
      },
      name: ''
    },
    productDetails: {
      productName: '',
      productDescription: ''
    },
    paymentDetails: {
      paymentMethod: '',
      cardHolderName: '',
      accountNumber: ''
    }
  };
}
