import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})

export class LoginGuard {
    constructor(private router: Router) {}

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let user = localStorage.getItem("token");
        let status = user !== null && user !== undefined && user !== "" ? false : true;
        if (!status) {
            this.router.navigate(["/dashboard"]);
        }
        return status;
    }
}