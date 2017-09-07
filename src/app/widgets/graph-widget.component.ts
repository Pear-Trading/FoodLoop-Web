import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { OrgGraphsService } from '../providers/org-graphs.service';
import { DataType } from '../shared/data-types.enum';

interface ChartData {
  data: Array<number>;
  label: string;
}

@Component({
  selector: 'widget-graph',
  templateUrl: 'graph-widget.component.html',
})
export class GraphWidget implements OnInit {
  @Input() public graphName: string;
  @Input() public graphTitle = 'Graph';
  @Input() public graphIcon = 'icon-graph';
  @Input() public dataType: DataType = DataType.number;

  @Output() public graphHover = new EventEmitter();
  @Output() public graphClick = new EventEmitter();

  public graphSum: Number = 0;
  public availableDataTypes = DataType;

  public lineChartData: Array<ChartData> = [
    {
      data: [],
      label: 'Series A'
    }
  ];
  public lineChartLabels: Array<string>;
  public lineChartOptions: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: (tooltip, data) => {
          return this.tooltipLabelCallback(tooltip, data);
        },
      },
    },
  };
  public lineChartColours: Array<any> = [
    {
      backgroundColor: '#20a8d8',
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';


  constructor(
    private graphService: OrgGraphsService,
    private currencyPipe: CurrencyPipe,
  ) { }

  ngOnInit(): void {
    if ( this.graphName == null ) {
      throw new Error('Attribute \'graphName\' is required on component \'widget-graph\'');
    }
    if ( this.dataType === undefined ) {
      // Need to do this as it may be passed in a loop with an undefined value
      this.dataType = DataType.number;
    }
    if ( !( this.dataType in DataType ) ) {
      console.warn('Unknown DataType for graph \'' + this.graphName + '\' - defaulting to number');
    }
    this.graphService.getGraph(this.graphName)
      .subscribe( result => this.setData(result.graph) );
  }

  private setData(data: any) {
    this.setChartData(data.data);
    this.setChartLabels(data.labels);
  }

  private setChartData(data: Array<number>) {
    this.lineChartData[0].data = data;
    this.graphSum = data.reduce((a, b) => a + b, 0);
    // Set point size based on data
    if ( data.length < 15 ) {
      this.lineChartOptions.elements.point.radius = 4;
      this.lineChartOptions.elements.line.borderWidth = 1;
    } else {
      this.lineChartOptions.elements.point.radius = 2;
      this.lineChartOptions.elements.line.borderWidth = 2;
    }
  }

  private setChartLabels(data: Array<string>) {
    this.lineChartLabels = data;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  private tooltipLabelCallback(tooltipItem: any, data: any) {
    const value = tooltipItem.yLabel;
    if ( this.dataType === DataType.currency ) {
      return this.currencyPipe.transform(value, 'GBP', true, '1.2-2');
    }
    return value || '0';
  }
}
