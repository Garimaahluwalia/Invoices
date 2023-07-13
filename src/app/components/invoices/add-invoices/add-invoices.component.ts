import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { IInvoice } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { NotifierService } from 'angular-notifier';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InvoiceDataHandlerService } from 'src/app/services/invoice-data-handler/invoice-data-handler.service';
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
  public invoiceId: string | null = null;
  public updatedInvoiceNumber: any;
  public updateInvoiceData: any;
  public download: any;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public status : any;
  public currency : any;

  constructor(
    public addInvoiceService: AddInvoicesService,
    public route: ActivatedRoute,
    public notifierService: NotifierService,
    public clientService: ClientService,
    public invoiceService: InvoiceService,
    public router: Router,
    public invoiceDataHandler: InvoiceDataHandlerService
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

    /* this.addInvoiceService.receiveCurrency().subscribe((res: any) => {
      this.currency = res;
    }) */
    this.invoiceService.invoiceEmitter.subscribe((res) => {
      this.updatedInvoiceNumber = res.invoiceNo;
      this.ProductData = res.products;
      this.status = res.status;
      this.currency = res.currency;
      console.log(this.currency, "CURRENCY FROM ADD-INVOICE")
      this.addInvoiceService.sendProductChanges(res.products);
      this.clientService.sendClientDetails(res.client);
      this.addInvoiceService.sendCurrency(this.currency);
      this.updateInvoiceData = res;
      this.InvoiceForm.form?.patchValue({
        "invoice": {
          "invoiceNo": res.invoiceNo,
         
        },
        // "currency": res.currency,
        "tax": res.tax,
      });
    });
  }

  submit(f: NgForm) {
    const client_details = f.value.client_id;
    if (!client_details) {
      this.notifier.show({
        type: 'error',
        message: 'Client is missing',
        id: 'THAT_NOTIFICATION_ID', 
      });
      setTimeout(() => {
        this.notifier.hide('THAT_NOTIFICATION_ID');
      }, 2000);
    } else {
      this.invoiceDataHandler.setData(f.value);
      const clientId = f.value.client_id;
      this.invoiceDataHandler.invoiceId = this.invoiceId as string;
      const payload = this.invoiceDataHandler.getPayload();
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
        this.router.navigateByUrl("/invoice");
        this.notifier.show({
          type: 'success',
          message: 'Invoice saved successfully',
          id: 'THAT_NOTIFICATION_ID', 
        });
        setTimeout(() => {
          this.notifier.hide('THAT_NOTIFICATION_ID');
        }, 2000);
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
        this.router.navigateByUrl("/invoice");
        this.notifier.show({
          type: 'success',
          message: 'Invoice updated successfully',
          id: 'THAT_NOTIFICATION_ID', 
        });
        setTimeout(() => {
          this.notifier.hide('THAT_NOTIFICATION_ID');
        }, 2000);
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
    this.invoiceService.downloadInvoice(this.invoiceId).pipe(takeUntil(this.destroyed)).subscribe((response: any) => {
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response.body);
      let downloadLink = document.createElement('a');
      const URI = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.href = URI;
      downloadLink.setAttribute('download',
        `invoice_${this.invoiceId}.pdf`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(() => {
        downloadLink.remove();
        window.URL.revokeObjectURL(URI);
      }, 2000);
      this.notifier.show({
        type: 'success',
        message: 'Invoice downloaded successfully',
        id: 'THAT_NOTIFICATION_ID', 
      });
      setTimeout(() => {
        this.notifier.hide('THAT_NOTIFICATION_ID');
      }, 2000);
    })
  }


  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}




