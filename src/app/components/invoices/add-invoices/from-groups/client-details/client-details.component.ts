import { OnDestroy, Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';
import { takeUntil, ReplaySubject } from "rxjs";
import { Client } from 'src/app/types/client/client.dto';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ClientDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public invoiceId: string | null = null;
  @Input() public duplicateInvoice: boolean = false;
  // Subscription removed
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

  public clients: Client[] = [];
  public selectedClient: Client | null = null;
  public clientId: string | null | undefined = null;

  constructor(
    public router: Router,
    public modalService: ModalService,
    public clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getAll();
    this.subscriptions();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  ngOnChanges({ duplicateInvoice  }: SimpleChanges) : void {
    if(!duplicateInvoice?.firstChange) {
        this.duplicateInvoice = duplicateInvoice?.currentValue;
        /* if(this.duplicateInvoice) {
          this.getInvoiceNumber();
        } */
    }
}

  onClientChange() {
    const client: Client | undefined = this.clients.find((client) => client._id === this.clientId);
    if (client) {
      this.selectedClient = client || null;
    }
  }

  addClients() {
    let options: {[key: string]: any} = {};
    if(this.duplicateInvoice) {
      options = {...options,queryParams: { duplicateInvoice: "duplicate" }}
    }
    this.router.navigate(["add-invoice", "add-client"], options).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: { invoice: true } });
    });
  }

  updateClient(clientId: string | null | undefined) {
    let options: {[key: string]: any} = {};
    if(this.duplicateInvoice) {
      options = {...options,queryParams: { duplicateInvoice: "duplicate" }}
    }
    let route: any[] = ["add-invoice", "add-client", clientId]
    if(this.invoiceId) {
      route = ["add-invoice", this.invoiceId, "add-client", clientId]
    }
    this.router?.navigate(route, options).then(() => {
      const data: { [key: string]: string | number | boolean } = { invoice: true, edit: true, clientId: this.clientId as string, ...(this.selectedClient as Client) } as unknown as { [key: string]: string | number | boolean };
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: data });
    });
  }


  subscriptions() {
    
    this.clientService.recieveClients().pipe(takeUntil(this.destroyed)).subscribe((data: any) => {
    this.clients = data;
    });

    // Get Single Client when added from popup
    this.clientService.recieveClientData().pipe(takeUntil(this.destroyed)).subscribe((clientResponse) => {
      this.selectedClient = clientResponse;
      this.clientId = clientResponse._id;
    });
  }


}
