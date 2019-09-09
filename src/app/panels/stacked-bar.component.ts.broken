import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { CustPiesService } from '../providers/cust-pies.service';
import { DataType } from '../shared/data-types.enum';
import { ChartData } from '../_interfaces/chart-data';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxChartModule } from 'devextreme-angular';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
  selector: 'stacked-bar',
  templateUrl: 'stacked-bar.component.html',
})
@NgModule({
  imports: [
      BrowserModule,
      DxChartModule
  ],
  declarations: [StackedBarChartComponent],
  bootstrap: [StackedBarChartComponent]
})
export class StackedBarChartComponent {

  public chartType: 'stacked-bar';
  public chartLegend = true;
  public stackedBarChartDataLocal : number[] = [];
  public stackedBarChartLabelsLocal : string[] = [];

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
    console.log("stacked bar graph tried to initialise");
  }

  private setChartData(dataLocal: any) {
    this.stackedBarChartDataLocal = Object.keys(dataLocal).map(key => dataLocal[key]);
    // setTimeout is currently a workaround for ng2-charts labels
    setTimeout(() => this.stackedBarChartLabelsLocal = Object.keys(dataLocal), 0);
  }

    customizeTooltip(arg: any) {
        return {
            text: arg.percentText + ' - ' + arg.valueText
        };
    }
}


platformBrowserDynamic().bootstrapModule(StackedBarChartComponent);