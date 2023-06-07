import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import endpoints from 'src/app/endpoints';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { Invoice } from 'src/app/types/invoice';

@Component({
  selector: 'app-invoice-list-details',
  templateUrl: './invoice-list-details.component.html',
  styleUrls: ['./invoice-list-details.component.css']
})
export class InvoiceListDetailsComponent implements OnInit {
  public: any;
  invoicelist: any[] = [];
  invoices: any;
  _id: any;
  constructor(public invoiceService: InvoiceService, public route: Router, public router: ActivatedRoute) { }
  ngOnInit(): void {
    
    this.router.params.subscribe(params => {
      this._id = params['id'];
      // console.log(this._id, "Id");
      this.viewInvoice(); 
    });
  
  }

  viewInvoice() {
    this.invoiceService.getInvoice(this._id).subscribe(
      (res: any) => {
        this.invoicelist = [res];
        console.log(this.invoicelist, "view invoice list");
      },
      (error: any) => {
        console.error('Failed to fetch invoice data:', error);
      }
    );
  }
  
  
}