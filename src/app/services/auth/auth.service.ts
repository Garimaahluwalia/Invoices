import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService implements CanActivate { 

    constructor(private router: Router, public route: ActivatedRoute){}
    
  public  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let user = localStorage.getItem("token");
    if(user) {
        return true;
    }else{
        this.router.navigate(["login"]);
        return false;
    }
    }
}