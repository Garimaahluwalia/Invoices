import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { STATUS } from 'src/app/types/status';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  public statues: string[] = Object.values(STATUS);
  public selectedStatus: STATUS = STATUS.UNPAID;
  public invoiceId: any;

  public _id!: string;
  public updateStatus: any;


  constructor(public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute,) { }

  ngOnInit(): void {

    this.invoiceService.recieveInvoices().subscribe((data: any) => {
      this.invoiceId = data._id;
      console.log(this.invoiceId, "jwejijwgh")
      // console.log(this.invoices, "The InvoicesID from status ")
    });


    // this.invoiceService.updateInvoiceStatus(this._id).subscribe((res: any) => {
    //   this.updateStatus = res;
    //   console.log(this.updateStatus, "Response of update invoice status")

    // })
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.target.value;
    this.invoiceService.sendStatus(this.selectedStatus
    )
  }

}
