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
  
  // Login API
  
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
  
  // Leaderboard Api
  
  public leaderboard_fetch(data) {
    return this.http.post(
		  this.apiUrl + '/stats/leaderboard',
		  {
			session_key : this.sessionKey,
      type : data
		}
		).map( response => response.json() );
	}
  
  // Fake data to mimic

  public graph_data(data) {
    return Observable.of(
    {
      "customersthisweek" :
        {
          day : ['Monday', 'tuesday','wednesday','thursday','friday','saturday','sunday'],
          customerno : [1,2,3,4,5,6,7],
        },
      "customerslastweek" :
        {
          day : ['Monday', 'tuesday','wednesday','thursday','friday','saturday','sunday'],
          customerno : [7,6,5,4,3,2,1],
        },
      "pointsthisweek" :
        {
          day : ['Monday', 'tuesday','wednesday','thursday','friday','saturday','sunday'],
          points : [1,2,3,4,5,6,7],
        },
      "pointslastweek" :
        {
          day : ['Monday', 'tuesday','wednesday','thursday','friday','saturday','sunday'],
          points : [1,2,3,4,5,6,7],
        }
    }  
    )
  }
}