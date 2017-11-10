import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
// import { PaginatePipe } from 'ngx-pagination';
import {PaginationInstance} from 'ngx-pagination';
// import { PaginationControlsComponent } from 'ngx-pagination';
// import { PaginationControlsDirective } from 'ngx-pagination';
// import { TransactionResultComponent } from '../shared/transaction-result.component';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {

  transactionList;
  noLeaderboardList = false;
  public p: any;

  leaderboardData: Array<any>;
  currentPos: number;
  listType: any = 'weekly_total';

  public paginateConfig: PaginationInstance = {
        id: 'leadpaginate',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0
    };

  constructor(
  private http: Http,
  private api: ApiService,
  ) {
    this.myDate = moment().format('YYYY-MM-DD[T]HH:mm');
    // this.myDate = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.loadLeaderboard(0);
  }

  // private fetchLeaderboard() {
  //   this.peopleService.leaderboard(this.listType)
  //     .subscribe(
  //       result => {
  //         this.leaderboardData = result.leaderboard;
  //         this.currentPos = result.user_position;
  //       }
  //     );
  // }

  public changeLeaderboard(event) {
    this.loadLeaderboard();
  }


  loadLeaderboard(leadPage: number) {
    console.log(leadPage, listType);
    this.api.leaderboard_fetch(listType,leadPage).subscribe(
      result => {
        if (result.transactions.length > 0) {
          this.transactionList = result.transactions;
          // TODO Rename in server
          this.paginateConfig.totalItems = result.page_no;
          this.paginateConfig.currentPage = result.page;
          this.noLeaderboardList = false;
        } else {
        // handle the case when the transactionList is empty
          this.leaderboardList = null;
          this.noLeaderboardList = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // // dynamically changes the row style based on  player's position
  // // for instance, top three player and the player him/herself should
  // // be hightlighted
  // public getClass(item) {
  //   if( item.position < 4 ) {
  //     return "topThree";
  //   } else if( item.position == this.currentPos ) {
  //     return "user";
  //   }
  //   return "otherUsers";
  // }
  //
  // // show changes by using icon, trending up and trending down or no trend.
  // public getTrendIcon(item){
  //   if( item.trend < 0 ){
  //     return "md-trending-up";
  //   } else if( item.trend > 0 ){
  //     return "md-trending-down";
  //   }
  //   return "md-remove";
  // }
  //
  // // need to merge this function with getIcon
  // // this function shows different icon color based on the direction of the position shifted
  // public getTrendIconColor(item){
  //   if( item.trend < 0 ) {
  //     return "secondary";
  //   } else if( item.trend > 0 ){
  //     return "danger";
  //   }
  //   return "dark";
  // }

}
