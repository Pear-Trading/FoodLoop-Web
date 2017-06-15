import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('sessionKey')) {
            console.log('session key found')
			// logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        console.log('no session key found')
		this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}