import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTHORIZATION_TOKEN, USER_DATA } from 'src/app/constants';
import endpoints from 'src/app/endpoints';
import { IDashboardCounts } from 'src/app/types/dashboard';
import { ITokens, IUserLoginDetails, UserLogin } from 'src/app/types/userLogin';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _user: UserLogin | null = null;


  constructor(public http: HttpClient) { }

  login<T>({ username, password }: IUserLoginDetails): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    return this.http.post<T>(endpoints.LOGIN, {}, {
      headers
    });
  }


  set user(user: UserLogin | null) {
    this._user = user;
  }

  get user(): UserLogin | null {
    return this._user;
  }

  sendPostlogin(payload: ITokens): Observable<IUserLoginDetails> {
    return this.http.post<IUserLoginDetails>(endpoints.LOGIN, payload);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(endpoints.FORGOT_PASSWORD, {
      email
    });
  }

  updateLoginUser(user: UserLogin) {
    this.user = user;
    localStorage.setItem(USER_DATA, JSON.stringify(user));
    localStorage.setItem(AUTHORIZATION_TOKEN, user?.access_token as string);
  }

  updateToken(tokens: ITokens) {
    localStorage.setItem(AUTHORIZATION_TOKEN, tokens.access_token);
  }

  userLogout(token: string): Observable<any> {
    return this.http.post(endpoints.LOGOUT, token);

  }
  removeUserSession() {
    this.user = null;
    localStorage.clear();
  }

  getDashboardCounts(): Observable<IDashboardCounts> {
    return this.http.get<IDashboardCounts>(endpoints.DASHBOARD);
  }
}
