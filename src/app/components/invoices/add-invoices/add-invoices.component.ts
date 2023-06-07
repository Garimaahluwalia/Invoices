import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { HttpHeaders } from '@angular/common/http';
import { AUTHORIZATION_TOKEN } from 'src/app/constants';
import { Invoice } from 'src/app/types/invoice';
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



  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const form = this.InvoiceForm.value;
      this.InvoiceForm.control.patchValue(this.model);
    }, 200);
  }
  submit(f: NgForm) {

    const invoice = new Invoice()
    invoice.setData(f.value);
    console.log(invoice, "cloned");

    const payload = invoice.getPayload();
    console.log(payload, "Payload Data");
    this.addInvoiceService.addInvoice(payload).subscribe(
      (res: any) => {
        this.Invoices = res;
        console.log(this.Invoices, "addApiResponse");
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}


