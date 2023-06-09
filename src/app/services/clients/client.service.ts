import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import endpoints from 'src/app/endpoints';
import { HttpClient } from '@angular/common/http';
import { IClients } from 'src/app/types/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private _clients: IClients[] = [];
  private clientsSubject: BehaviorSubject<IClients[]> = new BehaviorSubject<IClients[]>([]);

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

  sendPost(payload: any): Observable<any> {
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

  // delete(pageId: string) {
  //   return this.http.delete(endpoints.PAGES.DELETE(pageId));
  // }

  getAll() {
    this.getAllClients().subscribe(
      res => {
        this._clients = res;
        console.log(this._clients, "getallClients");
        this.sendClients();
      },
      err => {
        console.error('Error while fetching pages:', err);
      }
    );
  }
}
