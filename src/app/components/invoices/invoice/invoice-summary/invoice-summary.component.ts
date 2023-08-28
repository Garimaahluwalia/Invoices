import { Component, Input, OnInit } from '@angular/core';
import { IInvoice } from '../../../../services/invoice-data-handler/invoice-data-handler.dto';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CURRENCY } from 'src/app/types/currency';
@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css'],

})
export class InvoiceSummaryComponent {
  @Input() data!: IInvoice;
  public currencies = CURRENCY;
  public currencyData: any;
}
