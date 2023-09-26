import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import endpoints from 'src/app/endpoints';
import { HttpClient } from '@angular/common/http';
import { TAXES } from 'src/app/types/taxes';
import { IClient, IClientPayload } from 'src/app/types/client/client.dto';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public totalNumberOfClient: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _page: number = 1;
  private _limit: number = 10;
  private _searchQuery!: string;
  private _clients: IClient[] = [];
  private clientsSubject: BehaviorSubject<IClient[]> = new BehaviorSubject<IClient[]>([]);
  private _addClientFromInvoice: EventEmitter<IClient> = new EventEmitter<IClient>();
  private _taxName: EventEmitter<TAXES> = new EventEmitter<TAXES>();

  constructor(public http: HttpClient,
    public loadService: LoaderService) { }

  addClient(data: IClient) {
    this._clients.push(data);
    this.sendClients();
  }

  updateClient(data: IClient, ClientId: number) {
    const clientData = [...this._clients];
    clientData.splice(ClientId, 1, data);
    this._clients = clientData;
    this.sendClients();
  }


  set clients(value: IClient[]) {
    this._clients = value;
    console.log(this._clients, "clients from clients")
  }
  get clients(): IClient[] {
    return this._clients;
  }

  set page(value: number) {
    this._page = value;
  }
  get page(): number {
    return this._page;
  }

  set searchQuery(value: string) {
    this._searchQuery = value;
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  set limit(value: number) {
    this._limit = value;
  }

  get limit(): number {
    return this._limit;
  }


  addClientToServer(payload: IClientPayload): Observable<IClient> {
    return this.http.post<IClient>(endpoints.CLIENTS.ADD, payload);
  }

  getAllClients(page: number = 1, limit: number = 12, searchQuery: string): Observable<{ clients: IClient[], totalCount: number, totalPages: number }> {
    return this.http.get<{ clients: IClient[], totalCount: number, totalPages: number }>(endpoints.CLIENTS.GETALL(page, limit, searchQuery));
  }

  getClient(ClientId: string): Observable<IClient> {
    return this.http.get<IClient>(endpoints.CLIENTS.GET(ClientId));
  }
  updateClientReq(ClientId: string, data: IClientPayload) {
    return this.http.put<IClient>(endpoints.CLIENTS.UPDATE(ClientId), data);
  }
  sendClients() {
    this.clientsSubject.next(this._clients);
  }

  recieveClients(): Observable<IClient[]> {
    return this.clientsSubject.asObservable();
  }

  deleteClients(clientId: string) {
    return this.http.delete(endpoints.CLIENTS.DELETE(clientId));
  }


  updateListAndSendClientData(data: IClient) {
    const clients: IClient[] = [...this.clients];
    const indexOfClient = clients.findIndex((v: IClient) => v._id === data._id);
    if (indexOfClient !== -1) {
      clients.splice(indexOfClient, 1, data);
    }
    this.sendClientDetails(data);
    this._clients = clients as IClient[];
    this.sendClients();
  }

  getAll() {
    this.loadService.ShowLoader();
    try {
      this.getAllClients(this.page, this.limit, this.searchQuery).subscribe(
        res => {
          this._clients = res.clients as IClient[];
          this.sendClients();
          this.totalNumberOfClient.next(res.totalCount);
          this.sendClients();
          this.loadService.HideLoader();
        },
        err => {
          this.loadService.HideLoader();
          console.error('Error while fetching pages:', err);
        }
      );
    } catch (e) {
      console.error(e);
      this._clients = [];
      this.sendClients();
      this.loadService.HideLoader();
    }
  }

  recieveClientData(): Observable<IClient> {
    return this._addClientFromInvoice.asObservable()
  }

  sendClientDetails(data: IClient): void {
    this._addClientFromInvoice.emit(data);
  }

  checkPhonenumberExist(payload: { [k: string]: string }): Observable<{ [k: string]: string }> {
    return this.http.post<{ [k: string]: string }>(endpoints.CLIENTS.CHECKPHONENUMBER, payload);
  }

  sendTaxName(data: TAXES): void {
    this._taxName.emit(data);
  }
  recieveTaxName(): Observable<TAXES> {
    return this._taxName.asObservable()
  }

}
