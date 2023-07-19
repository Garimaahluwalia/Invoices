import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { DeleteService } from 'src/app/services/modal/delete.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IClients, IClientsResponse } from 'src/app/types/clients';
import { DeleteEvents } from 'src/app/types/delete';
import { ModalEvents } from 'src/app/types/modal';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public showModal = false;
  public clients: any[] = [];
  public inputsDisabled = false;
  public searchQuery: string = '';
  public isSearchFocused: boolean = false;
  
  public currentPage = 1;  //pagination
  public itemsPerPage = 2; //pagination
  public totalItems = 15;   //pagination

  constructor(public clientService: ClientService,
    public router: Router,
    public modalService: ModalService,
    public deleteService: DeleteService,
    public invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.itemsPerPage = this.clientService.limit;  //pagination
    this.clientService.getAll();

    this.clientService.recieveClients().subscribe((data: any) => {
      this.clients = data;
    });

    // <-- pagination 
    this.clientService.totalNumberOfClient.subscribe((data: number) => {
      this.totalItems = data;
    });
    // pagination --> 

  }


  openModal() {
    this.showModal = true;
  }

  addClient() {
    this.router.navigate(["clients", "add-client"]).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true });
    });
  }
  updateClient(details: any) {
    console.log(details, " updatedData")
    this.router.navigate(["clients", "add-client", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: { edit: true, clientId: details._id, ...details } })
    })
  }



  ViewClient(details: any) {
    this.router.navigate(["clients", "add-client", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: { edit: false, disabled: true, ...details } })
    })
  }



  DeleteClient(details: any) {
    this.router.navigate(["clients", "delete", details._id]).then(() => {
      this.modalService.sendEvent(ModalEvents.Delete, { status: true, data: { id: details._id, event: DeleteEvents.CLIENTS } });
    })
  }


  DeleteClients(_id: string) {
    this.clientService.deleteClients(_id).subscribe((res) => {
      // this.deleteService.selectedId = null;
      this.clientService.getAll();
    }, err => {
      console.error(err);
    });
  }


  //pagination
  onPageChange(page: number) {
    this.currentPage = page;
    this.clientService.page = page;
    this.clientService.getAll();
  }


  handleSearch(){
  this.clientService.searchQuery = this.searchQuery;
    this.clientService.getAll();
    console.log('Search Query:', this.searchQuery);
  }
}
