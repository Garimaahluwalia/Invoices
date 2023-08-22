import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ReplaySubject, takeUntil } from 'rxjs';
import { numberToWords } from 'src/app/common/numberToWords';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ProfileService } from 'src/app/services/profile.service';
import { QuotationsService } from 'src/app/services/quotations/quotations.service';
import { CURRENCY } from 'src/app/types/currency';

@Component({
  selector: 'app-quotation-list-details',
  templateUrl: './quotation-list-details.component.html',
  styleUrls: ['./quotation-list-details.component.css']
})
export class QuotationListDetailsComponent {
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
  constructor(
    public quotationService: QuotationsService,
    public route: Router,
    public router: ActivatedRoute,
    public clientService: ClientService,
    public addinvoiceService: AddInvoicesService,
    public profileService: ProfileService,
    public notifierService: NotifierService,
    public loaderService: LoaderService,
    public datePipe: DatePipe
  ) { this.notifier = notifierService; }


  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this._id = params['id'];
      this.getInvoiceById();
    });


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
    this.quotationService.getQuotation(this._id)
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


  downloadInvoice() {
    this.loading = true;
    this.quotationService.downloadInvoice(this._id)
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

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
