import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { CurrencyPipe } from '@angular/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GraphWidget } from '../widgets/graph-widget.component';
import { OrgBarSnippetComponent } from '../snippets/org-snippet-bar.component';
import { GraphPanel } from '../panels/graph-panel.component';
import { OrgPiePanel } from '../panels/org-pie-panel.component';
import { DataType } from '../shared/data-types.enum';
import { ApiService } from '../providers/api-service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  public widgetList = [
    {
      type: 'graph',
      name: 'customers_last_7_days',
      icon: 'icon-people',
      title: 'Customers Last 7 Days',
    },
    {
      type: 'graph',
      name: 'customers_last_30_days',
      icon: 'icon-people',
      title: 'Customers Last 30 Days',
    },
    {
      type: 'graph',
      name: 'sales_last_7_days',
      icon: 'icon-diamond',
      title: 'Sales Last 7 Days',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'sales_last_30_days',
      icon: 'icon-diamond',
      title: 'Sales Last 30 Days',
      dataType: DataType.currency,
    },
    /* Not implemented on server
    {
      type: 'graph',
      name: 'sales_last_quart',
      icon: 'icon-diamond',
      title: 'Sales Last Quart',
      dataType: DataType.currency,
    },
    */
    {
      type: 'graph',
      name: 'purchases_last_7_days',
      title: 'Purchases Last 7 Days',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'purchases_last_30_days',
      title: 'Purchases Last 30 Days',
      dataType: DataType.currency,
    },
    /* Not implemented on server
    {
      type: 'graph',
      name: 'purchases_last_quart;',
      title: 'Purchases Last Quart',
      dataType: DataType.currency,
    },
    */
  ];

  disableCategoryButton: boolean = false;

  public bootstrapColours: string[] = ['bg-primary', 'bg-secondary', 'bg-success',
'bg-danger', 'bg-warning', 'bg-info'];

  public chartType = 'doughnut';
  public chartLegend = true;
  public doughnutChartDataCategory: any[] = [];
  public doughnutChartLabelsCategory: string[] = [];
  public doughnutChartColoursCategory: any[] = [
               {
                 backgroundColor:[
                   '#ffa1b5',
                   '#3cde52',
                   '#52afed',
                   '#c133e3',
                   '#f7fa08',
                   '#75152d',
                   '#ee12ee',
                   '#15eaea',
                   '#eaa015',
                   '#ea1515',
                   '#2d4fcc'
                 ]
               }];


  public doughnutChartOptionsCategory:any = {
    tooltips: {
      callbacks: {
        label: (tooltip, data) => {
          return this.tooltipLabelCallback(tooltip, data);
        },
      },
    },
  }

  myWeek1: any;

  weekList1 = [];

  public purchaseNotEssential: number;
  public purchaseEssential: number;
  public showEssentialBarChart:boolean = false;
  public showCategoryBarChart = false;
  public showCategoryDoughnutChart = false;

  public barChartDataEssential: ChartDataSets[] = [
    {data: [0], label: 'Essential', stack: '1'},
    {data: [0], label: 'Non-Essential', stack: '1'},
  ];
  public barChartLabelsEssential:string[] = ['All Purchases'];
  public barChartOptionsEssential:any = {
      responsive: true,
      scales:{
          xAxes:[{
              stacked:true
          }],
          yAxes:[{
              stacked:true
          }]
      }
    };
  public barChartTypeEssential:string = 'horizontalBar';
  public barChartColoursCategory: any[] = [
    {
      backgroundColor:[
          '#ffa1b5',
          '#3cde52',
          '#52afed',
          '#c133e3',
          '#f7fa08',
          '#75152d',
          '#ee12ee',
          '#15eaea',
          '#eaa015',
          '#ea1515',
          '#2d4fcc'
      ]
    }];

  public barChartOptionsCategory:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: label => `£${label}`
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltip, data) => {
          return this.tooltipLabelCallback(tooltip, data);
        },
      },
    },
  };
  public barChartTypeCategory:string = 'bar';
  public barChartLegendCategory:boolean = false;
  public barChartDataCategory:any[]=[];
  public barChartLabelsCategory:string[] = [];

  public lineChartDataSector: ChartDataSets[] = [
    { data: [], label: '' },
  ];
  public lineChartLabelsSector: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  public lineChartOptionsSector: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [{}]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColorsSector: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegendSector = true;
  public lineChartTypeSector = 'line';

  weekPurchaseList = {
    first: 0,
    second: 0,
    max: 0,
    sum: 0,
    count: 0,
  };

  showTotalCategoryList: boolean = false;
  totalCategoryLimit: number = 10;
  totalCategoryList: any[]=[];

  constructor(
    private router: Router,
    private api: ApiService,
    private currencyPipe: CurrencyPipe,
  ) {
    if (environment.enableAnalytics) {
       this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
    }
    this.setDate();
    this.api.orgStats().subscribe(
      result => {
        this.setWeekPurchaseList(result.weeks);
        this.setWeekData(result);
        this.setChartDataCat(result.data.cat_total);
        this.setChartDataEssential(result.data.essentials);
        this.totalCategoryList = result.data.cat_list;
        if (this.totalCategoryList) {
          this.showTotalCategoryList = true;
        }
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  private setChartDataEssential (dataEs: any) {
    this.purchaseEssential = dataEs.purchase_no_essential_total;
    this.purchaseNotEssential = dataEs.purchase_no_total - this.purchaseEssential;
    this.barChartDataEssential = [
      {data: [this.purchaseEssential], label: 'Essential', stack: '1'},
      {data: [this.purchaseNotEssential], label: 'Non-Essential', stack: '1'},
    ];
    this.showEssentialBarChart = true;
  }

  private setChartDataCat(dataCat: any) {
    this.barChartLabelsCategory = Object.keys(dataCat);
    let barChartDataCategoryInitial = Object.keys(dataCat).map(key => dataCat[key]);
    this.barChartDataCategory = [
      {data: barChartDataCategoryInitial, label: 'Series A'},
    ];
    this.showCategoryBarChart = true;
    if (this.weekList1) {
      let doughnutChartDataCategoryInitial = this.weekList1.map(function(a) {return a.value;});
      this.doughnutChartDataCategory = [
        {data: doughnutChartDataCategoryInitial, label: 'Series A'},
      ];
      // setTimeout is currently a workaround for ng2-charts labels
      setTimeout(() => this.doughnutChartLabelsCategory = this.weekList1.map(function(a) {return a.category;}), 0);
      this.showCategoryDoughnutChart = true;
    }
  }

  private setChartDataSector(dataSec: any) {

  }

  private setDate () {
    this.myWeek1 = moment().startOf('isoWeek').format('YYYY-MM-DD');
  }

  private setWeekData (data: any) {
    function prop<T, K extends keyof T>(obj: T, key: K) {
      return obj[key];
    }
    this.weekList1 = prop(data.data.categories, this.myWeek1);
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

  private categoryLoadMore () {
    this.disableCategoryButton = true;
    this.totalCategoryLimit = 30;
  }

  public getBootstrapColour(index: number) {
    return this.bootstrapColours[index % this.bootstrapColours.length];
  }

  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

  private tooltipLabelCallback(tooltipItem: any, data: any) {
    var dataset = data.datasets[tooltipItem.datasetIndex];
    var value = dataset.data[tooltipItem.index];
    return this.currencyPipe.transform(value, 'GBP', 'symbol', '1.2-2');
  }

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  ngOnInit(): void {
  }
}
