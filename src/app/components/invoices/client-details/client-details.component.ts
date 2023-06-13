import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  public clients_details : any[] = [];
  selectedClient: any;
  constructor(public router: Router, public modalService: ModalService,public clientService : ClientService ) {}
  ngOnInit(): void {
    this.clientService.getAll();
    this.clientService.recieveClients().subscribe((data: any) => {
      this.clients_details = data;
      // console.log(this.clients_details, "clientsdetailsdata");
    });

  }

  selectClient(event: any) {
    const selectedValue = event.target.value;
    this.selectedClient = this.clients_details.find((client) => client.name === selectedValue);
  }
  addClients(){
    this.router.navigate(["add-invoice", "add-client"]).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, {status: true});
    })
  }
  updateClient(selectedClient: any) {
    this.router.navigate(["add-invoice", "add-client", selectedClient._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: { edit: true, clientId: selectedClient._id, ...selectedClient } })
    })
  }

}
