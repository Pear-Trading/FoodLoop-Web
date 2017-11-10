import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface LeaderboardData {
  position: number;
  display_name: number,
  value: number;
}

@Component({
  // tslint:disable-next-line
  selector: '[leaderboard-result]',
  templateUrl: 'leaderboard-result.component.html',
})
export class LeaderboardResultComponent implements OnInit {
  @Input() public leaderboard: LeaderboardData;
  @Input() public listType: string;

  ngOnInit(): void {
  }
}
