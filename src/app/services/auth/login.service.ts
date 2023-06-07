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

  login({ username, password }: IUserLoginDetails): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    return this.http.post<any>(endpoints.LOGIN, {}, {
      headers
    });
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

  resetPassword(payload: any): Observable<any> {
    return this.http.post<any>(endpoints.RESET_PASSWORD, payload);
  }
  updateLoginUser(user: UserLogin) {
    this.user = user;
    localStorage.setItem(USER_DATA, JSON.stringify(user));
    localStorage.setItem(AUTHORIZATION_TOKEN, user?.access_token as string);
  }

  removeUserSession() {
    this.user = null;
    localStorage.clear();
  }
}
