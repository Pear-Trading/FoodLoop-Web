import { Directive, Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ApiService } from '../providers/api-service';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { GraphWidget } from '../widgets/graph-widget.component';
import { Color, Label } from 'ng2-charts';
import { CustBarSnippetComponent } from '../snippets/cust-snippet-bar.component';
import { PiePanel } from '../panels/pie-panel.component';
import { DataType } from '../shared/data-types.enum';
import * as moment from 'moment';
import { MoreStuffComponent } from '../dashboard/more-graphs-and-tables.component';
// import { StackedBarChartComponent } from '../panels/stacked-bar.component';

interface SuppliersComponent {
  name : string;
}

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

  disableCategoryButton: boolean = false;

  public bootstrapColours: string[] = ['bg-primary', 'bg-secondary', 'bg-success',
'bg-danger', 'bg-warning', 'bg-info'];

  public chartType = 'doughnut';
  public chartLegend = true;
  public doughnutChartDataCategory: any[] = [];
  public doughnutChartLabelsCategory: string[] = [];

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
  public showEssentialBarChart = false;
  public showCategoryBarChart = false;
  public showCategoryDoughnutChart = false;

  public barChartDataEssential:any[]=[
    {data: 0, label: 'Essential', stack: '1'},
    {data: 0, label: 'Non-Essential', stack: '1'},
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

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
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
  public lineChartColors: Color[] = [
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
  public lineChartLegend = true;
  public lineChartType = 'line';


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
  private currencyPipe: CurrencyPipe,
  ) {
    this.setDate();
    this.api.customerStats().subscribe(
      result => {
        this.setWeekPurchaseList(result.weeks);
        this.setWeekData(result);
        this.setChartData(result.data.cat_total);
        this.totalCategoryList = result.data.cat_list;
        if (this.totalCategoryList) {
          this.showTotalCategoryList = true;
        }
        this.purchaseEssential = result.data.essentials.purchase_no_essential_total;
        this.purchaseNotEssential = result.data.essentials.purchase_no_total - this.purchaseEssential;
        this.barChartDataEssential = [
          {data: [this.purchaseEssential], label: 'Essential', stack: '1'},
          {data: [this.purchaseNotEssential], label: 'Non-Essential', stack: '1'},
        ];
        this.showEssentialBarChart = true;
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  private setChartData(dataCat: any) {
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
