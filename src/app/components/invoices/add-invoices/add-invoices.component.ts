import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { IInvoice, Invoice } from 'src/app/types/invoice';
import { NotifierService } from 'angular-notifier';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
@Component({
  selector: 'app-add-invoices',
  templateUrl: './add-invoices.component.html',
  styleUrls: ['./add-invoices.component.css']
})
export class AddInvoicesComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  public Invoices!: IInvoice;
  public taxesType: any
  public ProductData: any
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
  private invoiceId: string | null = null;
  public updatedInvoiceNumber: any;
  public updateInvoiceData: any;

  constructor(
    public addInvoiceService: AddInvoicesService,
    public route: ActivatedRoute,
    public notifierService: NotifierService,
    public clientService: ClientService,
    public invoiceService: InvoiceService,
    public router: Router
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.getTaxes();
    this.invoiceId = this.route.snapshot?.params?.["id"]; // InvoiceId from Route
    this.invoiceService.invoiceNumber = this.invoiceId;

    if (this.invoiceId) {
      this.invoiceService.getInvoiceforUpdateAndEmit();
    }


    this.invoiceService.invoiceEmitter.subscribe((res) => {
      console.log(res, "Responseofemitter00000000000000000000000  ")
      this.updatedInvoiceNumber = res.invoiceNo;
      this.ProductData = res.products;
      
      this.addInvoiceService.sendProductChanges(res.products)
      console.log(this.ProductData, "productData event emitter");
      this.clientService.sendClientDetails(res.client);

      this.updateInvoiceData = res;
      console.log(this.updateInvoiceData, "UPDATEINVOICEDATA")


      this.InvoiceForm.form?.patchValue({
        "invoice": {
          "invoiceNo": res.invoiceNo,
          "date": "2023-06-28"
        },
        // "company": {
        //   "Businessname": "M CODE INFOSOFT",
        //   "address": "#60., 1st Floor, Zirakpur, Punjab, india 140603",
        //   "GSTIN": "03DQCPK3553H1Z3",
        //   "pan": "DQCPK3553H",
        //   "postalCode": "12345",
        //   "emailaddress": "info@mcodeinfosoft.com",
        //   "contactNo": "123-456-7890"
        // },
        // "client_id": "64991808f711f7bc26179a6f",
        // "tax": "GST",
        // "products": {
        //   "item0": {
        //     "name": "djs",
        //     "HSN_SAC": "",
        //     "amount": 11,
        //     "rate": 0.019799999999999998,
        //     "taxamount": 0.18,
        //     "total": "11.02"
        //   }
        // },
        // "bankDetails": {
        //   "accountHolderName": "M CODE INFOSOFT",
        //   "accountNumber": "098878776809454",
        //   "ifscCode": "ICICINBBCTS",
        //   "swiftCode": "9898BHBZA23",
        //   "bank": "ICICI Bank Ltd."
        // }
      });
    });
  }

  submit(f: NgForm) {
    const invoice = new Invoice();
    invoice.setData(f.value);
    const payload = invoice.getPayload();
    if (this.invoiceId) {
      this.updateInvoice(payload);
    } else {
      this.addInvoice(payload);
    }
  }

  addInvoice(payload: any) {
    this.addInvoiceService.addInvoice(payload).subscribe(
      (res: any) => {
        this.Invoices = res;
        console.log(this.Invoices, "Add-Invoices, API response");
        this.notifier.notify('success', 'Invoice saved successfully');
        this.router.navigateByUrl("/invoice");
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateInvoice(payload: any) {
    const invoiceId = payload._id;
    this.invoiceService.updateInvoice(invoiceId, payload).subscribe(
      (res: any) => {
        console.log(res, "updateInvoice")
        this.Invoices = res;
        console.log(this.Invoices, "Updated Invoice, API response");
        this.notifier.notify('success', 'Invoice updated successfully');
        this.router.navigateByUrl("/invoice");
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  getTaxes() {
    this.clientService.recieveTaxName().subscribe((res) => {
      this.taxesType = res;
    });
  }
}




