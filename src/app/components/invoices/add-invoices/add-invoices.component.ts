import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-invoices',
  templateUrl: './add-invoices.component.html',
  styleUrls: ['./add-invoices.component.css']
})
export class AddInvoicesComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  model: any = {
    invoice: {
      InvoiceNo: "121111"
    },
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
  public invoiceData: any;


  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      const form = this.InvoiceForm.value;
      this.InvoiceForm.control.patchValue(this.model);
     /*  console.log(form, "hfhsjf"); */
    }, 200)
  }

  submit(f: NgForm) {
    this.invoiceData = f.value;
    console.log(this.model, "modelData");
  }
  







}
