import { Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
@Component({
  selector: 'app-billingaddress',
  templateUrl: './billingaddress.component.html',
  styleUrls: ['./billingaddress.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class BillingaddressComponent {

}
