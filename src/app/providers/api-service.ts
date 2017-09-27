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

  public post(url: string, data: any = {}) {
    data.session_key = this.sessionKey;
    return this.http.post(
      this.apiUrl + url,
      data
    ).map( response => response.json() );
  }

  // Login API

  public getSessionKey() {
    console.log('get key');
    return this.sessionKey;
  }

  public setSessionKey(key) {
    console.log('set key');
    this.sessionKey = key;
    localStorage.setItem('sessionKey', this.sessionKey);
  }

  public removeSessionKey() {
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
    return this.http
      .post(
        this.apiUrl + '/login',
        data
      )
      .map(
        result => {
          const json = result.json();
          this.setSessionKey(json.session_key);
          this.setUserInfo(
          json.email,
          json.display_name || json.name
        );
        this.setUserType(json.user_type);
        return json;
        }
      );
  }

  public logout() {
    console.log(this.sessionKey);
    const key = this.sessionKey;
    return this.http
      .post(
        this.apiUrl + '/logout',
        { session_key : key },
      )
      .map(
        response => {
          localStorage.clear();
          this.sessionKey = null;
          return response.json();
        }
      );
  }

  // Submits feedback

  public feedback(data) {
    data.app_name = 'Foodloop Web';
    data.package_name = 'Foodloop Web';
    data.version_code = 'dev';
    data.version_number = 'dev';
      console.log(data);
      return this.http.post(
        this.apiUrl + '/feedback',
        data
      ).map( response => response.json() );
  }

  // gets transaction list for log

  public transList(data) {
    const key = this.sessionKey;
    return this.http.post(
    this.apiUrl + '/outgoing-transactions',
    {
      session_key : key,
      page : data
    }
    ).map( response => response.json() );
  }

  // Searches organisations used for transaction submission

  public search(data) {
    data.session_key = this.sessionKey;
    return this.http.post(
    this.apiUrl + '/search',
    data
    ).map( response => response.json() );
  }

  // Uploads a transaction

  public upload(data) {
    data.session_key = this.sessionKey;
    return this.http.post(
      this.apiUrl + '/upload',
      data
    ).map( response => response.json() );
  }

  // gets payroll list for log

  public payrollList(data) {
    const key = this.sessionKey;
    return this.http.post(
    this.apiUrl + '/v1/organisation/payroll',
    {
      session_key : key,
      page : data
    }
    ).map( response => response.json() );
  }

  // handles Org data added

  public orgPayroll(data) {
    data.session_key = this.sessionKey;
    return this.http.post(
      this.apiUrl + '/v1/organisation/payroll/add',
      data
    ).map( response => response.json() );
  }

  public orgSupplier(data) {
    data.session_key = this.sessionKey;
    return this.http.post(
      this.apiUrl + '/v1/organisation/supplier/add',
      data
    ).map( response => response.json() );
  }

  public orgEmployee(data) {
    data.session_key = this.sessionKey;
    return this.http.post(
      this.apiUrl + '/v1/organisation/employee/add',
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
    console.log('set UserInfo');
    localStorage.setItem('email', email);
    localStorage.setItem('displayname', display_name);
  }

  // Sets usertype

  public setUserType(user_type: string) {
    console.log('set UserType');
    localStorage.setItem('usertype', user_type);
  }

  // Used for getting account details and updating

  public accountFullLoad() {
    const key = this.sessionKey;
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
    console.log('remove UserInfo');
    localStorage.removeItem('email');
    localStorage.removeItem('displayname');
  }

  public getFullName() {
    console.log('get Full Name');
    localStorage.getItem('fullname');
  }

  public getDisplayName() {
    console.log('get Display Name');
    localStorage.getItem('displayname');
  }

  public getPostcode() {
    console.log('get Postcode');
    localStorage.getItem('postcode');
  }

  public getYearOfBirth() {
    console.log('get Year of Birth');
    localStorage.getItem('yearofbirth');
  }

  public getEmail() {
    console.log('get email');
    localStorage.getItem('email');
  }

  // Leaderboard Api

  public leaderboard_fetch(data) {
    const key = this.sessionKey;
    return this.http.post(
      this.apiUrl + '/stats/leaderboard',
      {
        session_key : key,
        type : data
    }
    ).map( response => response.json() );
  }

  // Initial Map Data
  public getMapData(data) {
    data.session_key = this.sessionKey;
    return this.http.post(
    this.apiUrl + '/map',
    data
    ).map( response => response.json() );
  }

  // Basic Customer User stats API
  public basicStats() {
    const key = this.sessionKey;
    return this.http.post(
      this.apiUrl + '/stats',
      {
        session_key : key,
      }
    ).map( response => response.json() );
  }
}
