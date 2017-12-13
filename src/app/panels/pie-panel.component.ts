import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrgGraphsService } from '../providers/org-graphs.service';
import { DataType } from '../shared/data-types.enum';
import { ChartData } from '../_interfaces/chart-data';
import * as moment from 'moment';

@Component({
  selector: 'panel-pie',
  templateUrl: 'pie-panel.component.html',
})
export class PiePanel implements OnInit {

  // Placeholder
  public placeholderChartLabels: string[] = ['Local to Me', 'Local Store', 'Not Local'];
  public placeholderChartData: number[] = [400, 100, 100];


  public chartType = 'doughnut';
  public chartLegend = true;

  //Old

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

  // public mainChartElements = 7;

  constructor(
    private graphService: OrgGraphsService,
  ) { }

  public ngOnInit(): void {
  //   const end = moment().startOf('day');
  //   const start = end.clone().subtract(this.mainChartElements * 3, 'days');
  //   this.graphService.getGraph('customers_range', {
  //     start: start.format('YYYY-MM-DD'),
  //     end: end.format('YYYY-MM-DD'),
  //   }).subscribe( result => this.setData(result.graph) );
  }

  // private setData(data: any) {
  //   this.chartLabels = data.labels.slice(this.mainChartElements * 2, this.mainChartElements * 3);
  //   this.chartData[2].data = data.data.slice(0, this.mainChartElements);
  //   this.chartData[1].data = data.data.slice(this.mainChartElements, this.mainChartElements * 2);
  //   this.chartData[0].data = data.data.slice(this.mainChartElements * 2, this.mainChartElements * 3);
  // }

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

}
