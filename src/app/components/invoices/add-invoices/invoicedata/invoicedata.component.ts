import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'app-invoicedata',
  templateUrl: './invoicedata.component.html',
  styleUrls: ['./invoicedata.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class InvoicedataComponent {
  @Input() invoice!: { [key: string]: string | number }
}
