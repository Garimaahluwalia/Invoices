import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import endpoints from 'src/app/endpoints';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  constructor(public http: HttpClientModule) { }

  //  signup(payload:any):Observable<any>{
  //   return this.http.post<any>(endpoints.SIGNUP, payload)
  //  }
}
