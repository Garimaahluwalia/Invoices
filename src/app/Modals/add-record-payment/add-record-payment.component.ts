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
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef<HTMLButtonElement>;
  data: any;


  constructor(public modalService: ModalService) { }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.RecordPayment).subscribe(res => {
      const { status, data } = res;
      this.data = data;
    });
  }



  openModal() {
    this.openModalButton?.nativeElement?.click();
  }

  closeModal() {
    this.closeModalButton?.nativeElement.click();
  }

  saveChanges() {
    this.closeModal();
  }
}
