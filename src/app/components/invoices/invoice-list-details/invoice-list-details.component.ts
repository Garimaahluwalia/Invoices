import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import endpoints from 'src/app/endpoints';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { Invoice } from 'src/app/types/invoice';
import { numberToWords } from "src/app/common/numberToWords";


@Component({
  selector: 'app-invoice-list-details',
  templateUrl: './invoice-list-details.component.html',
  styleUrls: ['./invoice-list-details.component.css']
})
export class InvoiceListDetailsComponent implements OnInit {
  public invoicelist: any[] = [];
  public _id!: string;
  public taxName: any
  public invoicesFilter: any[] = [];
  public matchedInvoice: any;
  public amount: any;
  public tax: any;
  public rate: any;
  public total: any;
  public currency: any;
  public taxAmountData: any;
  public totalAmount: any;
  public totalrate: any;
  public productRows: any[] = [];
  public totalTotalAmount: any;
  public AmountInWords: any;
  public totalAmountInWords!: string;
  constructor(
    public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute,
    public clientService: ClientService,
    public addinvoiceService : AddInvoicesService
  ) { }


  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this._id = params['id'];
      console.log(this._id, "invoiceid")
      this.ViewInvoices();
    });





    this.clientService.recieveTaxName().subscribe((res: any) => {
      this.taxName = res;
      console.log(this.taxName , "TaxNAme")
    })

  }
  ViewInvoices() {
    this.invoiceService.getAllInvoice().subscribe((res: any) => {
      this.invoicelist = res.invoices;
      this.matchedInvoice = this.invoicelist.filter((invoice: any) => invoice._id === this._id);
      console.log(this.matchedInvoice, "filteredData of  viewInvoice")
    });
  }


  // viewInvoice() {
  //   this.invoiceService.getInvoice(this._id).subscribe(
  //     (res: any) => {
  //       this.invoicelist = [res];
  //       console.log(this.invoicelist, "view invoice list");
  //     },
  //     (error: any) => {
  //       console.error('Failed to fetch invoice data:', error);
  //     }
  //   );
  // }


}