import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import endpoints from 'src/app/endpoints';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _user: any|null = null;
  constructor(public http:HttpClient) { }


  
  login(payload: any):Observable<any>{
    return this.http.post<any>(endpoints.LOGIN, payload);
  }
}
