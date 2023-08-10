import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-add-record-payment',
  templateUrl: './add-record-payment.component.html',
  styleUrls: ['./add-record-payment.component.css']
})
export class AddRecordPaymentComponent {
  @ViewChild('openRecordModal', { static: false }) private openRecordModal!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeRecordModal', { static: false }) private closeRecordModal!: ElementRef<HTMLButtonElement>;


  openModal() {
    this.openRecordModal?.nativeElement?.click();
  }
  closeModal() {
    this.closeRecordModal?.nativeElement.click();
  }

  saveChanges() {

  }
}
