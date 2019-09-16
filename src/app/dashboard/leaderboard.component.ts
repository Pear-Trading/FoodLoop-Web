import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../providers/api-service';
// import { PaginatePipe } from 'ngx-pagination';
import {PaginationInstance} from 'ngx-pagination';
// import { PaginationControlsComponent } from 'ngx-pagination';
// import { PaginationControlsDirective } from 'ngx-pagination';
// import { TransactionResultComponent } from '../shared/transaction-result.component';


@Component({
  templateUrl: 'leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {

  leaderboardList;
  noLeaderboardList = false;
  public p: any;

  leaderboardData: Array<any>;
  currentPos: number;
  listType: any = 'weekly_total';

  public paginateConfig: PaginationInstance = {
        id: 'leadpaginate',
        itemsPerPage: 20,
        currentPage: 1,
        totalItems: 0
    };

  constructor(
  private api: ApiService,
  ) { }

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
    this.loadLeaderboard(0);
  }


  loadLeaderboard(leadPage: number) {
    console.log(leadPage, this.listType);
    this.api.leaderboard_fetch(this.listType,leadPage).subscribe(
      result => {
        if (result.leaderboard.length > 0) {
          this.leaderboardList = result.leaderboard;
          // TODO Rename in server
          this.paginateConfig.totalItems = result.count;
          this.paginateConfig.currentPage = result.page;
          this.noLeaderboardList = false;
        } else {
        // handle the case when the leaderboardList is empty
          this.leaderboardList = null;
          this.noLeaderboardList = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }org

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
