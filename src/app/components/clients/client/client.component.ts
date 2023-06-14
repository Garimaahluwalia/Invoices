import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IClients } from 'src/app/types/clients';
import { DeleteEvents } from 'src/app/types/delete';
import { ModalEvents } from 'src/app/types/modal';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 5;
  public clients: IClients[]= [];
  constructor(public clientService: ClientService, public router: Router, public modalService: ModalService, public deleteService: DeleteService) { }

  ngOnInit(): void {
    this.clientService.getAll();
    this.clientService.recieveClients().subscribe((data: any) => {
      this.clients = data;
      console.log(this.clients, "clientsdata")
    });

    this.deleteService.recieveDeleteEvent(DeleteEvents.CLIENTS)?.subscribe(res => {
      console.log(res, this.deleteService.selectedId, "delete");
      if (res) {
        this.DeleteClients(this.deleteService.selectedId as string);
      }
    });
  }
  addUser() {
    this.router.navigate(["clients", "add-client"]).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true });
    });
  }
  updateClient(details: any) {
    this.router.navigate(["clients", "add-client", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: { edit: true, clientId: details._id, ...details } })
    })
  }

  DeleteClient(details: any) {
    this.router.navigate(["clients", "delete-client", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id, event: DeleteEvents.CLIENTS } });
    })
  }

  DeleteClients(_id: string) {
    this.clientService.deleteClients(_id).subscribe((res) => {
      console.log(res, "delete");
      this.deleteService.selectedId = null;
      this.clientService.getAll();
    }, err => {
      console.error(err);
    });
  }

 
}
