import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
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
  public APIpayload: any = {
    "invoiceNo": "6",
    "company": {
      "Businessname": "ABC Company",
      "address": "123 Main St",
      "GSTIN": "ABC123",
      "pan": "XYZ456",
      "postalCode": "12345",
      "emailaddress": "mailto:info@abccompany.com",
      "website": "https://www.abccompany.com",
      "contactNo": "1234567890"
    },
    "products": [
      {
        "name": "Product 1",
        "description": "Description of Product 1",
        "amount": 10,
        "rate": 5,
        "total": 50,
        "HSN_SAC": "123456",
        "taxamount": "13%"
      },
      {
        "name": "Product 2",
        "description": "Description of Product 2",
        "amount": 5,
        "rate": 10,
        "total": 50,
        "HSN_SAC": "789012",
        "taxamount": "18%"
      }
    ],
    "currency": ["USD"],
    "tax": "IGST",
    "client": "64953f8346ca26451aa6629b",
    "InvoiceId": "123456",
    "Email": "mailto:john.doe@example.com",
    "Date": "2023-06-23",
    "Billed": 1,
    "Status": "paid",
    "bankDetails": {
      "accountHolderName": "John Doe",
      "bankName": "ABC Bank",
      "accountNumber": "1234567890",
      "ifscCode": "ABC123",
      "swiftCode": "SWIFT123",
      "bank": "ABC Bank Ltd."
    }
  }




  constructor(
    public addInvoiceService: AddInvoicesService,
    public route: Router,
    public notifierService: NotifierService,
    private clientService: ClientService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.clientService.recieveTaxName().subscribe((res) => {
      this.taxesType = res;
    });
  }

  submit(f: NgForm) {
    const invoice = new Invoice();
    console.log(f.value, "formValue");
    invoice.setData(f.value);
    const payload = invoice.getPayload();
    console.log(payload, "payload");
    this.addInvoiceService.addInvoice((payload)).subscribe((res: any) => {
      this.Invoices = res;
      console.log(this.Invoices, "Add-Invoices , API response");
      this.notifier.notify('success', 'Invoice Save successfully');
      this.route.navigateByUrl("/invoice");
    }, (error: any) => {
      console.error(error);
    });
  }
}




