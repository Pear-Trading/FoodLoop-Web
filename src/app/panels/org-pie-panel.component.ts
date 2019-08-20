import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { OrgPiesService } from '../providers/org-pies.service';
import { DataType } from '../shared/data-types.enum';
import { ChartData } from '../_interfaces/chart-data';


@Component({
  selector: 'org-pie-panel',
  templateUrl: 'org-pie-panel.component.html',
})

export class OrgPiePanel implements OnInit {

  public chartType = 'pie';
  public chartLegend = true;
  public doughnutChartDataLocal: number[] = [];
  public doughnutChartColors: any[] = [
    {
       backgroundColor: [
         '#ffa1b5',
         'green',
         '#52afed',
         'purple',
         'yellow',
         'brown',
         'magenta',
         'cyan',
         'orange',
         'pink'
    ]
  },
  {
    borderColor: [
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
  },
  { borderWidth: [100]
  },
];

  public doughnutChartLabelsLocal: string[] = [];

  constructor(
    private api: ApiService,
    private pieService: OrgPiesService,
  ) {
    this.pieService.getOrgPie().subscribe(
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

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

}
