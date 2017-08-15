import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'leaderboards.component.html',
  providers: [ApiService]
})
export class LeaderboardsComponent {

  constructor(
  private http: Http,
	private api: ApiService,
  ) { 
  }
  
  ngOnInit() {
    this.api
      // get daily total
      .leaderboard_fetch('daily_total')
      .subscribe(
        result => {
          console.log('got daily weekly leaderboard!');
          console.log(result);
        },
        error => {
          console.log( error._body );
        }
      );
      this.api
      // get daily count
      .leaderboard_fetch('daily_count')
      .subscribe(
        result => {
          console.log('got daily count leaderboard!');
          console.log(result);
        },
        error => {
          console.log( error._body );
        }
      );
  }

}
