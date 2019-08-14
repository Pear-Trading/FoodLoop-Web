import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ApiService} from '../providers/api-service';
import {BaseChartDirective, Color} from 'ng2-charts';
import {CurrencyPipe} from '@angular/common';
import {ChartType} from "chart.js";

@Component({
  templateUrl: 'more-graphs-and-tables.component.html',
})
export class MoreStuffComponent implements OnInit {
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;

  constructor(
    private api: ApiService,
    private currencyPipe: CurrencyPipe,
  ) {
  }

  ngOnInit(): void {
    this.loadYearSpend();
    this.loadSupplierBubble();
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

  private loadSupplierBubble() {
    this.api.loadMiscUrl('organisation/external/supplier_count').subscribe(
      result => {
        console.log(result.data);
        let graph_data = [];
        result.data.map(item => {
          graph_data.push({
            t: item.date,
            r: (item.value / 100000) + 4,
            supplier: item.seller,
            y: item.count,
            value: item.value,
            count: item.count,
          });
        });
        console.log(graph_data);
        this.supplierBubbleChartData[0].data = graph_data;
      }
    )
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

        console.log(result.data);
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
