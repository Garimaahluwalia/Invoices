import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { LoginService } from 'src/app/services/auth/login.service';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { IInvoice } from 'src/app/types/invoice';

@Component({
  selector: 'app-main-invoice',
  templateUrl: './main-invoice.component.html',
  styleUrls: ['./main-invoice.component.css']
})
export class MainInvoiceComponent implements OnInit {
  public DashboardCount: any;
  public currentPage = 1;
  public itemsPerPage = 12;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

  constructor(public invoiceService: InvoiceService,
    public clientService: ClientService,
    public loginService: LoginService) { }


  ngOnInit() {
    this.loginService.getDashboardCounts().pipe(takeUntil(this.destroyed)).subscribe((res) => {
      this.DashboardCount = res;
    })
  }
  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
