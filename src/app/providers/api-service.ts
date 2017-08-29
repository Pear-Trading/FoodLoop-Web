import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

/* this provider handles the interaction between server and client */

@Injectable()
export class ApiService {
  private apiUrl = environment.apiUrl;
  private sessionKey: string = null;
  constructor(
    private http: Http,
  ) {
	  if (localStorage.getItem('sessionKey') ) {
		this.sessionKey = localStorage.getItem('sessionKey');
	  }
  }

  public post(url, data) {
    if ( this.sessionKey != null ) {
      data.session_key = this.sessionKey;
    }
    return this.http.post(
      this.apiUrl + url,
      data
    ).map( response => response.json() );
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
      result => {
      this.setSessionKey(result.session_key);
      this.setUserInfo(
        data.email,
        result.display_name,
        );
      }
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

  // Handles user data interaction

  // Checks for login status

  public hasLoggedIn() {
    return this.getSessionKey() ? true : false;
  }

  // Pulls user info to store locally on login

  public setUserInfo(
    email: string,
    display_name: string) {
    console.log("set UserInfo");
    localStorage.setItem('email',email);
    localStorage.setItem('displayname',display_name);
  }

  // Used for getting account details and updating

  public accountFullLoad() {
	  let key = this.sessionKey;
	  return this.http.post(
      this.apiUrl + '/user',
      { session_key : key },
	  ).map( response => response.json() );
  }

  public accountEditUpdate(data) {
	  data.session_key = this.sessionKey;
	  return this.http.post(
      this.apiUrl + '/user/account',
      data
	  ).map( response => response.json() );
  }

  // Deletes account details on logout

  public removeUserInfo() {
    console.log("remove UserInfo");
    localStorage.removeItem('email');
    localStorage.removeItem('displayname');
  }

  public getFullName() {
    console.log("get Full Name");
    localStorage.getItem('fullname');
  }

  public getDisplayName() {
    console.log("get Display Name");
    localStorage.getItem('displayname');
  }

  public getPostcode() {
    console.log("get Postcode");
    localStorage.getItem('postcode');
  }

  public getYearOfBirth() {
    console.log("get Year of Birth");
    localStorage.getItem('yearofbirth');
  }

  public getEmail() {
    console.log("get email");
    localStorage.getItem('email');
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

  // Fake Breadcrumb data

  public breadcrumb_data(data) {
    return Observable.of(
    {
      "customersthismonth" : 196,
      "moneyspentthismonth" : 156.02,
      "pointstotal" : 506,
      "averagetransactiontoday" : 3.69
    }
    )
  }

  // Fake chart data to mimic

  public graph_data(data) {
    return Observable.of(
    {
      // graphstoshow is on server and changes every hour, listing what snippets & graphs to display
      "elementstoshow" :
        {
        "graphs" :
          {
            customersthisweek : true,
            customerslastweek : true,
            customerslastmonth : true,
            customerslastyear : true,
            returningcustomerslastweek : true,
            returningcustomerslastmonth : true,
            returningcustomerslastyear : true,
            noofcustomerssector : true,
            percentofcustomerssector : true,
            pointsthisweek : true,
            percentlocalsuppliersvscompetitor : true,
          },
        "snippets" :
          {
            customersthismonth: false,
            moneyspentthismonth: true,
            pointstotal: true,
            averagetransactiontoday: false,
            percentownlocalsupplier : true,
            percentsinglecompetitorlocalsupplier : true,
          },
        },
      "data" :
        {
        "customersthisweek" :
          {
            day : ['Monday', 'tuesday','wednesday','thursday','friday','saturday','sunday'],
            customerno : [1,2,3,4,5,6,7],
            returningcustomerno : [1,1,2,3,4,5,4],
          },
        "customerslastweek" :
          {
            day : ['Monday', 'tuesday','wednesday','thursday','friday','saturday','sunday'],
            customerno : [7,6,5,4,3,2,1],
            returningcustomerno : [3,4,5,4,3,2,1],
          },
        // can take differing size arrays, so any month works. Example here is for April
        "customerslastmonth" :
          {
            day : ['April 1','April 2','April 3','April 4','April 5','April 6','April 7','April 8',
            'April 9','April 10','April 11','April 12','April 13','April 14','April 15','April 16',
            'April 17','April 18','April 19','April 20','April 21','April 22','April 23','April 24',
            'April 25','April 26','April 27','April 28','April 29','April 30'],
            customerno : [7,6,5,4,3,2,1,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
            returningcustomerno : [4,5,4,3,2,1,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
          },
        "customerslastyear" :
          {
            month : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            customerno : [7,6,5,4,3,2,1,8,9,10,11,12],
            returningcustomerno : [3,2,4,2,1,1,1,6,4,8,5,12],
          },
        // If the number is potential or actual customers in their sector has yet to be determined
        "customersinsector" :
          {
          percent : 76,
          customerno : 34000,
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
          },
        "localsuppliers" :
          {
            percentownlocal : 50,
            percentsinglecompetitorlocal : 65,
          },
        },
    }
    )
  }
}
