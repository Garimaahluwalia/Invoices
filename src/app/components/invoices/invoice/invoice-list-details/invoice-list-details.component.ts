import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ReplaySubject, firstValueFrom, take, takeUntil } from 'rxjs';
import { numberToWords } from 'src/app/common/numberToWords';
import { ClientService } from 'src/app/services/clients/client.service';
import { IInvoice, IProducts } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ProfileService } from 'src/app/services/profile.service';
import { CURRENCY } from 'src/app/types/currency';
import { IProductRows } from 'src/app/types/product';
import { DatePipe } from '@angular/common';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents, ROUTER_ACTIONS } from 'src/app/types/modal';
import { InvoiceTypes } from 'src/app/types/invoice-types';
import { DeleteEvents } from 'src/app/types/delete';
import { DeleteService } from 'src/app/services/modal/delete.service';

@Component({
  selector: 'app-invoice-list-details',
  templateUrl: './invoice-list-details.component.html',
  styleUrls: ['./invoice-list-details.component.css']
})
export class InvoiceListDetailsComponent implements OnInit {
  public invoicelist: IInvoice[] = [];
  public _id!: string;
  public data: any;
  public description: any | null = null;
  public download!: string;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public products: any[] = [];
  public totalAmountInWords!: number;
  public subtotalofamount!: number;
  public totalamount!: number;
  public totalInWords!: string;
  public invoiceImage!: string;
  private readonly notifier!: NotifierService;
  public table: import("d:/INVOICE/invoice/my-app/src/app/types/columnType").Field[] | undefined;
  public inputcurrency: any;
  public currencies = CURRENCY;
  public currencyData: any;
  public loading = false;
  constructor(
    public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute,
    public clientService: ClientService,
    public addinvoiceService: AddInvoicesService,
    public profileService: ProfileService,
    public notifierService: NotifierService,
    public loaderService: LoaderService,
    public datePipe: DatePipe,
    public modalService: ModalService,
    public deleteService: DeleteService
  ) { this.notifier = notifierService; }


  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this._id = params['id'];
      this.getInvoiceById();
    });


    this.deleteService.recieveDeleteEvent()?.subscribe((res) => {
      const data = res;
      console.log(data, "delete invoice")
      this.deleteInvoice(res?.['id'] as string);
    })


    this.profileService.getProfile().pipe(takeUntil(this.destroyed)).subscribe(
      (response) => {
        this.invoiceImage = response.photoUrl;
      },
      (error) => {
        console.error('Profile update failed:', error);
      }
    );
  }


  getInvoiceById() {
    this.loaderService.ShowLoader();
    this.invoiceService.getInvoice(this._id)
      .pipe(takeUntil(this.destroyed))
      .subscribe((res) => {
        this.loaderService.HideLoader();
        this.table = res.table;
        this.data = res;
        this.products = res.products;
        const currency = this.currencies.find(currency => currency.code === this.data.currency);
        this.currencyData = currency?.symbol;


        this.subtotalofamount = this.data.subtotalofamount;
        this.totalamount = this.data.totalamount;
        this.totalInWords = '';
        if (this.totalamount === 0) {
          this.totalInWords = numberToWords(this.subtotalofamount.toString());
        } else {
          this.totalInWords = numberToWords(this.totalamount.toString());
        }
      });
  }


  updateInvoice(details: IInvoice) {
    this.route.navigate(["/add-invoice", details._id]);
  }



  emailInvoice(data: IInvoice) {
    console.log(data, "email invoice")
    this.route.navigate(["save-invoice-page", this._id, "sent-email"]).then(() => {
      this.modalService.sendEvent(ModalEvents.SentEmail, { status: true, data: { id: data._id, action: "save-invoice-page", type: InvoiceTypes.Invoice } });
    });
  }

  downloadInvoice() {
    this.loading = true;
    this.invoiceService.downloadInvoice(this._id)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (response: any) => {
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response.body);
          let downloadLink = document.createElement('a');
          const URI = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
          downloadLink.href = URI;
          downloadLink.setAttribute('download', `invoice_${this._id}.pdf`);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          setTimeout(() => {
            downloadLink.remove();
            window.URL.revokeObjectURL(URI);
          }, 1000);
        },
        complete: () => {
          this.notifier.show({
            type: 'success',
            message: 'Invoice downloaded successfully',
            id: 'THAT_NOTIFICATION_ID',
          });
          this.loading = false;
          setTimeout(() => {
            this.notifier.hide('THAT_NOTIFICATION_ID');
          }, 2000);
        }
      });
  }

  createAnotherInvoice() {
    this.route.navigate(["add-invoice"])
  }

  recordPayment(data: IInvoice) {
    this.route.navigate(["save-invoice-page", this._id, "record-payment"]).then(() => {
      this.modalService.sendEvent(ModalEvents.RecordPayment, { status: true, data: { id: data._id, action: ROUTER_ACTIONS.SAVE_INVOICE_PAGE } });
    });
  }

  duplicateInvoice(data: IInvoice) {
    this.route.navigate(["add-invoice", data._id], { queryParams: { duplicateInvoice: "duplicate" } })
  }

  updateStatus(data: IInvoice, status: string) {
    this.route.navigate(["save-invoice-page", data._id, "invoice-actions", data._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.invoiceactions, {
        status: true,
        data: {
          id: data._id,
          event: DeleteEvents.INVOICE_ACTIONS,
          status: status,
          action: "save-invoice-page"
        }
      });
    });
  }

  async deleteInvoice(_id: string) {
    try {
      const d = await firstValueFrom(this.invoiceService.deleteInvoice(_id).pipe(take(1)));
      this.route.navigate(["invoice"]).then(() => {
        this.invoiceService.getAll();
      });
    } catch (e) {
      console.error(e)
    }
    
  }

  deleteInvoices(data: IInvoice) {
    this.route.navigate(["view-invoice-list", data._id, "delete"]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: data._id, action: ROUTER_ACTIONS.VIEW_INVOICE_LIST } });
    });
  }


  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
