import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {ApiService} from '../providers/api-service';
import {BaseChartDirective} from 'ng2-charts';
import {CurrencyPipe} from '@angular/common';
import {ChartType} from "chart.js";
import * as moment from 'moment';

@Component({
  templateUrl: 'more-graphs-and-tables.component.html',
})
export class MoreStuffComponent implements OnInit {
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;

  // Global Filter Setup
  filterFrom: any;
  filterTo: any;

  isBubbleChartLoaded: boolean = false;
  isSupplierChartLoaded: boolean = false;
  wardList: any;
  wardListAvailable = false;
  metaTypeList: any;
  metaTypeListAvailable = false;

  constructor(
    private api: ApiService,
    private currencyPipe: CurrencyPipe,
  ) {
    let now = moment();
    this.filterTo = now.format('YYYY-MM-DD');
    now.subtract(1, 'months');
    this.filterFrom = now.format('YYYY-MM-DD');
    this.tableSummary();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.tableSummary();
    this.loadYearSpend();
    this.loadSupplierBubble();
    this.loadSupplierHistory();
  }

  public showLegend = true;

  /*
   * Supplier Bubble Chart Setup
   */

  private formatGraphData(data: any): any[] {
    let graph_data = [];

    data.data.map(item => {
      graph_data.push({
        t: item.date,
        r: item.value > 1000000 ? (item.value / 200000) : (item.value / 100000) + 5,
        supplier: item.seller,
        y: item.count,
        value: item.value,
        count: item.count,
      });
    });

    return graph_data;
  }

  private loadSupplierBubble() {
    this.api.loadMiscUrl('organisation/external/supplier_count', {
      from: this.filterFrom,
      to: this.filterTo,
    }).subscribe(
      result => {
        this.supplierBubbleChartData[0].data = this.formatGraphData(result);
        this.isBubbleChartLoaded = true;
      }
    )
  }

  public supplierBubbleChartType: ChartType = 'bubble';
  public supplierBubbleChartData: any[] = [
    {
      data: [],
      label: ["Spend"],
      borderColor: 'blue',
      hoverBorderColor: 'black',
      radius: 5,
    },
  ];
  public supplierBubbleChartLabels: string[] = [];
  public supplierBubbleChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        },
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of purchases'
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltip, data) => {
          return this.bubbleTooltipCallback(tooltip, data);
        },
      },
    },
  };

  private bubbleTooltipCallback(tooltipItem: any, data: any) {
    let dataset = data.datasets[tooltipItem.datasetIndex];
    let value = dataset.data[tooltipItem.index];
    return `${value.supplier}: ${this.currencyPipe.transform(value.value, 'GBP', 'symbol', '1.2-2')} over ${value.count} purchases`;
  }

  private tableSummary() {
    this.api.loadMiscUrl('organisation/external/lcc_tables', {
      from: this.filterFrom,
      to: this.filterTo,
    }).subscribe(
      result => {
        this.wardList = result.wards;
        this.metaTypeList = Object.keys(result.types).map(key => result.types[key]);
        if (this.wardList) {
          this.wardListAvailable = true;
        }
        if (this.metaTypeList) {
          this.metaTypeListAvailable = true;
        }
      },
      error => {
        console.log('Retrieval Error');
        console.log(error._body);
      }
    )
  }

  private loadYearSpend() {
    this.api.loadMiscUrl('organisation/external/year_spend', {
      from: this.filterFrom,
      to: this.filterTo,
    }).subscribe(
      result => {
        let value_data = [];
        let count_data = [];

        result.data.map(item => {
          value_data.push({
            t: item.date,
            y: item.value,
          });

          count_data.push({
            t: item.date,
            y: item.count,
          });
        });

        this.yearSpendChartData[0].data = value_data;
        this.yearSpendChartData[1].data = count_data;
      }
    )
  }

  public yearSpendChartData: any[] = [
    {
      data: [],
      label: ["Value £"],
      fill: false,
      borderColor: 'red',
      hoverBackgroundColor: '#ffa1b5',
      hoverBorderColor: 'red',
      yAxisID: 'y-value',
    },
    {
      data: [],
      label: ["Count"],
      fill: false,
      borderColor: 'blue',
      hoverBackgroundColor: '#52afed',
      hoverBorderColor: 'blue',
      yAxisID: 'y-count',
    },
  ];
  public yearSpendChartOptions: any = {
    elements: {line: {tension: 0}},
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        },
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
      yAxes: [
        {id: 'y-value', position: 'left', beginAtZero: true, type: 'linear'},
        {id: 'y-count', position: 'right', beginAtZero: true, type: 'linear'},
      ]
    },
  };
  public yearSpendChartLabels: string[] = [];
  public yearSpendChartType: ChartType = 'line';

  randomData() {
    return Math.random();
  }

  lineChartUpdate() {
    this.loadYearSpend();

  }

  @ViewChild('supplierChart', { read: BaseChartDirective }) supplierChart: BaseChartDirective;

  private loadSupplierHistory() {
    this.api.loadMiscUrl('organisation/external/supplier_history').subscribe(
      result => {
        this._supplierHistoryData = result.data;
        this._supplierHistoryPage = 1;
        this._supplierHistoryPages = Math.ceil(this._supplierHistoryData.length / this._supplierHistoryPerPage);
        this.updateSupplierHistoryData();

        this.isSupplierChartLoaded = true;
      }
    );
  }

  private updateSupplierHistoryData() {

    const lastResult = this._supplierHistoryPerPage * this._supplierHistoryPage;
    console.log(this._supplierHistoryPage);
    const firstResult = lastResult - this._supplierHistoryPerPage;

    const pageData = this._supplierHistoryData.slice(firstResult, lastResult);
    console.log(pageData);

    let labels = [];
    let year = [];
    let half = [];
    let quarter = [];
    pageData.map(item => {
      labels.push(item.name);
      year.push(item.year_total);
      half.push(item.half_total);
      quarter.push(item.quarter_total);
    });

    this.supplierMonthChartData[0].data = quarter;
    this.supplierMonthChartData[1].data = half;
    this.supplierMonthChartData[2].data = year;
    this.supplierMonthChartLabels = labels;
  }

  public nextSupplierHistoryPage() {
    if (this._supplierHistoryPage < this._supplierHistoryPages) {
      this._supplierHistoryPage++;
    }
    this.updateSupplierHistoryData();
  }

  public previousSupplierHistoryPage() {
    if (this._supplierHistoryPage > 1) {
      this._supplierHistoryPage--;
    }
    this.updateSupplierHistoryData();
  }

  private _supplierHistoryData: any[];
  private _supplierHistoryPerPage: number = 15;
  public _supplierHistoryPage: number = 1;
  public _supplierHistoryPages: number = 1;
  public supplierMonthChartData: any[] = [
    {
      data: [],
      label: ["3 Month"],
      fill: false,
      borderColor: 'red',
      hoverBorderColor: 'red',
      hoverBackgroundColor: 'red',
    },
    {
      data: [],
      label: ["6 Month"],
      fill: false,
      borderColor: 'blue',
      hoverBorderColor: 'blue',
      hoverBackgroundColor: 'blue',
    },
    {
      data: [],
      label: ["12 Month"],
      fill: false,
      borderColor: 'orange',
      hoverBorderColor: 'orange',
      hoverBackgroundColor: 'orange',
    },
  ];
  public supplierMonthChartOptions: any = {
    //maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Spend amount £'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Supplier Names'
        }
      }]
    },
  };
  public supplierMonthChartLabels: string[] = [];
  public supplierMonthChartType: ChartType = 'horizontalBar';
}
