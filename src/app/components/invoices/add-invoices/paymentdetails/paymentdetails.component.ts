import { Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class PaymentdetailsComponent {
  public Bankdetails: { [k: string]: string } = {
    "BankName": "M CODE INFOSOFT",
    "cardHolderName": "M CODE INFOSOFT",
    "accountNumber": "098878776809454",
    "IFSCCode": "DQCPK3553H",
  }

}
