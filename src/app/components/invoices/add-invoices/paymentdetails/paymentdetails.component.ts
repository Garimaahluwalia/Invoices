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
  constructor(public clientService: ClientService, public addinvoiceService: AddInvoicesService) { }
  ngOnInit(): void {
    this.addinvoiceService.recieveProductRows().subscribe((res: any) => {
      console.log(res, "amountData")
    })

  }
  amount = '';
  tax = '';
  total = '';
  public Bankdetails: { [k: string]: string } = {
    "BankName": "M CODE INFOSOFT",
    "cardHolderName": "M CODE INFOSOFT",
    "accountNumber": "098878776809454",
    "IFSCCode": "DQCPK3553H",
  }

}
