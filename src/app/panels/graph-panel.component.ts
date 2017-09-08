import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrgGraphsService } from '../providers/org-graphs.service';
import { DataType } from '../shared/data-types.enum';
import { ChartData } from '../_interfaces/chart-data';
import * as moment from 'moment';

@Component({
  selector: 'panel-graph',
  templateUrl: 'graph-panel.component.html',
})
export class GraphPanel implements OnInit {

  public chartType = 'line';
  public chartLegend = true;

  public rawChartData: Array<number> = [];

  public chartData: Array<ChartData> = [
    {
      data: [],
      label: 'This Week'
    },
    {
      data: [],
      label: 'Last Week'
    },
    {
      data: [],
      label: 'Week Before Last'
    }
  ];

  public rawChartLabels: Array<string> = [];
  public chartLabels: Array<string> = [];

  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandDanger = '#f86c6b';

  public mainChartElements = 7;

  public mainChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'dddd',
          },
          tooltipFormat: 'dddd',
        },
        gridLines: {
          drawOnChartArea: false,
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: this.convertHex(this.brandInfo, 10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];

  constructor(
    private graphService: OrgGraphsService,
  ) { }

  public ngOnInit(): void {
    const end = moment().startOf('day');
    const start = end.clone().subtract(this.mainChartElements * 3, 'days');
    this.graphService.getGraph('customers_range', {
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD'),
    }).subscribe( result => this.setData(result.graph) );
  }

  private setData(data: any) {
    this.chartLabels = data.labels.slice(this.mainChartElements * 2, this.mainChartElements * 3);
    this.chartData[2].data = data.data.slice(0, this.mainChartElements);
    this.chartData[1].data = data.data.slice(this.mainChartElements, this.mainChartElements * 2);
    this.chartData[0].data = data.data.slice(this.mainChartElements * 2, this.mainChartElements * 3);
  }

  // convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // mainChart

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


}
