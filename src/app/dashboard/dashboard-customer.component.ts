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

  disableSectorButton: boolean = false;

  weekPurchaseList = {
    first: 0,
    second: 0,
    max: 0,
    sum: 0,
    count: 0,
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
    U: 'Extraterritorial Organisations and Bodies'
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
    J: 'icon-feed',
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
    U: 'icon-globe',
  }

  sectorClasses = {
    A: 'bg-primary',
    B: 'bg-success',
    C: 'bg-danger',
    D: 'bg-warning',
    E: 'bg-info',
    F: 'bg-primary',
    G: 'bg-success',
    H: 'bg-danger',
    I: 'bg-warning',
    J: 'bg-info',
    K: 'bg-primary',
    L: 'bg-success',
    M: 'bg-danger',
    N: 'bg-warning',
    O: 'bg-info',
    P: 'bg-primary',
    Q: 'bg-success',
    R: 'bg-danger',
    S: 'bg-warning',
    T: 'bg-info',
    U: 'bg-primary',
  }

  sectorLetters: string[] = [];
  sectorPurchases: number[] = [];
  sectorLimit: number = 10;

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
    this.api.customerStats().subscribe(
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
      first:  data.first,
      second: data.second,
      max:    data.max,
      sum:    data.sum,
      count:  data.count,
    };
  }

  public setSectorList (data: any) {
    this.sectorLetters = Object.keys(data.sectors).map(key => data.sectors[key]);
    this.sectorPurchases = Object.keys(data.purchases).map(key => data.purchases[key]);
  }

  private loadMore () {
    this.disableSectorButton = true;
    this.sectorLimit = 22;
  }

  ngOnInit(): void {
  }
}
