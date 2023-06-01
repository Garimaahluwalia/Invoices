import { Component, OnInit } from '@angular/core';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';

@Component({
  selector: 'app-invoice-list-details',
  templateUrl: './invoice-list-details.component.html',
  styleUrls: ['./invoice-list-details.component.css']
})
export class InvoiceListDetailsComponent implements OnInit {
  public invoicelist: any;
  constructor(public addinvoiceService: AddInvoicesService) { }
  ngOnInit(): void {
    this.invoicelist = this.addinvoiceService.invoiceListData;
    console.log(this.invoicelist, "invoicelistData");
  }

}
