import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-columns',
  templateUrl: './add-columns.component.html',
  styleUrls: ['./add-columns.component.css']
})
export class AddColumnsComponent {
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef<HTMLButtonElement>;

  openModal() {
    this.openModalButton.nativeElement.click();
  }


  closeModal(){

  }
}
