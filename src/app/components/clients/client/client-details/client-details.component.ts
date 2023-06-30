import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ClientDetailsComponent implements OnInit {
  public clients_details: any[] = [];
  public selectedClient: any;
  public clientId: string = '';
  constructor(
    public router: Router,
    public modalService: ModalService,
    public clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getAll();
    this.clientService.recieveClients().subscribe((data: any) => {
      this.clients_details = data;
    
    });

    this.clientService.recieveClientData().subscribe((clientResponse) => {
      this.clientService.getAll();
      this.selectedClient = clientResponse;
      this.clientId = clientResponse._id;
    });

  }

  onClientChange() {
    this.selectedClient = this.clients_details.find((client) => client._id === this.clientId);
    console.log("Changed", this.clientId, this.selectedClient);
  }

  addClients() {
    this.router.navigate(["add-invoice", "add-client"]).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: { invoice: true } });
    });
  }

  updateClient(selectedClient: any) {
    if (selectedClient && selectedClient._id) {
      this.router?.navigate(["add-invoice", "add-client", selectedClient._id]).then(() => {
        console.log("calling");
        this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: { invoice: true, edit: true, clientId: selectedClient._id, ...selectedClient } });
      });
    }
  }



}
