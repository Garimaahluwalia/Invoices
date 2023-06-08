import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef;
  name ! : string;
  email!:string;
  phoneNo! : string;
  RegisteredOn! : string;
  data: any;



  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.AddClient).subscribe(res => {
      const { status, data } = res;
      this.data = data;
      console.log(res, "adduser");
      if (status) {
        this.openModal();
      } else {
        this.closeModal();
      }
    });
  }

  ngOnInit(): void {
  
  }
  constructor(public router: Router, public modalService: ModalService, public clientService: ClientService){}


  closeModal() {
    this.closeModalButton?.nativeElement.click();
    this.router.navigate(["clients"]);
  }

  openModal() {
    this.openModalButton?.nativeElement.click();
  }
  saveChanges(){
    let newData = {name : this.name, email: this.email, phoneNo : this.phoneNo , RegisteredOn: this.RegisteredOn}
    if(this.data?.edit){
      this.clientService.updateClientReq(this.data.ClientId, newData).subscribe(() => {
        this.clientService.getAll();
        this.closeModal();
      }, err => {
        console.error(err);
        this.closeModal();
      })
    }
    else{
      this.clientService.sendPost(newData).subscribe(() => {
        this.clientService.getAll();
        this.closeModal();
      }, (err: any) => {
        console.error(err);
        this.closeModal();
      })
    }
  }

  // saveChanges() {
  //   let newData = { page: this.page, url: this.url, slug: this.slug };
  //   // console.log(newData, "NavigationsItems");
  //   if (this.data?.edit) {
  //     this.pageService.sendUpdateRequest(this.data.pageId, newData).subscribe(() => {
  //       this.pageService.getAll();
  //       this.closeModal();
  //     }, err => {
  //       console.error(err);
  //       this.closeModal();
  //     });
  //   } else {
  //     this.pageService.sendPostRequest(newData).subscribe(() => {
  //       this.pageService.getAll();
  //       this.closeModal();
  //     }, err => {
  //       console.error(err);
  //       this.closeModal();
  //     });
  //   }
  // }
}
