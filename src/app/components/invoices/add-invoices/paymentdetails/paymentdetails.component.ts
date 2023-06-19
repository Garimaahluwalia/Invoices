import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ClientService } from 'src/app/services/clients/client.service';
import { AddInvoicesService } from 'src/app/services/invoices/add-invoices.service';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class PaymentdetailsComponent implements OnInit {
  amount: any;
  tax: any;
  rate: any;
  total: any;
  currency: any;
  taxAmountData:any;
  constructor(public clientService: ClientService, public addinvoiceService: AddInvoicesService) { }
  ngOnInit(): void {
    this.addinvoiceService.recieveProductRows().subscribe((res: any[]) => {
      if (res.length > 0) {
        const firstElement = res[0];
        this.amount = firstElement.amount;
        this.tax = firstElement.tax;
        this.rate = firstElement.rate;
        this.total = firstElement.total;
        // console.log(this.amount, this.tax, this.total);
      }
    });

    this.addinvoiceService.receiveCurrency().subscribe((res:any)=> {
      this.currency = res;
      console.log(res, 'rescurrency')
    });
  }


  public Bankdetails: { [k: string]: string } = {
    "BankName": "M CODE INFOSOFT",
    "cardHolderName": "M CODE INFOSOFT",
    "accountNumber": "098878776809454",
    "IFSCCode": "DQCPK3553H",
  }

}
