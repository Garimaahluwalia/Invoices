import { Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ShippingaddressComponent {

}
