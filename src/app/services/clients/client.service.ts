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
  private _clients: IClients[] = [];
  private clientsSubject: BehaviorSubject<IClients[]> = new BehaviorSubject<IClients[]>([]);
  private _addClientFromInvoice: EventEmitter<IClients> = new EventEmitter<IClients>();
  private _taxName: EventEmitter<TAXES> = new EventEmitter<TAXES>();

  constructor(public http: HttpClient) { }

  set clients(value: IClients[]) {
    this._clients = value;
  }
  get clients(): IClients[] {
    return this._clients;
  }

  addClient(data: IClients) {
    this._clients.push(data);
    this.sendClients();
  }
  updateClient(data: IClients, ClientId: number) {
    const clientData = [...this._clients];
    clientData.splice(ClientId, 1, data);
    this._clients = clientData;
    this.sendClients();

  }

  sendPost(payload: IClients): Observable<any> {
    return this.http.post(endpoints.CLIENTS.ADD, payload);
  }

  getAllClients(): Observable<any> {
    return this.http.get<any>(endpoints.CLIENTS.GETALL);
  }
  getClient(ClientId: string): Observable<any> {
    return this.http.get<string>(endpoints.CLIENTS.GET(ClientId));
  }
  updateClientReq(ClientId: string, data: IClients) {
    return this.http.put(endpoints.CLIENTS.UPDATE(ClientId), data);
  }
  sendClients() {
    this.clientsSubject.next(this._clients);
  }

  recieveClients(): Observable<IClients[]> {
    return this.clientsSubject.asObservable();
  }

  deleteClients(clientId: string) {
    return this.http.delete(endpoints.CLIENTS.DELETE(clientId));
  }

  getAll() {
    this.getAllClients().subscribe(
      res => {
        this._clients = res.clients;
        console.log(res.clients,res, "werewrew")
        this.sendClients();
      },
      err => {
        console.error('Error while fetching pages:', err);
      }
    );
  }

  recieveClientData(): Observable<IClients> {
    return this._addClientFromInvoice.asObservable()
  }

  sendClientDetails(data: IClients): void {
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
