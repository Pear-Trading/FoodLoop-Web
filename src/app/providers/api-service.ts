import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/* this provider handles the interaction between server and client */
 
@Injectable()
export class ApiService {
  private apiUrl = 'https://dev.app.peartrade.org/api';
  private sessionKey: string;
  constructor(
    private http: Http,
  ) {}
  
  public getAgeRanges() {
    return this.http.get(
      this.apiUrl + '/info/ages'
    ).map( res => res.json() );
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
      result => {  this.sessionKey = result.session_key }
    );
    return login_event;
  }

  public search(data) {
	  data.session_key = this.sessionKey;
	  return this.http.post(
		this.apiUrl + '/search',
		data
	  ).map( response => response.json() );
  }
}