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

  // PolarArea
  public polarAreaChartLabels: string[] = ['Local', 'Not Local'];
  public polarAreaChartData: number[] = [400, 100];
  public polarAreaLegend = true;
  public polarAreaChartType = 'polarArea';

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
  }

  ngOnInit(): void {
  }
}
