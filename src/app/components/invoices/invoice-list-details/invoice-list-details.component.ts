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
  public filteredProducts: any[] = [];
  public invoicelist: any[] = [];
  public _id!: string;
  public matchedInvoice: any;
  public totalOfrateFromProduct: any;
  public totalAmountInWords!: string;
  public totalOfAllItemsFromProduct: any;
  public totalOfAmountFromProduct: any;
  public data: any;



  constructor(
    public invoiceService: InvoiceService,
    public route: Router,
    public router: ActivatedRoute,
    public clientService: ClientService,
    public addinvoiceService: AddInvoicesService
  ) { }


  ngOnInit(): void {
    this.getInvoiceById();
    this.router.params.subscribe(params => {
      this._id = params['id'];
      this.ViewInvoices();
    });
  }


  getInvoiceById() {
    this.invoiceService.getInvoice(this._id).subscribe((res) => {
      this.data = res;
    })
  }

  ViewInvoices() {
    this.invoiceService.getAllInvoice().subscribe((res: any) => {
      this.invoicelist = res.invoices;
      this.matchedInvoice = this.invoicelist.filter((invoice: any) => invoice._id === this._id);

      if (this.matchedInvoice.length > 0) {
        this.filteredProducts = this.matchedInvoice[0].products;
      } else {
        this.filteredProducts = [];
      }
      this.totalOfAllItemsFromProduct = parseFloat(this.filteredProducts.reduce((acc, row) => acc + parseFloat(row.total), 0)).toFixed(2);
      this.totalOfAmountFromProduct = this.filteredProducts.reduce((acc, row) => acc + parseInt(row.amount), 0);
      this.totalOfrateFromProduct = parseFloat(this.filteredProducts.reduce((total: any, row: { rate: any }) => total + parseFloat(row.rate), 0)).toFixed(2);
    });
  }
}