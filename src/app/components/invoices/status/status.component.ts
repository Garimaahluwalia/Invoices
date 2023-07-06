import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { STATUS } from 'src/app/types/status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {

  @Input() invoiceid: string | null = null;
  @Input() status: STATUS = STATUS.UNPAID;
  @Input() statuses: string[] = [];
  @Output() output: EventEmitter<STATUS> = new EventEmitter<STATUS>();



  constructor(
    public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute
  ) {}


  onStatusChange() {
    this.output.emit(this.status);
  }
}
