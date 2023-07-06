import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { IInvoice, Invoice } from 'src/app/types/invoice';
import { NotifierService } from 'angular-notifier';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
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
  public download: any;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

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
    // InvoiceId from Route
    this.invoiceId = this.route.snapshot?.params?.["id"];
    this.invoiceService.invoiceNumber = this.invoiceId;
    if (this.invoiceId) {
      this.invoiceService.getInvoiceforUpdateAndEmit();
    }
    this.invoiceService.invoiceEmitter.subscribe((res) => {
      this.updatedInvoiceNumber = res.invoiceNo;
      this.ProductData = res.products;

      this.addInvoiceService.sendProductChanges(res.products);
      this.clientService.sendClientDetails(res.client);

      this.updateInvoiceData = res;
      this.InvoiceForm.form?.patchValue({
        "invoice": {
          "invoiceNo": res.invoiceNo,
          "date": "2023-06-28"
        },
        "currency": res.currency,
        "tax": res.tax,
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
    this.addInvoiceService.addInvoice(payload).pipe(takeUntil(this.destroyed)).subscribe(
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


  downloadInvoice() {
    this.invoiceService.downloadInvoice(this.invoiceId).subscribe((res:any) => {
      this.download = res ;

    })
  }


  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}




