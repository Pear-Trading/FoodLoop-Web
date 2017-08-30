import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrgGraphsService } from '../providers/org-graphs.service';

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

  @Output() public graphHover = new EventEmitter();
  @Output() public graphClick = new EventEmitter();

  public graphSum: Number = 0;

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
    }
  };
  public lineChartColours: Array<any> = [
    {
      backgroundColor: '#20a8d8',
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';


  constructor(private graphService: OrgGraphsService) { }

  ngOnInit(): void {
    if ( this.graphName == null ) {
      throw new Error('Attribute \'graphName\' is required on component \'widget-graph\'');
    }
    this.graphService.getGraph(this.graphName)
      .subscribe( result => this.setData(result.graph) );
  }

  private setData(data: any) {
    this.setChartData(data.count);
    this.setChartLabels(data.day);
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
}
