import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';

@Component({
  selector: 'app-invoice-list-details',
  templateUrl: './invoice-list-details.component.html',
  styleUrls: ['./invoice-list-details.component.css']
})
export class InvoiceListDetailsComponent implements OnInit {
  public invoicelist: any[] = [];
  public _id!: string;
  public data: any;
  public description: any | null = null;



  constructor(
    public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute,
    public clientService: ClientService,
    public addinvoiceService: AddInvoicesService
  ) { }


  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this._id = params['id'];
    });
    this.getInvoiceById();
  }


  getInvoiceById() {
    this.invoiceService.getInvoice(this._id).subscribe((res) => {
      this.data = [res];
      const value = this.data[0].products;
      value.forEach((value: { description: any; }) => {
        this.description = value.description;
      });
    })
  }
}