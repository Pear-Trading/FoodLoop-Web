import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { CurrencyPipe } from '@angular/common';
import { DataType } from '../shared/data-types.enum';
import * as moment from 'moment';
import { BubbleChartComponent } from '../panels/bubble-panel';
import { AgmCoreModule } from '@agm/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// interface RecurSupplierData {
//   name : string;
// }

@Component({
  templateUrl: 'more-graphs-and-tables.component.html',
})
export class MoreStuffComponent implements OnInit {
// @Input() public recurList: Array<RecurSupplierData>;
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;

  public recurClick(event: any): void {
    this.onClick.emit( event );
  }

  constructor(
    private api: ApiService,
    private currencyPipe: CurrencyPipe,
  ) { }

  ngOnInit(): void {
  }

  // main vars

  public bootstrapColours: string[] = ['bg-primary', 'bg-secondary', 'bg-success',
  'bg-danger', 'bg-warning', 'bg-info'];

  // REAL chart data

  public chartType = 'bubble';
  public chartLegend = true;
  public bubbleChartDataCategory: any[] = [
    {
  data: [
    { x: 10, y: 10, r: 10 },
    { x: 15, y: 5, r: 15 },
    { x: 26, y: 12, r: 23 },
    { x: 7, y: 8, r: 8 },
  ],
  label: ["Series A"],
  backgroundColor: 'green',
  borderColor: 'blue',
  hoverBackgroundColor: 'purple',
  hoverBorderColor: 'red',
},
{
data: [
  { x: 10, y: 2, r: 10 },
  { x: 15, y: 1, r: 15 },
  { x: 26, y: 7, r: 23 },
  { x: 5, y: 8, r: 8 },
  ],
  label: ["Series B"],
  backgroundColor: 'green',
  borderColor: 'blue',
  hoverBackgroundColor: 'purple',
  hoverBorderColor: 'red',
},

  ];
  public bubbleChartLabelsCategory: string[] = [];

  public bubbleChartOptionsCategory:any = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
      }
    }
  ],
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
          return this.tooltipLabelCallback(tooltip, data);
        },
      },
    },
  }

  private setChartData(dataCat: any) {
    // now we just need some data and it will display!
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  // functions

  private tooltipLabelCallback(tooltipItem: any, data: any) {
    var dataset = data.datasets[tooltipItem.datasetIndex];
    var value = dataset.data[tooltipItem.index];
    return this.currencyPipe.transform(value, 'GBP', 'symbol', '1.2-2');
  }

  // SAMPLE chart data

  public sampleBubbleChartColors: Color[] = [
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
}
