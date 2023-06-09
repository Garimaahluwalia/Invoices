import { Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class ProductdetailsComponent {
  rowIndexes: number[] = [0];
  productNames: string[] = [];
  productDetails: string[] = [];
  serialNumber: number = 1;

  addProductRow(): void {
    const newRowId = this.rowIndexes.length;
    this.rowIndexes.push(newRowId);
  }
}
