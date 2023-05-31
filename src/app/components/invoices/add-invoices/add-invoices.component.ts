import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
@Component({
  selector: 'app-add-invoices',
  templateUrl: './add-invoices.component.html',
  styleUrls: ['./add-invoices.component.css']
})
export class AddInvoicesComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  Invoices: any;
  public invoiceData: any;
  constructor(public addInvoiceService: AddInvoicesService) { }

  model: any = {
    invoice: {
      InvoiceNo: ""
    },
    invoiceNumber: '',

    company: {
      name: '',
      postalCode: '',
      contact: '',
      emailaddress: '',
      website: '',
      contactNo: ''
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



  ngOnInit(): void {

    // this.addInvoiceService.addInvoice(this.invoiceData).subscribe(
    //   (res: any) => {
    //     this.Invoices = res;
    //     console.log(res, "api response");
    //   },
    //   (error: any) => {
    //     console.error(error);
    //   }
    // );



  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const form = this.InvoiceForm.value;
      this.InvoiceForm.control.patchValue(this.model);
    }, 200);
  }


  submit(f: NgForm) {
    this.invoiceData = f.value;
    const payload = {
      "invoice": {
        "InvoiceNo": "INV-001"
      },
      "invoiceNumber": "123456",
      "company": {
        "name": "ABC Company",
        "postalCode": "12345",
        "contact": "John Doe",
        "emailaddress": "mailto:john@example.com",
        "website": "https://www.example.com",
        "contactNo": "123-456-7890"
      },
      "billing": {
        "address": {
          "fullName": "John Doe",
          "address": "123 Main Street",
          "phoneNo": "123-456-7890",
          "taxnumber": "ABCD1234",
          "postalCode": "12345",
          "country": "USA"
        },
        "name": "John Doe"
      },
      "shipping": {
        "address": {
          "fullName": "Jane Smith",
          "address": "456 Elm Street",
          "phoneNo": "987-654-3210",
          "taxnumber": "EFGH5678",
          "postalCode": "54321",
          "country": "USA"
        },
        "name": "Jane Smith"
      },
      "productDetails": {
        "productName": "Product A",
        "productDescription": "Description of Product A"
      },
      "paymentDetails": {
        "paymentMethod": "Credit Card",
        "cardHolderName": "John Doe",
        "accountNumber": "1234-5678-9012-3456"
      }
    }
    
    this.addInvoiceService.addInvoice(payload).subscribe(
      (res: any) => {
        this.Invoices = res;
        console.log(res, "api response");
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}


