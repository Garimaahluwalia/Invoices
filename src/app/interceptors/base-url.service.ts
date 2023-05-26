import { AUTHORIZATION_FAILED, AUTHORIZATION_TOKEN } from "src/app/constants";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";
import { LoginService } from "../services/auth/login.service";
@Injectable({
  providedIn: "root"
})
export class BaseUrlService {
  constructor(public router: Router, private loginService: LoginService) { }
}