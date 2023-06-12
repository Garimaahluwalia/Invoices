import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  ngOnInit(): void {
  
  }

constructor(public router : Router, public modalService : ModalService){

}
  addClients(){
 
  }

  // addUser() {
  //   this.router.navigate(["clients", "add-client"]).then(() => {
  //     this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true });
  //   });
  // }
}
