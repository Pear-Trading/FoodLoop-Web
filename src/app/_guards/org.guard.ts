import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class OrgGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('usertype') == 'organisation') {
      console.log('Organisation logged in')
      // org logged in so return true
      return true;
    }

    // org not logged in so redirect to customer dashboard
    console.log('not an organisation')
    this.router.navigate(['/dashboard-customer']);
    return false;
  }
}
