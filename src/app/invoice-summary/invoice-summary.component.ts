import { Component, Input } from '@angular/core';
import { IInvoice } from '../services/invoice-data-handler/invoice-data-handler.dto';
import { CdkAccordionModule } from '@angular/cdk/accordion';
@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css'],

})
export class InvoiceSummaryComponent {
  @Input() data!: IInvoice;
  items = ['Item 1'];
}
