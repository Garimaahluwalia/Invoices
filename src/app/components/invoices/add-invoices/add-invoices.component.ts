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
      console.log(res, "Responseofemitter");
      this.updatedInvoiceNumber = res.invoiceNo;
      this.ProductData = res.products;

      this.addInvoiceService.sendProductChanges(res.products);
      console.log(this.ProductData, "productData event emitter");
      this.clientService.sendClientDetails(res.client);

      this.updateInvoiceData = res;



      this.InvoiceForm.form?.patchValue({
        "invoice": {
          "invoiceNo": res.invoiceNo,
          "date": "2023-06-28"
        },
        /* "company": {
          "Businessname": "M CODE INFOSOFT",
          "address": "#60., 1st Floor, Zirakpur, Punjab, india 140603",
          "GSTIN": "03DQCPK3553H1Z3",
          "pan": "DQCPK3553H",
          "postalCode": "12345",
          "emailaddress": "info@mcodeinfosoft.com",
          "contactNo": "123-456-7890"
        },
        
        "client_id": "64991808f711f7bc26179a6f", */
        "currency": res.currency,
        "tax": res.tax,
        /* "products": {
           "item0": {
             "name": "res",
            "HSN_SAC": "",
             "amount": 11,
             "rate": 0.019799999999999998,
            "taxamount": 0.18,
            "total": "11.02"
          }
        },
        "bankDetails": {
          "accountHolderName": "M CODE INFOSOFT",
           "accountNumber": "098878776809454",
           "ifscCode": "ICICINBBCTS",
          "swiftCode": "9898BHBZA23",
           "bank": "ICICI Bank Ltd."
         } */
      });
    });
  }

  submit(f: NgForm) {

    const client_details = f.value.client_id;
    if (!client_details) {
      this.notifier.notify('error', 'Client is missing');
    } else {
      const invoice = new Invoice();
      invoice.setData(f.value);
      const clientId = f.value.client_id;
      console.log(clientId, "ClientId from form");
      console.log(f.value, "addForm Submit Value");
      invoice.invoiceId = this.invoiceId as string;
      const payload = invoice.getPayload();
      if (this.invoiceId) {
        this.updateInvoice(this.invoiceId, payload);
      } else {
        this.addInvoice(payload);
      }
    }
  }


  addInvoice(payload: any) {
    this.addInvoiceService.addInvoice(payload).subscribe(
      (res: any) => {
        this.Invoices = res;
        this.notifier.notify('success', 'Invoice saved successfully');
        this.router.navigateByUrl("/invoice");
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateInvoice(invoiceId: string, payload: { [key: string]: any }) {
    this.invoiceService.updateInvoice(invoiceId, payload).subscribe(
      (res: any) => {
        this.Invoices = res;
        console.log(this.Invoices, "update response");
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




