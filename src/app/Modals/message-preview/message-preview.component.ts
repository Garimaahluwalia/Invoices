import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceTypes } from 'src/app/types/invoice-types';

@Component({
  selector: 'app-message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.css']
})
export class MessagePreviewComponent {
  @ViewChild("openModalButtonPreview", { static: false }) private openModalButton!: ElementRef;
  @ViewChild("closeModalButtonPreview", { static: false }) private closeModalButton!: ElementRef;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  public readonly INVOICE_TYPES = InvoiceTypes;
  public selectedInvoice: any = null;

  constructor(public route: Router) {

  }
  openModal(): void {
    this.openModalButton.nativeElement.click();
  }

  closeModal() {
    try {
      this.closeModalButton.nativeElement.click();
    } catch (e) {
      console.log(e);
    } finally {
      this.close.emit(true);
    }
  }

  saveChanges() {

  }

  updateValues(selectedInvoice: any) {
    this.selectedInvoice = selectedInvoice;
  }

  // viewInvoice() {
  //   if (this.selectedInvoice.type === this.INVOICE_TYPES.Invoice) {
  //     this.route.navigate(["/view-invoice-list", this.selectedInvoice._id])
  //   } else {
  //     this.route.navigate(["/view-quotation-list", this.selectedInvoice._id])
  //   }
  // }
}
