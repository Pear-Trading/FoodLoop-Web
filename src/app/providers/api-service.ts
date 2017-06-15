import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/* this provider handles the interaction between server and client */
 
@Injectable()
export class ApiService {
  private apiUrl = 'https://dev.app.peartrade.org/api';
  private sessionKey: string = null;
  constructor(
    private http: Http,
  ) {
	  if (localStorage.getItem('sessionKey') ) {
		this.sessionKey = localStorage.getItem('sessionKey');
	  }
  }
  
  private getSessionKey() {
	  console.log('get key');
	  return this.sessionKey;
  }
  
  private setSessionKey(key) {
	  console.log('set key');
	  this.sessionKey = key;
	  localStorage.setItem('sessionKey', this.sessionKey);
  }
  
  private removeSessionKey() {
	  console.log('remove key');
	  this.sessionKey = null;
	  localStorage.removeItem('sessionKey');
  }
  
  public register(data) {
    return this.http.post(
      this.apiUrl + '/register',
      data
    ).map( response => response.json() );
  }

  public login(data) {
    let login_event = this.http.post(
      this.apiUrl + '/login',
      data
    ).map( response => response.json() );
    login_event.subscribe(
      result => {  this.setSessionKey(result.session_key) }
    );
    return login_event;
  }
  
	public logout() {
		console.log(this.sessionKey);
		return this.http.post(
		  this.apiUrl + '/logout',
		  {
			session_key : this.sessionKey,
		}
		).map( response => { this.removeSessionKey(); return response.json() } );
	}

  public search(data) {
	  data.session_key = this.sessionKey;
	  return this.http.post(
		this.apiUrl + '/search',
		data
	  ).map( response => response.json() );
  }
}