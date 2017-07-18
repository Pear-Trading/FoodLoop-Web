import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/* this provider handles the interaction between server and client */
 
@Injectable()
export class ApiService {
  private apiUrl = 'https://dev.peartrade.org/api';
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
        "graphs" :
          {
          "customersthisweek" :
            {
              day : ['Monday', 'tuesday','wednesday','thursday','friday','saturday','sunday'],
              customerno : [1,2,3,4,5,6,7],
              returningcustomerno : [1,1,2,3,4,5,4],
              totalcustomerno: 
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
        "snippets" :
        {
          "customersinsector" : 
            {
            percent : 76,
            customerno : 34000,
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