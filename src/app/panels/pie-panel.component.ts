import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../providers/api-service';
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
  public doughnutChartDataLocal: number[] = [];
  public doughnutChartLabelsLocal: string[] = [];
  public doughnutChartColors: any[] = [{ backgroundColor: [
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
 }];

  constructor(
    private api: ApiService,
    private pieService: CustPiesService,
  ) {
    this.pieService.getPie().subscribe(
      result => {
        this.setChartData(result.local_all);
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  public ngOnInit(): void {

  }

  private setChartData(dataLocal: any) {
    this.doughnutChartDataLocal = Object.keys(dataLocal).map(key => dataLocal[key]);
    // setTimeout is currently a workaround for ng2-charts labels
    setTimeout(() => this.doughnutChartLabelsLocal = Object.keys(dataLocal), 0);
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
  }

  public chartHovered(e: any): void {
  }

}
