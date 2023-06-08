import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent  implements OnInit{
  clients: any;
 constructor(public clientService: ClientService, public router: Router, public modalService: ModalService){}

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe((res:any)=> {
      this.clients = res ;
      console.log(this.clients , "list of client")
    })
  }
  addUser() {
    this.router.navigate(["clients", "add-client"]).then(() => {
      this.modalService.sendEvent(ModalEvents.AddClient, { status: true });
    });
  }
}
