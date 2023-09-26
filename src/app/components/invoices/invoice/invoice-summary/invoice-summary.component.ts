import { Component, Input, OnInit } from '@angular/core';
import { IInvoice } from '../../../../services/invoice-data-handler/invoice-data-handler.dto';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CURRENCY } from 'src/app/types/currency';
@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css'],

})
export class InvoiceSummaryComponent implements OnInit {

  @Input() data!: IInvoice;
  // public currencies = CURRENCY;
  // public currencyData: any;

  ngOnInit(): void {
  //  console.log(this.data, "invoice summary data")
  //  const currency = this.currencies.find(currency => currency.code === this.data.currency);
  //  this.currencyData = currency?.symbol;

  }

}
