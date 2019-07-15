import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


/* this provider handles the interaction between server and client */

@Injectable()
export class ApiService {
  private apiUrl = environment.apiUrl;
  private sessionKey: string = null;
  constructor(
    private http: HttpClient,
  ) {
    if (localStorage.getItem('sessionKey') ) {
      this.sessionKey = localStorage.getItem('sessionKey');
    }
  }

  public post(url: string, data: any = {}) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + url,
      data
    );
  }

  // Login API

  public getSessionKey() {
    return this.sessionKey;
  }

  public setSessionKey(key) {
    this.sessionKey = key;
    localStorage.setItem('sessionKey', this.sessionKey);
  }

  public removeSessionKey() {
    this.sessionKey = null;
    localStorage.removeItem('sessionKey');
  }

  public register(data) {
    return this.http.post<any>(
      this.apiUrl + '/register',
      data
    );
  }

  public login(data) {
    return this.http
      .post<any>(
        this.apiUrl + '/login',
        data
      ).pipe(
      map(
        result => {
          const json = result;
          this.setSessionKey(json.session_key);
          this.setUserInfo(
          json.email,
          json.display_name || json.name
        );
        this.setUserType(json.user_type);
        return json;
        }
      ));
  }

  public logout() {
    const key = this.sessionKey;
    return this.http
      .post<any>(
        this.apiUrl + '/logout',
        { session_key : key },
      ).pipe(
      map(
        response => {
          localStorage.clear();
          this.sessionKey = null;
          return response;
        }
      ));
  }

  // Submits feedback

  public feedback(data) {
    data.app_name = 'Foodloop Web';
    data.package_name = 'Foodloop Web';
    data.version_code = 'dev';
    data.version_number = 'dev';
      return this.http.post<any>(
        this.apiUrl + '/feedback',
        data
      );
  }

  // gets transaction list for log

  public transList(data) {
    const key = this.sessionKey;
    return this.http.post<any>(
    this.apiUrl + '/outgoing-transactions',
    {
      session_key : key,
      page : data
    }
    );
  }

  // Basic Customer User stats API
  public categoryList() {
    const key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/search/category',
      {
        session_key : key,
      }
    );
  }

  // Basic Customer User stats API
  public categoryTransactionList() {
    const key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/stats/category',
      {
        session_key : key,
      }
    );
  }

  // LCC data
  public externalTransactions() {
    const key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/v1/organisation/external/transactions',
      {
        session_key : key,
      }
    );
  }

  public loadMiscUrl(extra_url) {
    const key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/v1/' + extra_url,
      {
        session_key : key,
      }
    );
  }

  public externalSuppliers(data, sortBy, sortDir, perPage) {
    const key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/v1/organisation/external/suppliers',
      {
        session_key : key,
        page : data,
        sort_by : sortBy,
        sort_dir : sortDir,
        per_page : perPage
      }
    );
  }

  // Searches organisations used for transaction submission

  public search(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
    this.apiUrl + '/search',
    data
    );
  }

  // Uploads a transaction

  public upload(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/upload',
      data
    );
  }

  // Edits a recurring transaction

  public recurUpdate(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/recurring-transactions',
      data
    );
  }

  // Edits a recurring transaction

  public recurDelete(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/recurring-transactions/delete',
      data
    );
  }

  // gets payroll list for log

  public payrollList(data) {
    const key = this.sessionKey;
    return this.http.post<any>(
    this.apiUrl + '/v1/organisation/payroll',
    {
      session_key : key,
      page : data
    }
    );
  }

  // handles Org data added

  public orgPayroll(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/v1/organisation/payroll/add',
      data
    );
  }

  public orgSupplier(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/v1/organisation/supplier/add',
      data
    );
  }

  public orgEmployee(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/v1/organisation/employee/add',
      data
    );
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
    localStorage.setItem('email', email);
    localStorage.setItem('displayname', display_name);
  }

  // Sets usertype

  public setUserType(user_type: string) {
    localStorage.setItem('usertype', user_type);
  }

  // Used for getting account details and updating

  public accountFullLoad() {
    const key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/user',
      { session_key : key },
    );
  }

  public accountEditUpdate(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/user/account',
      data
    );
  }

  // Deletes account details on logout

  public removeUserInfo() {
    localStorage.removeItem('email');
    localStorage.removeItem('displayname');
  }

  public getFullName() {
    localStorage.getItem('fullname');
  }

  public getDisplayName() {
    localStorage.getItem('displayname');
  }

  public getPostcode() {
    localStorage.getItem('postcode');
  }

  public getYearOfBirth() {
    localStorage.getItem('yearofbirth');
  }

  public getEmail() {
    localStorage.getItem('email');
  }

  // Leaderboard Api

  public leaderboard_fetch(
    type: string,
    page: number) {
    const key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/stats/leaderboard/paged',
      {
        session_key : key,
        type : type,
        page: page,
    }
    );
  }

  // Initial Map Data
  public getMapData(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
    this.apiUrl + '/v1/supplier/location',
    data
    );
  }

  // Load Association Data
  public getAssocData(data) {
    data.session_key = this.sessionKey;
    return this.http.post<any>(
    this.apiUrl + '/v1/supplier/location/trail',
    data
    );
  }

  // Basic Customer User stats API
  public customerStats() {
    const key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/stats/customer',
      {
        session_key : key,
      }
    );
  }

  // Basic Customer User stats API
  public orgStats() {
    const key = this.sessionKey;
    return this.http.post<any>(
      this.apiUrl + '/stats/organisation',
      {
        session_key : key,
      }
    );
  }
}
