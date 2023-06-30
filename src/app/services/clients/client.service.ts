import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import endpoints from 'src/app/endpoints';
import { HttpClient } from '@angular/common/http';
import { IClients } from 'src/app/types/clients';
import { TAXES } from 'src/app/types/taxes';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  // pagination
  public totalNumberOfClient: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _page: number = 1;
  private _limit: number = 12;
  // pagination

  private _clients: any[] = [];
  private clientsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _addClientFromInvoice: EventEmitter<any> = new EventEmitter<any>();
  private _taxName: EventEmitter<TAXES> = new EventEmitter<TAXES>();



  constructor(public http: HttpClient) { }

  set clients(value: any[]) {
    this._clients = value;
  }
  get clients(): any[] {
    return this._clients;
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

  sendPost(payload: any): Observable<any> {
    return this.http.post(endpoints.CLIENTS.ADD, payload);
  }

  getAllClients(page: number = 1, limit: number = 12): Observable<any> { //pagination
    return this.http.get<any>(endpoints.CLIENTS.GETALL(page, limit));
  }

  getClient(ClientId: string): Observable<any> {
    return this.http.get<string>(endpoints.CLIENTS.GET(ClientId));
  }
  updateClientReq(ClientId: string, data: any) {
    return this.http.put(endpoints.CLIENTS.UPDATE(ClientId), data);
  }
  sendClients() {
    this.clientsSubject.next(this._clients);
  }

  recieveClients(): Observable<any[]> {
    return this.clientsSubject.asObservable();
  }

  deleteClients(clientId: string) {
    return this.http.delete(endpoints.CLIENTS.DELETE(clientId));
  }


  getAll() {
    try {
      this.getAllClients(this.page, this.limit).subscribe(  // pagination
        res => {
          this._clients = res.clients;
          this.sendClients();
          this.totalNumberOfClient.next(res.totalCount);    // pagination
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

  recieveClientData(): Observable<any> {
    return this._addClientFromInvoice.asObservable()
  }

  sendClientDetails(data: any): void {
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
