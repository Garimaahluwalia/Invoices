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
  phoneNumber! : string;
  registeredNo! : string;
  data: any;
  country! : string;
  state!:string;
  city!:string;
  zipcode!:string;
  street!:string;
  BusinessAlias!:string;
  UniqueKey!:number;
  emailadress!: string
  phone!:number;
 



  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.AddorUpdateClient).subscribe(res => {
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
    if (this.router.url.includes("clients")) {
      this.router.navigate(["clients"]);
    } else if (this.router.url.includes("add-invoice")) {
      this.router.navigate(["add-invoice"]);
    }
  }
  

  openModal() {
    this.openModalButton?.nativeElement.click();
    this.setData();
  }
  setData() {
    if (this.data?.edit) {
      this.name = this.data.name;
      this.email = this.data.email;
      this.phoneNumber = this.data.phoneNumber;
      this.registeredNo = this.data.registeredNo;
    }
  }
  saveChanges(){
    let newData = {name : this.name, email: this.email, phoneNumber : this.phoneNumber , registeredNo: this.registeredNo,
      country : this.country, state : this.state ,city:this.city , zipcode:this.zipcode , street : this.street , BusinessAlias : this.BusinessAlias ,UniqueKey: this.UniqueKey ,emailadress: this.emailadress , phone : this.phone  }
      console.log(newData, "FormData")
    if(this.data?.edit){
      this.clientService.updateClientReq(this.data.clientId, newData).subscribe(() => {
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
