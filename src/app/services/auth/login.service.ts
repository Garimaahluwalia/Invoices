import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTHORIZATION_TOKEN, USER_DATA } from 'src/app/constants';
import endpoints from 'src/app/endpoints';
import { IUserLoginDetails, UserLogin } from 'src/app/types/userLogin';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _user: UserLogin | null = null;

  constructor(public http: HttpClient) { }







  // performBasicAuthRequest(username: string, password: string): Promise<any> {
  //  let basicAuthCreddentials = btoa(`${username}:${password}`);
  //   const headers = new HttpHeaders({
  //     Authorization: `Basic ${basicAuthCreddentials}`
  //   });

  //   return this.http.get(endpoints.LOGIN, { headers }).toPromise()
  //     .then(response => response)

  //     .catch(error => {
  //       console.error('Basic Auth Request Failed:', error);
  //       throw error;
  //     });
  // }


  login({username, password}: IUserLoginDetails): Observable<any> {
    return this.http.post<any>(endpoints.LOGIN, {username, password});
  }

  set user(user: UserLogin | null) {
    this._user = user;
  }

  get user(): UserLogin | null {
    return this._user;
  }
  sendPostlogin(payload: { [k: string]: string }): Observable<any> {
    return this.http.post(endpoints.LOGIN, payload);
  }

  updateLoginUser(user: UserLogin){
    this.user = user;
    localStorage.setItem(USER_DATA, JSON.stringify(user));
    localStorage.setItem(AUTHORIZATION_TOKEN, user.token);

  }

  removeUserSession() {
    this.user = null;
    localStorage.clear();
  }
}
