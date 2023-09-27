import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IInvoice } from '../../../../services/invoice-data-handler/invoice-data-handler.dto';
import { CURRENCY } from 'src/app/types/currency';
@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css'],

})
export class InvoiceSummaryComponent implements OnInit {

  @Input() data!: IInvoice;
  public currencies = CURRENCY;
  public currencyData: any;
  public invoices:any;


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes , "summary ")
  }

  ngOnInit(): void {
   console.log(this.data, "invoice summary data")
  }

}
