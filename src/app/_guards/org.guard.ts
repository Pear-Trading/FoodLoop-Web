import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class OrgGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('usertype') === 'organisation') {
      // org logged in so return true
      return true;
    } else if (localStorage.getItem('usertype') === 'customer') {
      this.router.navigate(['/dashboard-customer']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
