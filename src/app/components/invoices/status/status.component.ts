import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { STATUS } from 'src/app/types/status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @Input() invoiceid: any;
  @Input() status: STATUS = STATUS.UNPAID;
  // @Input() statuses: string[] = [];
  // @Output() output: EventEmitter<STATUS> = new EventEmitter<STATUS>();

  public updatestatus: any;



  constructor(
    public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute
  ) {}
  ngOnInit(): void {
   this.getstatus();
  }


  // onStatusChange() {
  //   this.output.emit(this.status);
  // }

  getstatus(){
     this.invoiceService.updateInvoiceStatus(this.invoiceid , this.status ).subscribe((res:any) => {
      this.updatestatus = res ;
      console.log(this.updatestatus, "response of update invoice status")
     },
     (error: any) => {
      console.error(error, "Error occurred while updating invoice Status")
     }
     )
  }

  // updateInvoiceStatus(status: STATUS, invoiceId: string): void {
  //   this.invoiceService.updateInvoiceStatus(invoiceId, status).subscribe(
  //     (res: any) => {
  //       // Save status in invoiceList;
  //       //console.log(this.invoiceId, "INVOICEID")
  //       // console.log(res, "Response of update invoice status");
  //     },
  //     (error: any) => {

  //       console.error(error, "Error occurred while updating invoice status");
  //     }
  //   );
  // }
}
