import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ApiService } from '../providers/api-service';
import { CustPiesService } from '../providers/cust-pies.service';
import { DataType } from '../shared/data-types.enum';
import { ChartData } from '../_interfaces/chart-data';

@Component({
  selector: 'polar-area',
  templateUrl: 'polar-panel.component.html',
})

export class PolarAreaChartComponent implements OnInit {
  // PolarArea

  public chartType : 'polar-area';
  public polarAreaChartLabels: Label[];
  public polarAreaChartData: SingleDataSet;
  public chartLegend : Boolean;
  public polarAreaLegend : Boolean;

  public polarChartLabelsLocal: string[] = [];
  public polarChartDataLocal: number[] = [];

  public polarAreaChartType: ChartType = 'polarArea';

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

  ngOnInit() {
    this.polarAreaLegend = this.chartLegend;
    this.polarAreaLegend = true;
  }

  private setChartData(dataLocal: any) {
    this.polarChartDataLocal = Object.keys(dataLocal).map(key => dataLocal[key]);
    // setTimeout is currently a workaround for ng2-charts labels
    setTimeout(() => this.polarChartLabelsLocal = Object.keys(dataLocal), 0);
  }

  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}