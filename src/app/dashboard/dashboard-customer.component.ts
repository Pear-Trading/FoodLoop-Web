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
  maxPurchase: number = 0;

  weekPurchaseList = {
    week_0: 0,
    week_1: 0,
    week_2: 0,
    week_3: 0,
    week_4: 0,
    week_5: 0,
    week_6: 0,
  };

  sectorNames = {
    A: 'Agriculture, Forestry & Fishing',
    B: 'Mining & Quarrying',
    C: 'Manufacturing',
    D: 'Electricity, Gas, Steam & Air Conditioning',
    E: 'Water & Waste Management',
    F: 'Construction',
    G: 'Wholesale & Retail Trade',
    H: 'Transportation & Storage',
    I: 'Accomodation & Food Services',
    J: 'Information & Communication',
    K: 'Financial & Insurance Activities',
    L: 'Real Estate',
    M: 'Professional, Scientfic & Technical',
    N: 'Administrative & Support Services',
    O: 'Public Administration, Defence & Social Security',
    P: 'Education',
    Q: 'Human Health & Social Work',
    R: 'Arts, Entertainment & Recreation',
    S: 'Other Service Activities',
    T: 'Household Domestic Business',
  }

  sectorIcons = {
    A: 'icon-drop',
    B: 'icon-diamond',
    C: 'icon-settings',
    D: 'icon-energy',
    E: 'icon-trash',
    F: 'icon-wrench',
    G: 'icon-tag',
    H: 'icon-speedometer',
    I: 'icon-cup',
    J: 'icon-globe',
    K: 'icon-credit-card',
    L: 'icon-graph',
    M: 'icon-chemistry',
    N: 'icon-drawer',
    O: 'icon-pie-chart',
    P: 'icon-graduation',
    Q: 'icon-support',
    R: 'icon-film',
    S: 'icon-calendar',
    T: 'icon-home',
  }

  sectorLetters: string[] = [];
  sectorPurchases: number[] = [];

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
        this.setWeekPurchaseList(result.weeks);
        this.setSectorList(result.sectors);
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
    this.maxPurchase = Object.keys(this.weekPurchaseList).map(key => this.weekPurchaseList[key]).reduce((a,b) => {
      if (! a) { a = 0 }
      if (! b) { b = 0 }
      return Math.max(a,b);
    });
  }

  public setSectorList (data: any) {
    this.sectorLetters = Object.keys(data.sectors).map(key => data.sectors[key]);
    this.sectorPurchases = Object.keys(data.purchases).map(key => data.purchases[key]);
  }

  ngOnInit(): void {
  }
}
