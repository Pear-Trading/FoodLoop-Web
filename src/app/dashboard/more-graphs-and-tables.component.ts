import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ApiService} from '../providers/api-service';
import {BaseChartDirective, Color} from 'ng2-charts';
import {CurrencyPipe} from '@angular/common';
import {ChartType} from "chart.js";
import * as moment from 'moment';
import { NgModel } from '@angular/forms';

@Component({
  templateUrl: 'more-graphs-and-tables.component.html',
})
export class MoreStuffComponent implements OnInit {
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;
  lineChartBegin: any;
  lineChartEnd: any;
  bubbleChartBegin: any;
  bubbleChartEnd: any;
  cached_graph_data: any;

  constructor(
    private api: ApiService,
    private currencyPipe: CurrencyPipe,
  ) {
    this.bubbleChartBegin = moment().format('YYYY-MM-DD');
    this.bubbleChartEnd = moment().format('YYYY-MM-DD');
    this.lineChartBegin = moment().format('YYYY-MM-DD');
    this.lineChartEnd = moment().format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    this.loadYearSpend();
    this.loadSupplierBubble(false, ('January 1, 2018'), ('January 1, 2019')); // pass start and end date ranges to this as Date()s
    this.loadSupplierHistory();
  }

  public showLegend = true;
  public sampleColours: Color[] = [
    {
      backgroundColor: [
        'red',
        'green',
        'blue',
        'purple',
        'yellow',
        'brown',
        'magenta',
        'cyan',
        'orange',
        'pink'
      ]
    }
  ];


  /*
   * Supplier Bubble Chart Setup
   */

  private formatGraphData(passed_graph_data: any, useRange : boolean, start_range: string, end_range: string) : any[] {
    let graph_data = [];

    if (useRange == true) {
      // console.log("using range " + start_range + " : " + end_range);
      passed_graph_data.data.map(item=> {
        let is_item_in_range = (new Date(item.date.substring(0, 10)) >=  new Date(start_range) && new Date(item.date.substring(0, 10)) <= new Date(end_range));
        // there are a lot of `new Date(blah)` but that is what works for some reason.

        console.log("item.date : " + (item.date));
        console.log("Date(item.date) : " + new Date(item.date));
        console.log("Date(item.date.substring(0, 10)) : " + new Date(item.date.substring(0, 10)));
        // console.log("start_range input box: " + start_range);
        // console.log("start_range : " + new Date(start_range));
        // console.log("end_range input box: " + end_range);
        // console.log("end_range : " + new Date(end_range));
        // console.log("item.date >= start_range: " + (new Date(item.date) >=  new Date(start_range)));
        // console.log("item.date <= end_range: " + (new Date(item.date) <=  new Date(end_range)));
        // console.log("is_item_in_range: " + is_item_in_range);
        console.log("----------------------");

        if (is_item_in_range) {
          graph_data.push({
            t: new Date(item.date.substring(0, 10)),
            r: item.value > 1000000 ? (item.value / 1000000) + 10 : (item.value / 100000) + 5,
            supplier: item.seller,
            y: item.count,
            value: item.value,
            count: item.count,
          });
        }
      });

      return graph_data;
    } else {
      passed_graph_data.data.map(item => {
        graph_data.push({
          t: item.date,
          r: item.value > 1000000 ? (item.value / 1000000) + 10 : (item.value / 100000) + 5,
          supplier: item.seller,
          y: item.count,
          value: item.value,
          count: item.count,
        });
      });

      return graph_data;
    }
  }

  private loadSupplierBubble(useRange: boolean, start_range : string, end_range : string) {
    console.log("Fetching data for bubble chart... this will take a while. custom range = " + useRange);

    var is_cached = false;

    console.log(this.cached_graph_data);

    try {
      if (this.cached_graph_data) {
        is_cached = true;
      }
    } catch {
      // not cached
    }

    if (is_cached) {
      console.log("Using cached data of " + this.cached_graph_data.length + " items.");
      this.supplierBubbleChartData[0].data = this.formatGraphData(this.cached_graph_data, useRange, start_range, end_range);
    }
    else {
      console.log("Not using cached data.");
      this.api.loadMiscUrl('organisation/external/supplier_count').subscribe(
        result => {
          this.cached_graph_data = result;

          this.supplierBubbleChartData[0].data = this.formatGraphData(result, useRange, start_range, end_range);
          console.log("Graph fetched with " + this.supplierBubbleChartData[0].data.length + " items.");
        }
      )
    }

  }

  public supplierBubbleChartType: ChartType = 'bubble';
  public supplierBubbleChartData: any[] = [
    {
      data: [],
      label: ["Spend"],
      borderColor: 'blue',
      hoverBackgroundColor: 'blue',
      hoverBorderColor: 'blue',
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
        scaleLabel:{
          display:true,
          labelString:'Date'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display:true,
          labelString:'Number of purchases'
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


  private loadYearSpend() {
    this.api.loadMiscUrl('organisation/external/year_spend').subscribe(
      result => {
        let value_data = [];
        let count_data = [];

        console.log("Graph being fetched from server.");
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

  bubbleChartUpdate() {
    console.log("start_range input box: " + this.bubbleChartBegin);
    console.log("end_range input box: " + this.bubbleChartEnd);

  // this is called when daterange is changed
    this.loadSupplierBubble(true, (this.bubbleChartBegin), (this.bubbleChartEnd));
  /*
    bubbleChartBegin: any;
    bubbleChartEnd: any;
  */
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
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        },
        scaleLabel: {
          display:true,
          labelString: 'Date'
        }
      }],
      yAxes: [
        {id: 'y-value', position: 'left', beginAtZero: true},
        {id: 'y-count', position: 'right', beginAtZero: true},
      ]
    },
  };
  public yearSpendChartColors: Color[] = [
    {
      backgroundColor: [
        '#ffa1b5',
        '#52afed'
      ]
    }
  ];
  public yearSpendChartLabels: string[] = [];
  public yearSpendChartType: ChartType = 'line';

  randomData() {
    return Math.random();
  }

  lineChartUpdate() {
    console.log("start_range input box: " + this.lineChartBegin.date);
    console.log("start_range : " + new Date(this.lineChartBegin));
    console.log("end_range input box: " + this.lineChartEnd);
    console.log("end_range : " + new Date(this.lineChartEnd));

    this.loadYearSpend();
    console.log("Line chart updating...");

  }

  @ViewChild('supplierChart', {read: BaseChartDirective, static: false}) supplierChart: BaseChartDirective;

  private loadSupplierHistory() {
    this.api.loadMiscUrl('organisation/external/supplier_history').subscribe(
      result => {
        let labels = [];
        let year = [];
        let half = [];
        let quarter = [];
        result.data.map(item => {
          labels.push(item.name);
          year.push(item.year_total);
          half.push(item.half_total);
          quarter.push(item.quarter_total);
        });
        this.supplierMonthChartData[0].data = quarter.slice(0,15);
        this.supplierMonthChartData[1].data = half.slice(0,15);
        this.supplierMonthChartData[2].data = year.slice(0,15);
        this.supplierMonthChartLabels = labels.slice(0,15);
      }
    )
  }
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
          display:true,
          labelString: 'Spend amount £'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display:true,
          labelString: 'Supplier Names'
        }
      }]
    },
  };
  public supplierMonthChartLabels: string[] = [];
  public supplierMonthChartType: ChartType = 'horizontalBar';
}
