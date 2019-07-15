import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ApiService} from '../providers/api-service';
import {Color} from 'ng2-charts';
import {CurrencyPipe} from '@angular/common';

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
  public supplierBubbleChartType = 'bubble';
  public supplierBubbleChartData: any[] = [
    {
      data: [
        {t: '20180123', y: 54.34, r: 32, supplier: 'Tims', count: 4},
        {t: '20180101', y: 123.34, r: 123, supplier: 'Daves', count: 12},
        {t: '20180314', y: 11.345, r: 33, supplier: 'erry', count: 13},
        {t: '20180615', y: 112.6, r: 22, supplier: 'qwert', count: 124},
        {t: '20180714', y: 91234.5, r: 8, supplier: 'Bobs', count: 1234},
        {t: '20181230', y: 23.12, r: 67, supplier: 'Ben Bobs', count: 4},
      ],
      label: ["Series A"],
      backgroundColor: 'green',
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    },
  ];
  public supplierBubbleChartLabels: string[] = [];
  public supplierBubbleChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          parser: 'YYYYMMDD',
          unit: 'month'
        }
      }],
      yAxes: [
        {
          ticks: {
            min: 0,
          }
        }
      ]
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
    return `${value.supplier}: ${this.currencyPipe.transform(value.y, 'GBP', 'symbol', '1.2-2')} over ${value.count} purchases`;
  }

  public yearSpendChartData: any[] = [
    {
      data: [
        {t: '20180101', y: 123.34},
        {t: '20180314', y: 11.345},
        {t: '20180615', y: 112.6},
        {t: '20180714', y: 91234.5},
        {t: '20181230', y: 23.12},
      ],
      label: ["Value"],
      fill: false,
      borderColor: 'red',
      hoverBorderColor: 'red',
      hoverBackgroundColor: 'red',
      yAxisID: 'y-value',
    },
    {
      data: [
        {t: '20180101', y: 12},
        {t: '20180314', y: 11},
        {t: '20180615', y: 1},
        {t: '20180714', y: 9},
        {t: '20181230', y: 23},
      ],
      label: ["Count"],
      fill: false,
      borderColor: 'blue',
      hoverBackgroundColor: 'blue',
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
          parser: 'YYYYMMDD',
          unit: 'month'
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
  public yearSpendChartLabels: string[] = [];
  public yearSpendChartType = 'line';

  randomData() {
    return Math.random();
  }

  public supplierMonthChartData: any[] = [
    {
      data: [
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
      ],
      label: ["3 Month"],
      fill: false,
      borderColor: 'red',
      hoverBorderColor: 'red',
      hoverBackgroundColor: 'red',
    },
    {
      data: [
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
      ],
      label: ["6 Month"],
      fill: false,
      borderColor: 'red',
      hoverBorderColor: 'red',
      hoverBackgroundColor: 'red',
    },
    {
      data: [
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
        this.randomData(),
      ],
      label: ["12 Month"],
      fill: false,
      borderColor: 'red',
      hoverBorderColor: 'red',
      hoverBackgroundColor: 'red',
    },
  ];
  public supplierMonthChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [],
      yAxes: []
    },
  };
  public supplierMonthChartLabels: string[] = [
    'some name',
    'another name',
    'more names',
    'again',
    'some',
    'random',
    'names'
  ];
  public supplierMonthChartType = 'horizontalBar';

  private setChartData(dataCat: any) {
    // now we just need some data and it will display!
  }

  // functions


  // SAMPLE chart data

}
