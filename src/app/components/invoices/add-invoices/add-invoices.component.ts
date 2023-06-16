import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { HttpHeaders } from '@angular/common/http';
import { AUTHORIZATION_TOKEN } from 'src/app/constants';
import { IInvoice, Invoice } from 'src/app/types/invoice';
import { NotifierService } from 'angular-notifier';
import { ClientService } from 'src/app/services/clients/client.service';
@Component({
  selector: 'app-add-invoices',
  templateUrl: './add-invoices.component.html',
  styleUrls: ['./add-invoices.component.css']
})
export class AddInvoicesComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  Invoices!: IInvoice;
  public taxesType: any
  private readonly notifier!: NotifierService;
  constructor(public addInvoiceService: AddInvoicesService, public route: Router, public notifierService: NotifierService,
    private clientService: ClientService) {
    this.notifier = notifierService;
  }

  model: any = {
    "invoice": {
      "InvoiceNo": "INV-12345"
    },
    "company": {
      "Businessname": "ABC Company",
      "address": "123 Main St",
      "GSTIN": "ABCD1234",
      "pan": "ABCDE12345",
      "postalCode": "12345",
      "emailaddress": "mailto:info@company.com",
      "website": "https://www.company.com",
      "contactNo": "123-456-7890",
      "currencyType": "USD",
      "taxType": "GST"
    },
    "billing": {

      "city": "City Name",
      "pincode": "54321",
      "apartment": "Apt 1",
      "zipcode": "12345",
      "country": "Country Name"
    },
    "shipping": {

      "city": "City Name",
      "pincode": "54321",
      "apartment": "Apt 2",
      "zipcode": "12345",
      "country": "Country Name"
    },


    "products": [
      {
        "productName": "Product 1",
        "productDescription": "Description 1",
        "rate": 10,
        "quantity": 5
      },
      {
        "productName": "Product 2",
        "productDescription": "Description 2",
        "rate": 15,
        "quantity": 3
      }
    ],
    "InvoiceId": "INV-12345",
    "Email": "mailto:customer@example.com",
    "Client": "Client Name",
    "Date": "2023-06-13",
    "Status": "Paid"
  }

  ngOnInit(): void {
    this.clientService.recieveTaxData().subscribe((res) => {
      this.taxesType = res
    })
  }

  submit(f: NgForm) {
    // console.log(f.value)

    // console.log(this.taxesType, "djaghdfakjdahd")
    const invoice = new Invoice();
    console.log(f.value)
    invoice.setData(f.value);
    invoice.tax = this.taxesType;
    const payload = invoice.getPayload();
    console.log(payload, "from components");
    this.addInvoiceService.addInvoice((payload)).subscribe((res: any) => {
      this.Invoices = res;
      // this.route.navigateByUrl("/invoice")
      console.log(this.Invoices, "add-form-API-Response");
      this.notifier.notify('success', 'Invoice Save successfully');
    },
      (error: any) => {
        console.error(error);
      }
    );
  }
}




