import { OnDestroy, Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';
import { takeUntil, ReplaySubject } from "rxjs";
import { ClientRouterModalAction, IClient } from 'src/app/types/client/client.dto';
interface Options {
  queryParams?: {
    duplicateInvoice?: string;
  };
}
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class ClientDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public invoiceId: string | null = null;
  @Input() public duplicateInvoice: boolean = false;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  public clients: IClient[] = [];
  public selectedClient: IClient | null = null;
  public clientId: string | null | undefined = null;

  constructor(
    public router: Router,
    public modalService: ModalService,
    public clientService: ClientService
  ) { }

  ngOnChanges({ duplicateInvoice }: SimpleChanges): void {
    if (!duplicateInvoice?.firstChange) {
      this.duplicateInvoice = duplicateInvoice?.currentValue;
    }
  }


  ngOnInit(): void {
    this.clientService.getAll();
    this.subscriptions();
  }



  onClientChange() {
    const client: IClient | undefined = this.clients.find((client) => client._id === this.clientId);
    if (client) {
      this.selectedClient = client || null;
    }
  }

  getAction(): ClientRouterModalAction {
    let action: ClientRouterModalAction = ClientRouterModalAction.AddInvoice;
    switch (true) {
      case this.duplicateInvoice:
        action = ClientRouterModalAction.DuplicateInvoice;
        break;
      case this.invoiceId !== undefined && this.invoiceId !== null:
        action = ClientRouterModalAction.EditInvoice;
        break;
    }
    return action;
  }
  
  addClients() {
    let options: Options = {};
    if (this.duplicateInvoice) {
      options = { ...options, queryParams: { duplicateInvoice: "duplicate" } }
    }
    let route = ["add-invoice", "add-client"]
    if (this.invoiceId) {
      route = ["add-invoice", this.invoiceId, "add-client"]
    }
    this.router.navigate(route, options).then(() => {
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: { invoice: true, invoiceId: this.invoiceId as string, action: this.getAction() } });
    });
  }

  updateClient(clientId: string | null | undefined) {
    let options: Options = {};
    if (this.duplicateInvoice) {
      options = { ...options, queryParams: { duplicateInvoice: "duplicate" } }
    }
    let route = ["add-invoice", "add-client", clientId]
    if (this.invoiceId) {
      route = ["add-invoice", this.invoiceId, "add-client", clientId]
    }
    this.router?.navigate(route, options).then(() => {
      const data: { [key: string]: string | number | boolean } = { invoiceId: this.invoiceId, action: this.getAction(), invoice: true, edit: true, clientId: this.clientId as string, ...(this.selectedClient as IClient) } as unknown as { [key: string]: string | number | boolean };
      this.modalService.sendEvent(ModalEvents.AddorUpdateClient, { status: true, data: data, });
    });
  }


  subscriptions() {
    this.clientService.recieveClients().pipe(takeUntil(this.destroyed)).subscribe((data: IClient[]) => {
      this.clients = data;
    });

    // Get Single Client when added from popup
    this.clientService.recieveClientData().pipe(takeUntil(this.destroyed)).subscribe((clientResponse) => {
      this.selectedClient = clientResponse;
      this.clientId = clientResponse._id;
    });
  }


  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
