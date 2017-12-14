import { Directive, Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { Router } from '@angular/router';
import { GraphWidget } from '../widgets/graph-widget.component';
import { CustBarSnippetComponent } from '../snippets/cust-snippet-bar.component';
import { PiePanel } from '../panels/pie-panel.component';
import { DataType } from '../shared/data-types.enum';

@Component({
  templateUrl: 'dashboard-customer.component.html'
})
export class DashboardCustomerComponent implements OnInit {

  /* Setting up dashboard's main variables*/
  name: any;
  email: any;
  myPearPoints: any;
  trends: any;
  myRank: any;
  username: any;

  weekPurchaseList = {
    week_0: 0,
    week_1: 0,
    week_2: 0,
    week_3: 0,
    week_4: 0,
    week_5: 0,
    week_6: 0,
  };

  sectorList: any;

  // Graph widgets
  public widgetList = [
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
  ];

  constructor(
  private api: ApiService,
  ) {
    this.api.basicStats().subscribe(
      result => {
        this.setWeekPurchaseList(result.data);

      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  public setWeekPurchaseList (data: any) {
    this.weekPurchaseList = {
      week_0: data.purchases[0],
      week_1: data.purchases[1],
      week_2: data.purchases[2],
      week_3: data.purchases[3],
      week_4: data.purchases[4],
      week_5: data.purchases[5],
      week_6: data.purchases[6],
    };
    //this.maxPurchase = Math.max(...this.weekPurchaseList);
    this.maxPurchase = Object.values(this.weekPurchaseList).reduce((a,b) => {
      if (! a) { a = 0 }
      if (! b) { b = 0 }
      return Math.max(a,b);
    });
    console.log(this.maxPurchase);
  }

  ngOnInit(): void {
  }
}
