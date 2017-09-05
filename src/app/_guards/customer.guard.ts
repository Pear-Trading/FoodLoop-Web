import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CustomerGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('usertype') === 'customer') {
      console.log('Customer logged in');
      // customer logged in so return true
      return true;
    } else if (localStorage.getItem('usertype') === 'organisation') {
      console.log('not an customer');
      this.router.navigate(['/dashboard']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
