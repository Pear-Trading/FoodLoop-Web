import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
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
export class MoreStuffComponent implements OnInit {  // if you wanna rename this, replace in all files 'MoreStuffComponent' with desired name and 'more-graphs-and-tables.component' with another desired name
  // @Input() public recurList: Array<RecurSupplierData>;
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;

  // chart data
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 30,
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 30,
          }
        }
      ]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 10, y: 10, r: 10 },
        { x: 15, y: 5, r: 15 },
        { x: 26, y: 12, r: 23 },
        { x: 7, y: 8, r: 8 },
      ],
      label: 'Series A',
      backgroundColor: 'green',
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    },
  ];

  public bubbleChartColors: Color[] = [
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

  public recurClick(event: any): void {
    this.onClick.emit( event );
  }

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    
  }

  private setChartData(dataCat: any) {
    
  }
}

