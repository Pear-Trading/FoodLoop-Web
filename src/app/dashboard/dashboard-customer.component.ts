import { Directive, Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import { Router } from '@angular/router';
import { GraphWidget } from '../widgets/graph-widget.component';

@Component({
  templateUrl: 'dashboard-customer.component.html'
})
export class DashboardCustomerComponent implements OnInit {
  customersThisMonth: any;
  moneySpentThisMonth: any;
  pointsTotal: any;
  averageTransactionToday: any;

  /* Setting up dashboard's main variables*/
  name: any;
  email:any;
  myPearPoints: any;
  trends: any;
  myRank: any;
  username: any;

  basicStats = {
    today_sum: 0,
    today_count: 0,
    week_sum: 0,
    week_count: 0,
    month_sum: 0,
    month_count: 0,
    user_sum: 0,
    user_count: 0,
    global_sum: 0,
    global_count: 0,
    user_position: 0,
  };

  constructor(
  private http: Http,
  private api: ApiService,
  ) {
    this.api.basicStats().subscribe(
      result => {
        this.basicStats = result;
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  ngOnInit(): void {
  }
}
