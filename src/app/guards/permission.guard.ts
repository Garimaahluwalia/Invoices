import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { PermissionService } from '../services/auth/permission.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private permissionService: PermissionService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   // Get the required permission for the route from the route's data
  //   const requiredPermission: string = route.data['requiredPermission'];

  //   // Check if the user has the required permission
  //   const hasPermission: boolean = this.permissionService.hasPermission(requiredPermission);

  //   if (hasPermission) {
  //     return true; // Allow access to the route
  //   } else {
  //     // Redirect to an unauthorized page or show an error message
  //     this.router.navigate(['/unauthorized']);
  //     return false;
  //   }
  // }
}
