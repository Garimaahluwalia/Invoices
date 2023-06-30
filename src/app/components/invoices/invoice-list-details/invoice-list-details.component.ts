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
  public filteredProducts: any[] = [];
  public invoicelist: any[] = [];
  public _id!: string;
  public taxName: any
  public invoicesFilter: any[] = [];
  public matchedInvoice: any;
  public taxAmountData: any;
  public totalAmount: any;
  public totalrate: any;
  public totalAmountInWords!: string;
  public totalofAmount = 0;
  public totalTaxAmount = 0;




  constructor(
    public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute,
    public clientService: ClientService,
    public addinvoiceService: AddInvoicesService
  ) {}


  ngOnInit(): void {
    // this.addinvoiceService.rec

    this.router.params.subscribe(params => {
      this._id = params['id'];
      console.log(this._id, "invoiceid")
      this.ViewInvoices();
    });

  }


  ViewInvoices() {
    this.invoiceService.getAllInvoice().subscribe((res: any) => {
      this.invoicelist = res.invoices;
      this.matchedInvoice = this.invoicelist.filter((invoice: any) => invoice._id === this._id);

      if (this.matchedInvoice.length > 0) {
        this.filteredProducts = this.matchedInvoice[0].products;
      } else {
        this.filteredProducts = [];
      }

      let totalofAmount = 0;
      let totalTaxAmount = 0;


      for (const product of this.filteredProducts) {
        totalofAmount += product.amount;
        totalTaxAmount += parseFloat(product.rate);
      }


      this.totalofAmount = Number(totalofAmount.toFixed(2));
      this.totalTaxAmount = Number(totalTaxAmount.toFixed(2));
      this.totalAmountInWords = this.totalofAmount ? numberToWords(this.totalofAmount.toString()) : "";
      console.log(this.totalAmountInWords, "Amount In Words");
      console.log(this.totalofAmount, "Total of Amount");
      console.log(this.totalTaxAmount, "Total Tax Amount");
      console.log(this.filteredProducts, "Filtered Products Array");


    });
  }





}