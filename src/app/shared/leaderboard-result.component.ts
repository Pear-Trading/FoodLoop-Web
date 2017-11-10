import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface LeaderboardData {
  seller: number;
  value: number;
  purchase_time: string;
}

@Component({
  // tslint:disable-next-line
  selector: '[leaderboard-result]',
  templateUrl: 'leaderboard-result.component.html',
})
export class LeaderboardResultComponent implements OnInit {
  @Input() public leaderboard: leaderboardData;

  ngOnInit(): void {
  }
}
