import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import endpoints from 'src/app/endpoints';
import { HttpClient} from '@angular/common/http';
import { IClients } from 'src/app/types/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 
 private _clients : IClients[] = [];
 private clientsSubject: BehaviorSubject<IClients[]> = new BehaviorSubject<IClients[]>([]);

  constructor(public http :  HttpClient) { }


set clients(value: IClients[]){
  this._clients = value;
}
get clients(): IClients[]{
  return this._clients;
}

addClient(data:IClients){
  this._clients.push(data);
  this.sendClients();
}
updateClient(data:IClients, ClientId: number){
  const clientData = [...this._clients];
  clientData.splice(ClientId, 1 , data);
  this._clients = clientData;
  this.sendClients();

}

sendPost(payload: { [k: string]: string }): Observable<any> {
  return this.http.post(endpoints.CLIENTS.ADD, payload);
}

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(endpoints.CLIENTS.GETALL);
  }
  getClient(ClientId: string): Observable<any> {
    return this.http.get<string>(endpoints.CLIENTS.GET(ClientId));
  }
  updateClientReq(ClientId: string, client: any): Observable<any> {
    const url = `${endpoints.CLIENTS.UPDATE}/${ClientId}`;
    return this.http.put<any>(url, client);
  }

  sendClients() {
    this.clientsSubject.next(this._clients);
  }

  recieveClients(): Observable<IClients[]> {
    return this.clientsSubject.asObservable();
  }

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
