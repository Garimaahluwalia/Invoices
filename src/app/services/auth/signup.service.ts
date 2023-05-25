import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import endpoints from 'src/app/endpoints';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(public http: HttpClient) { }

  signup(payload: any): Observable<any> {
    return this.http.post<any>(endpoints.LOGIN, payload);
  }
}

