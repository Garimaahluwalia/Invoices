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
  private _taxFromInvoice: EventEmitter<TAXES> = new EventEmitter<TAXES>();
  private _amountData: EventEmitter<number> = new EventEmitter<number>();
  private _taxamount: EventEmitter<number> = new EventEmitter<number>();

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

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(endpoints.CLIENTS.GETALL);
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
        this._clients = res;
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
  sendTaxData(data: TAXES): void {
    console.log(data, 'data')
    this._taxFromInvoice.emit(data);
  }
  recieveTaxData(): Observable<TAXES> {
    return this._taxFromInvoice.asObservable()
  }


  sendAmountData(data: number): void {
    this._amountData.emit(data);
  }

  recieveAmountData(): Observable<any> {
    return this._amountData.asObservable();
  }


  sendTaxamount(data: number): void {
    this._taxamount.emit(data);
  }

  recieveTaxamount(): Observable<any> {
    return this._taxamount.asObservable();
  }
}
