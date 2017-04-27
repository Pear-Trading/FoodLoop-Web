import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  private apiurl="https://dev.app.peartrade.org/api"
  constructor(private http: Http) {

  this.getAges().subscribe(
  result => {console.log(result)}
)  }
  getAges() {
    return this.http.get(this.apiurl +'/info/ages' ).map((response: Response) => response.json());
  }


}
