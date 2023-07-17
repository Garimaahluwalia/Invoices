import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import endpoints from 'src/app/endpoints';
import { HttpClient } from '@angular/common/http';
import { IClients } from 'src/app/types/clients';
import { TAXES } from 'src/app/types/taxes';
import { Client } from 'src/app/types/client/client.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  // pagination
  public totalNumberOfClient: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _page: number = 1;
  private _limit: number = 10;
  // pagination

  private _clients: Client[] = [];
  private clientsSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  private _addClientFromInvoice: EventEmitter<Client> = new EventEmitter<Client>();
  private _taxName: EventEmitter<TAXES> = new EventEmitter<TAXES>();



  constructor(public http: HttpClient) { }

  set clients(value: Client[]) {
    this._clients = value;
  }
  get clients(): Client[] {
    return this._clients;
  }

  addClient(data: any) {
    this._clients.push(data);
    this.sendClients();
  }

  updateClient(data: any, ClientId: number) {
    const clientData = [...this._clients];
    clientData.splice(ClientId, 1, data);
    this._clients = clientData;
    this.sendClients();

  }


  // <-- pagination
  set page(value: number) {
    this._page = value;
  }
  get page(): number {
    return this._page;
  }

  set limit(value: number) {
    this._limit = value;
  }

  get limit(): number {
    return this._limit;
  }
  // pagination -->




  addClientToServer(payload: any): Observable<any> {
    return this.http.post(endpoints.CLIENTS.ADD, payload);
  }

  getAllClients(page: number = 1, limit: number = 12): Observable<any> { //pagination
    return this.http.get<{ clients: Client[], totalCount: number, totalPages: number }>(endpoints.CLIENTS.GETALL(page, limit));
  }

  getClient(ClientId: string): Observable<Client> {
    return this.http.get<Client>(endpoints.CLIENTS.GET(ClientId));
  }
  updateClientReq(ClientId: string, data: any) {
    return this.http.put<Client>(endpoints.CLIENTS.UPDATE(ClientId), data);
  }
  sendClients() {
    this.clientsSubject.next(this._clients);
  }

  recieveClients(): Observable<Client[]> {
    return this.clientsSubject.asObservable();
  }

  deleteClients(clientId: string) {
    return this.http.delete(endpoints.CLIENTS.DELETE(clientId));
  }


  updateListAndSendClientData(data: Client) {
    const clients: Client[] = [...this.clients];
    const indexOfClient = clients.findIndex((v: Client) => v._id === data._id);
    if (indexOfClient !== -1) {
      clients.splice(indexOfClient, 1, data);
    }
    this.sendClientDetails(data);
    this._clients = clients as Client[];
    this.sendClients();
  }

  getAll() {
    try {
      this.getAllClients(this.page, this.limit).subscribe(  // pagination
        res => {
          this._clients = res.clients as Client[];
          this.sendClients();
          this.totalNumberOfClient.next(res.totalCount); 
          this.sendClients();   // pagination
        },
        err => {
          console.error('Error while fetching pages:', err);
        }
      );
    } catch (e) {
      console.error(e);
      this._clients = []; // pagination
      this.sendClients();
    }
  }

  recieveClientData(): Observable<Client> {
    return this._addClientFromInvoice.asObservable()
  }

  sendClientDetails(data: Client): void {
    this._addClientFromInvoice.emit(data);
  }

  checkPhonenumberExist(payload: { [k: string]: string }): Observable<any> {
    return this.http.post(endpoints.CLIENTS.CHECKPHONENUMBER, payload);
  }

  sendTaxName(data: TAXES): void {
    this._taxName.emit(data);
  }
  recieveTaxName(): Observable<TAXES> {
    return this._taxName.asObservable()
  }

}
