import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-add-sent-email',
  templateUrl: './add-sent-email.component.html',
  styleUrls: ['./add-sent-email.component.css']
})
export class AddSentEmailComponent {
  @ViewChild("openModalButton", { static: false }) private openModalButton!: ElementRef;
  @ViewChild("closeModalButton", { static: false }) private closeModalButton!: ElementRef;
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;


  constructor(public modalService: ModalService) { }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.SentInvoiceEmail).pipe(takeUntil(this.destroyed)).subscribe((res => {
      const { data, status, } = res;
      this.data = data, status;
      console.log(this.data, "DATA LOADED")
      if (status || data) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }));
  }

  openModal() {
    this.openModalButton?.nativeElement?.click();
  }

  closeModal() {
    this.closeModalButton?.nativeElement?.click();
  }

  saveChanges() {

  }
}
