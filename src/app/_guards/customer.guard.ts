import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CustomerGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('usertype') === 'customer') {
      // customer logged in so return true
      return true;
    } else if (localStorage.getItem('usertype') === 'organisation') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
