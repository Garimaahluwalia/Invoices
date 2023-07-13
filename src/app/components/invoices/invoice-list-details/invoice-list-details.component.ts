import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { numberToWords } from 'src/app/common/numberToWords';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';

@Component({
  selector: 'app-invoice-list-details',
  templateUrl: './invoice-list-details.component.html',
  styleUrls: ['./invoice-list-details.component.css']
})
export class InvoiceListDetailsComponent implements OnInit {
  public invoicelist: any[] = [];
  public _id!: string;
  public data: any;
  public description: any | null = null;
  public download: any;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public products : any[] = [];
  public totalAmountInWords: any;
  public subtotalofamount : any;
  public totalamount : any
  public totalInWords : any;


  constructor(
    public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute,
    public clientService: ClientService,
    public addinvoiceService: AddInvoicesService
  ) { }


  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this._id = params['id'];
      this.getInvoiceById();
    });
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

  downloadInvoice(){
    this.invoiceService.downloadInvoice(this._id).pipe(takeUntil(this.destroyed)).subscribe((response: any) => {
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response.body);
      let downloadLink = document.createElement('a');
      const URI = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.href = URI;
      downloadLink.setAttribute('download',
        `invoice_${this._id}.pdf`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(() => {
        downloadLink.remove();
        window.URL.revokeObjectURL(URI);
      }, 2000);
    })
  }


}