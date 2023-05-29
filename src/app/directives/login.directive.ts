import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { LoginService } from '../services/auth/login.service';

@Directive({
  selector: '[appLogin][ngModel]',
  providers: [ {
    provide : NG_VALIDATORS,
    useExisting: LoginDirective,
    multi: true
  }]
})
export class LoginDirective {

  constructor(public loginService:LoginService) { }

  validateEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    console.log(value, "Validation value");
    if (value && value.trim() !== "") {
      return this.loginService.sendPostlogin({ login: value }).pipe(
        map((res: { [key: string]: boolean | string }) => {
          console.log(res, "VALIDATIONS RESPONSE");
          if (res["isEmailExists"]) {
            return { isEmailExists: true };
          } else {
            return null;
          }
        }),
        catchError(() => of(null))
      );
    }
    return of(null);
  }

  validatePassword(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    console.log(value, "Validation value");
    if (value && value.trim() !== "") {
      return this.loginService.sendPostlogin({ login: value }).pipe(
        map((res: { [key: string]: boolean | string }) => {
          console.log(res, "VALIDATIONS RESPONSE");
          if (res["ispasswordExists"]) {
            return { ispasswordExists: true };
          } else {
            return null;
          }
        }),
        catchError(() => of(null))
      );
    }
    return of(null);
  }
 
 }

