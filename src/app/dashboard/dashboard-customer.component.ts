import { Directive, Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { Router } from '@angular/router';
import { GraphWidget } from '../widgets/graph-widget.component';
import { CustBarSnippetComponent } from '../snippets/cust-snippet-bar.component';
import { DataType } from '../shared/data-types.enum';

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
  email: any;
  myPearPoints: any;
  trends: any;
  myRank: any;
  username: any;

  public widgetList = [
    {
      type: 'graph',
      name: 'total_today',
      title: 'Total Today',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'avg_spend_today',
      title: 'Avg. Spend Today',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'total_last_week',
      icon: 'icon-diamond',
      title: 'Last Week Total',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'avg_spend_last_week',
      icon: 'icon-diamond',
      title: 'Last Week Avg. Spend',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'total_last_month',
      title: 'Last Month Total',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'avg_spend_last_month',
      title: 'Last Month Avg. Spend',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'total_user',
      title: 'User Total',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'avg_spend_user',
      title: 'User Avg. Spend',
      dataType: DataType.currency,
    },
  ];

  constructor(
  private api: ApiService,
  ) {
  }

  ngOnInit(): void {
  }
}
