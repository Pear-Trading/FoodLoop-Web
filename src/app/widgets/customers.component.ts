import { Component, OnInit } from '@angular/core';
import { OrgGraphsService } from '../providers/org-graphs.service';

interface ChartData {
  data: Array<number>;
  label: string;
}

@Component({
  selector: 'widget-customers-last-7-days',
  templateUrl: 'customers.component.html',
})
export class Customer7DayWidget implements OnInit {

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
    { // grey
      backgroundColor: '#20a8d8',
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  public customerSum: Number = 0;

  constructor(private graphService: OrgGraphsService) { }

  ngOnInit(): void {
    this.graphService.getGraph('customers_last_7_days')
      .subscribe(
        result => {
          console.log(result);
          this.lineChartData[0].data = result.graph.count;
          this.lineChartLabels = result.graph.day;
          this.customerSum = this.lineChartData[0].data.reduce((a, b) => a + b, 0);
        }
      );
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
