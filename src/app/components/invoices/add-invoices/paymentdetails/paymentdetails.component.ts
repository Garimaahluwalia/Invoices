import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';
import { numberToWords } from "src/app/types/number-to-words";


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


  constructor(public clientService: ClientService, public addinvoiceService: AddInvoicesService) { }
  ngOnInit(): void {

    this.addinvoiceService.recieveProductRows().subscribe((res: any[]) => {
      this.productRows = res;
      if (res.length > 0) {
        const firstElement = res[0];
        this.amount = firstElement.amount;
        this.tax = firstElement.tax;
        this.rate = firstElement.rate;
        this.total = firstElement.total;
        if (this.productRows.length > 0) {
          this.totalAmount = parseFloat(this.productRows.reduce((total: any, row: { amount: any; }) => total + row.amount, 0)).toFixed(2);
          this.totalrate = parseFloat(this.productRows.reduce((total: any, row: { rate: any }) => total + parseFloat(row.rate), 0)).toFixed(2);
          this.totalTotalAmount = parseFloat(this.productRows.reduce((total: number, row: { total: string; }) => total + parseFloat(row.total), 0)).toFixed(2);
          this.totalAmountInWords = numberToWords(parseFloat(this.totalTotalAmount));
          // console.log(this.totalAmountInWords, "Amountinwords")


          if (isNaN(this.totalAmount)) {
            this.totalAmount = "0.00";
          }
          if (isNaN(this.totalrate)) {
            this.totalrate = "0.00";
          }
          if (isNaN(this.totalTotalAmount)) {
            this.totalTotalAmount = "0.00";
          }
        } else {
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

  public Bankdetails: { [k: string]: string } = {
    "BankName": "M CODE INFOSOFT",
    "cardHolderName": "M CODE INFOSOFT",
    "accountNumber": "098878776809454",
    "IFSCCode": "DQCPK3553H",
  }



}
