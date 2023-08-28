import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ReplaySubject, takeUntil } from 'rxjs';
import { numberToWords } from 'src/app/common/numberToWords';
import { ClientService } from 'src/app/services/clients/client.service';
import { IInvoice } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProfileService } from 'src/app/services/profile.service';
import { QuotationsService } from 'src/app/services/quotations/quotations.service';
import { CURRENCY } from 'src/app/types/currency';
import { DeleteEvents } from 'src/app/types/delete';
import { ModalEvents } from 'src/app/types/modal';
import { INVOICESTATUS } from 'src/app/types/invoiceStatus';
import { InvoiceTypes } from 'src/app/types/invoice-types';

@Component({
  selector: 'app-save-quotation-page',
  templateUrl: './save-quotation-page.component.html',
  styleUrls: ['./save-quotation-page.component.css']
})
export class SaveQuotationPageComponent {
  public quotationlist: any[] = [];
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
  public status: typeof INVOICESTATUS = INVOICESTATUS;
  public invoiceCategory!: string;


  constructor(
    public quotationService: QuotationsService,
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
      this.getQuotationById();
    });


    this.profileService.getProfile().pipe(takeUntil(this.destroyed)).subscribe(
      (response) => {
        this.invoiceImage = response.photoUrl;
      },
      (error) => {
        console.error('Profile update failed:', error);
      }
    );


    this.deleteService.recieveDeleteEvent()?.subscribe((res) => {
      const data = res;
      console.log(data, "delete response");
    })


    // this..recieveInvoiceCategory().subscribe((res: string) => {
    //   this.invoiceCategory = res;
    // });
  }


  getQuotationById() {
    this.loaderService.ShowLoader();
    this.quotationService.getQuotation(this._id)
      .pipe(takeUntil(this.destroyed))
      .subscribe((res) => {
        this.loaderService.HideLoader();
        console.log(res, "quotation response")
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

  updateQuotation(details: IInvoice) {
    this.route.navigate(["/add-invoice", details._id], { queryParams: { category: 'Quotations' } });
  }

  createQuotation() {
    this.route.navigate(["/add-invoice"], { queryParams: { category: 'Quotations' } });

  }

  emailQuotation(data: IInvoice) {
    console.log(data, "email invoice")
    this.route.navigate(["save-quotations-page", this._id, "invoice-email"]).then(() => {
      this.modalService.sendEvent(ModalEvents.SentInvoiceEmail, { status: true, data: { id: data._id, action: "save-quotations-page", type: InvoiceTypes.Quotation }, });
    });
  }

  downloadQuotation() {
    this.loading = true;
    this.quotationService.downloadQuotation(this._id)
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

  createAnotherQuotation() {
    this.route.navigate(['/add-invoice'], { queryParams: { category: 'Quotations' } });
  }



  duplicateQuotation(data: IInvoice) {
    this.route.navigate(["add-invoice", data._id], { queryParams: { duplicateInvoice: "duplicate" } })
  }


  deleteQuotation(_id: string) {
    this.quotationService.deleteQuotation(_id).pipe(takeUntil(this.destroyed)).subscribe(
      (res) => {
        this.route.navigate(["invoices"]).then(() => {
          this.quotationService.getAll();
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  deleteInvoices(data: IInvoice) {
    this.route.navigate(["save-quotation-page", data._id, "delete", data._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: data._id, action: "save-quotation-page" } });
    });
  }

  printPDF() {
    window.print();
  }

}
