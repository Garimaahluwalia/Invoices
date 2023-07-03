import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { IbankDetails } from 'src/app/types/invoice';
import { numberToWords } from "src/app/common/numberToWords";
import { InvoiceService } from 'src/app/services/invoices/invoice.service';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class PaymentdetailsComponent implements OnInit {
  public amount: any;
  public tax: any;
  public rate: any;
  public total: any;
  public currency: any;
  public taxAmountData: any;
  public totalAmount: any;
  public totalrate: any;
  public productRows: any[] = [];
  public totalTotalAmount: any;
  public AmountInWords: any;
  public totalAmountInWords!: string;
  public totalOfAllItemsFromProduct: any;
  public totalOfAmountFromProduct: any;
  public taxamount: any;
  public GetInvoiceAndEmit: any;

  constructor(public clientService: ClientService,
    public addinvoiceService: AddInvoicesService,
    public invoiceService: InvoiceService) { }
  ngOnInit(): void {

    // this.invoiceService.invoiceEmitter.subscribe((res:any) => {
    //   this.GetInvoiceAndEmit = res;
    //   console.log(this.GetInvoiceAndEmit, "GetInvoiceandemit");
    // })



    this.addinvoiceService.recieveProductRows().subscribe((res: any[]) => {
      this.productRows = res;

      if (res.length > 0) {
        const firstElement = res[0];
        this.amount = firstElement.amount;
        this.tax = firstElement.tax;
        this.rate = firstElement.rate;
        this.taxamount = firstElement.taxamount;
        this.total = firstElement.total;
        if (this.productRows.length > 0) {
          this.totalOfAllItemsFromProduct = this.productRows.reduce((acc, row) => acc + parseFloat(row.total), 0).toFixed(2);
          this.totalOfAmountFromProduct = this.productRows.reduce((acc, row) => acc + row.amount, 0);
          this.totalrate = this.productRows.reduce((total, row) => total + parseFloat(row.rate), 0);
          this.totalAmountInWords = !isNaN(parseFloat(this.totalOfAllItemsFromProduct)) ? numberToWords(this.totalOfAllItemsFromProduct) : (parseFloat(this.totalOfAmountFromProduct) ? numberToWords(this.totalOfAmountFromProduct) : "");


          if (isNaN(this.totalAmount)) {
            this.totalAmount = "0.00";
          }
          if (isNaN(this.totalrate)) {
            this.totalrate = "0.00";
          }
          if (isNaN(this.totalTotalAmount)) {
            this.totalTotalAmount = "0.00";
          }
        }
        else {
          this.totalAmount = 0;
          this.totalTotalAmount = 0;
        }
      }
    });

    this.addinvoiceService.receiveCurrency().subscribe((res: any) => {
      this.currency = res;
    });

    if (!this.currency || this.currency === '') {
      this.currency = '$';
    }

    this.clientService.recieveTaxName().subscribe((res: any) => {
      this.tax = res;

    });

    this.addinvoiceService.receiveCurrency().subscribe((res: any) => {
      this.currency = res;

    });
  }


  public Bankdetails: IbankDetails = {
    "accountHolderName": "M CODE INFOSOFT",
    "accountNumber": "098878776809454",
    "ifscCode": "ICICINBBCTS",
    "swiftCode": "9898BHBZA23",
    "bank": "ICICI Bank Ltd.",
  };

}
