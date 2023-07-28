import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ReplaySubject, takeUntil } from 'rxjs';
import { numberToWords } from 'src/app/common/numberToWords';
import { ClientService } from 'src/app/services/clients/client.service';
import { IInvoice } from 'src/app/services/invoice-data-handler/invoice-data-handler.dto';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ProfileService } from 'src/app/services/profile.service';

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
  public products : any[] = [];
  public totalAmountInWords!: number;
  public subtotalofamount! : number;
  public totalamount! : number;
  public totalInWords! : string;
  public invoiceImage! : string;
   private readonly notifier!: NotifierService;


  constructor(
    public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute,
    public clientService: ClientService,
    public addinvoiceService: AddInvoicesService,
    public profileService: ProfileService,
    public notifierService: NotifierService,
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
  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  getInvoiceById() {
    this.invoiceService.getInvoice(this._id)
      .pipe(takeUntil(this.destroyed))
      .subscribe((res) => {
        this.data = res;
        this.products = res.products;
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
          setTimeout(() => {
            this.notifier.hide('THAT_NOTIFICATION_ID');
          }, 2000);
        }
      });
  }

}
