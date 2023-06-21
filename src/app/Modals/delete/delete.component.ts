import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { DeleteEvents } from 'src/app/types/delete';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  @ViewChild("closeDeleteModalButton", { static: false }) private closeDeleteModalButton!: ElementRef;
  @ViewChild("openDeleteModal", { static: false }) private openDeleteModal!: ElementRef;
  data: any;
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);

  constructor(public modalService: ModalService, public deleteService: DeleteService, public router: Router) { }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.Delete).pipe(takeUntil(this.destroyed)).subscribe((res => {
      const { data, status } = res;
      this.data = data, status;
      if (status || data) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }))
  }



  closeModal() {
    this.destroyed.next(true);
    this.destroyed.complete();
    this.closeDeleteModalButton.nativeElement.click();
    if(this.router.url.includes("clients")){
      this.router.navigate(["/clients"]);
    }else if(this.router.url.includes("invoice")){
      this.router.navigate(["invoice"]).then(() => {
        this.modalService.sendEvent(ModalEvents.Delete, {status : false})
      });
    }
  }

  openModal() {
    this.openDeleteModal.nativeElement.click();
  }

  yes() {
    this.deleteService.selectedId = this.data.id;
    const event = this.data.event as DeleteEvents;
    this.closeModal();
    this.deleteService.sendEvent(event, true)
  }
  no() {
    this.deleteService.selectedId = this.data.id;
    const event = this.data.event as DeleteEvents;
    this.closeModal();
    this.deleteService.sendEvent(event, false);

  }
}
