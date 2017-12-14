import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustPiesService } from '../providers/cust-pies.service';
import { DataType } from '../shared/data-types.enum';
import { ChartData } from '../_interfaces/chart-data';

@Component({
  selector: 'panel-pie',
  templateUrl: 'pie-panel.component.html',
})
export class PiePanel implements OnInit {

  public chartType = 'doughnut';
  public chartLegend = true;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];


  //Old

  // public mainChartElements = 7;

  constructor(
    private pieService: CustPiesService,
  ) { }

  public ngOnInit(): void {
    this.pieService.getPie()
    .subscribe( result => this.setData(result.pie) );
  }

  private setData(data: any) {
    this.doughnutChartData = Object.values(data);
    console.log(this.chartData);
    // setTimeout is currently a workaround for ng2-charts labels
    setTimeout(() => this.doughnutChartLabels = Object.keys(data), 0);
    console.log(this.chartLabels);
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

}
