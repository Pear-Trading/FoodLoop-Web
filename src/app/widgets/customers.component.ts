import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';

@Component({
  selector: 'widget-customer-7-days',
  templateUrl: 'customers.component.html',
})
export class Customer7DayWidget implements OnInit {
  public lineChartData: Array<any> = [
    {
      data: [],
      label: 'Series A'
    }
  ];
  public lineChartLabels: Array<any> = [];
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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.graph_data(undefined)
      .subscribe(
        result => {
          console.log(result);
          const customersThisWeek = result.data.customersthisweek;
          this.lineChartData[0].data = customersThisWeek.customerno;
          this.lineChartLabels = customersThisWeek.day;
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
