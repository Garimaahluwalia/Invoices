import { Component, ElementRef, ViewChild } from '@angular/core';
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

constructor(public modalService: ModalService, public deleteService: DeleteService){}

  ngAfterViewInit():void{
    this.modalService.recieveEvent(ModalEvents.Delete).subscribe((res => {
      const {data, status}= res;
      this.data = data, status;
      if(status){
        this.openModal();
      }else{
        this.closeModal();
      }
    }))
  }
  closeModal() {
    this.closeDeleteModalButton.nativeElement.click();
  }

  openModal() {
    this.openDeleteModal.nativeElement.click();
  }
  yes(){
    this.deleteService.selectedId = this.data.id;
    const event = this.data.event as DeleteEvents;
    this.closeModal();
    this.deleteService.sendEvent(event, true)
  }
  no(){
    this.deleteService.selectedId = this.data.id;
    const event = this.data.event as DeleteEvents;
    this.closeModal();
    this.deleteService.sendEvent(event, false);

  }
}
