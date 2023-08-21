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
import { take } from 'rxjs';
import { IProductRows } from 'src/app/types/product';
import { Field, FieldType } from 'src/app/types/columnType';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { QuotationsService } from 'src/app/services/quotations/quotations.service';
import { InvoiceTypes } from 'src/app/types/invoice-types';
@Component({
  selector: 'app-add-invoices',
  templateUrl: './add-invoices.component.html',
  styleUrls: ['./add-invoices.component.css']
})
export class AddInvoicesComponent implements OnInit {
  @ViewChild("InvoiceForm", { static: false }) InvoiceForm!: NgForm;
  public invoiceNumber: string | null = null;
  public invoices!: IInvoice;
  public quotations!: IInvoice;
  public taxType!: string;
  public productData!: IProductRows;
  private readonly notifier!: NotifierService;
  public invoiceId: string | null = null;
  public updateInvoiceData!: IInvoice;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public status!: string;
  public currency!: string;
  public duplicateInvoice: boolean = false;
  public category: any;

  public fields: Field[] = [
    {
      "type": FieldType.TEXT,
      "fieldName": "item",
      "label": "Item",
      "hidden": false,
      "default": true,
      "sortOrder": 1,
      "custom": false,
      "delete": false,
      "tax": false,
      "readonly": false,
    },
    {
      "type": FieldType.TEXT,
      "fieldName": "HSN_SAC",
      "label": "HSN_SAC",
      "hidden": false,
      "default": true,
      "sortOrder": 3,
      "custom": false,
      "delete": false,
      "tax": false,
      "readonly": false,
    },
    {
      "type": FieldType.NUMBER,
      "fieldName": "amount",
      "label": "Amount",
      "hidden": false,
      "default": true,
      "sortOrder": 3,
      "custom": false,
      "delete": false,
      "tax": false,
      "readonly": false,
    },
    {
      "type": FieldType.TEXT,
      "fieldName": "description",
      "label": "Description",
      "hidden": true,
      "default": false,
      "sortOrder": 3,
      "custom": true,
      "delete": false,
      "tax": false,
      "readonly": false,
    },
  ]
  invoiceIDforsave: any;

  constructor(
    public addInvoiceService: AddInvoicesService,
    public route: ActivatedRoute,
    public notifierService: NotifierService,
    public clientService: ClientService,
    public invoiceService: InvoiceService,
    public router: Router,
    public invoiceDataHandler: InvoiceDataHandlerService,
    public loaderService: LoaderService,
    public quotationService: QuotationsService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.getTaxes();
    this.duplicateInvoice = this.route.snapshot.queryParams?.['duplicateInvoice'] ? true : false;
    this.invoiceId = this.route.snapshot?.params?.["id"];
    this.invoiceService.invoiceId = this.invoiceId;

    if (this.invoiceId) {
      this.invoiceService.getInvoiceforUpdateAndEmit();
    }

    this.invoiceService.invoiceEmitter.pipe(takeUntil(this.destroyed)).subscribe((res) => {
      this.fields = res.table as Field[];
      this.invoiceNumber = res.invoiceNo;
      this.invoiceService.invoiceNumber = res.invoiceNo;
      this.productData = res.products;
      this.status = res.status;
      this.currency = res.currency;
      console.log(this.currency, "CURRENCy")
      this.addInvoiceService.sendProductChanges(res.products);
      if (!this.duplicateInvoice) {
        this.clientService.sendClientDetails(res.client);
      }
      this.addInvoiceService.sendCurrency(this.currency);
      this.updateInvoiceData = res;
      let formData: { [key: string]: any } = {
        "tax": res.tax,
      };

      if (!this.duplicateInvoice) {
        formData = {
          ...formData,
          "invoice": {
            "invoiceNo": res.invoiceNo,
          }
        }
      }
      this.InvoiceForm.form?.patchValue(formData);
    });



    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.invoiceService.invoiceCategory = this.category;
      this.invoiceService.sendInvoiceCategory();
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
      if (this.duplicateInvoice) {
        this.invoiceId = null;
      }

      if (this.category !== "Quotations") {
        if (this.invoiceId) {
          this.updateInvoice(this.invoiceId, payload);
        } else {
          this.addInvoice(payload);
        }
      } else {
        this.addQuotation(payload)

      }
    }
  }


  addQuotation(payload: any) {
    this.quotationService.addQuotation(payload).subscribe((res: any) => {
      this.quotations = res;
      this.router.navigate(["/quotations"]);
      console.log(this.quotations, "QUOTATIONS DATA")
    })
  }

  updateQuotation() {

  }

  addInvoice(payload: any) {
    this.loaderService.ShowLoader();
    this.addInvoiceService.addInvoice(payload).pipe(take(1)).subscribe(
      (res: any) => {
        this.invoices = res;
        this.invoiceIDforsave = res.savedInvoice._id;
        this.loaderService.HideLoader();
        if (this.invoiceIDforsave) {
          this.router.navigate(["/save-invoice-page", this.invoiceIDforsave]);
        } else {
          console.error("Invoice ID is undefined!");
        }
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
        this.loaderService.HideLoader();
        this.notifier.show({
          type: 'error',
          message: 'something went wrong',
          id: 'THAT_NOTIFICATION_ID',
        });

        setTimeout(() => {
          this.notifier.hide('THAT_NOTIFICATION_ID');
        }, 2000);
        console.error(error);
      }
    );
  }

  updateInvoice(invoiceId: string, payload: { [key: string]: any }) {
    this.loaderService.ShowLoader();
    this.invoiceService.updateInvoice(invoiceId, payload).pipe(take(1)).subscribe(
      (res: any) => {
        this.invoices = res;
        this.loaderService.HideLoader();
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
        this.loaderService.HideLoader();
        console.error(error);
        this.notifier.show({
          type: 'error',
          message: 'something went wrong',
          id: 'THAT_NOTIFICATION_ID',
        });
        setTimeout(() => {
          this.notifier.hide('THAT_NOTIFICATION_ID');
        }, 2000);
      }
    );
  }



  getTaxes() {
    this.clientService.recieveTaxName().subscribe((res) => {
      this.taxType = res;
    });
  }


  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}




