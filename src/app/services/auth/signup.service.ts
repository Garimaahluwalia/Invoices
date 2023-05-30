import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import endpoints from 'src/app/endpoints';
import { ISignUp } from 'src/app/types/signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(public http: HttpClient) { }

  signUp(payload: ISignUp): Observable<any> {
    return this.http.post<any>(endpoints.SIGNUP, payload);
  }

 checkEmailExist(payload: { [k: string]: string }): Observable<any> {
    return this.http.post(endpoints.CHECKEMAIL, payload);
  }
 checkUsernameExist(payload: {[k:string]: string}): Observable<any>{
   return this.http.post(endpoints.CHECKUSERNAME, payload);
  }
}

