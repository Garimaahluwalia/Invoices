import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-sent-email',
  templateUrl: './add-sent-email.component.html',
  styleUrls: ['./add-sent-email.component.css']
})
export class AddSentEmailComponent {
  @ViewChild("openModalButton", { static: false }) private openModalButton!: ElementRef;
  @ViewChild("closeModalButton", { static: false }) private closeModalButton!: ElementRef;


  openModal() {
    this.openModalButton?.nativeElement?.click();
  }
  closeModal() {

  }

  saveChanges() {

  }
}
