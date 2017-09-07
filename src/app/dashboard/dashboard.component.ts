import { Directive, Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import { Router } from '@angular/router';
import { GraphWidget } from '../widgets/graph-widget.component';
import { DataType } from '../shared/data-types.enum';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  shuffledArray: any;
  showGraph: any;
  showSnippet: any;
  customersThisMonth: any;
  moneySpentThisMonth: any;
  pointsTotal: any;
  averageTransactionToday: any;
  customersThisWeek: any;
  customersLastWeek: any;
  customersLastMonth: any;
  customersLastYear: any;
  pointsThisWeek: any;
  pointsLastWeek: any;
  percentOfCustomersSector: any;
  noOfCustomersSector: any;
  percentOfLocalSuppliers: any;
  percentOfSingleCompetitorLocalSuppliers: any;

  public widgetList = [
    {
      type: 'graph',
      name: 'customers_last_7_days',
      icon: 'icon-people',
      title: 'Customers Last 7 Days',
    },
    {
      type: 'graph',
      name: 'customers_last_30_days',
      icon: 'icon-people',
      title: 'Customers Last 30 Days',
    },
    {
      type: 'graph',
      name: 'sales_last_7_days',
      icon: 'icon-diamond',
      title: 'Sales Last 7 Days',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'sales_last_30_days',
      icon: 'icon-diamond',
      title: 'Sales Last 30 Days',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'purchases_last_7_days',
      title: 'Purchases Last 7 Days',
      dataType: DataType.currency,
    },
    {
      type: 'graph',
      name: 'purchases_last_30_days',
      title: 'Purchases Last 30 Days',
      dataType: DataType.currency,
    },
  ];

  constructor(
  private http: Http,
  private api: ApiService,
  ) {
  this.shuffle = this.shuffledArray;
  this.api.graph_data(undefined)
    .subscribe(
      result => {
        console.log(result);
        // Return what data to show 4 of
        this.showGraph = result.elementstoshow.graphs;
        this.showSnippet = result.elementstoshow.snippets;
        // Percentage Chart
        this.percentOfLocalSuppliers = result.data.localsuppliers.percentownlocal;
        this.percentOfSingleCompetitorLocalSuppliers = result.data.localsuppliers.percentsinglecompetitorlocal;
        // Percentage Chart 2
        this.percentOfCustomersSector = result.data.customersinsector.percent;
        this.noOfCustomersSector = result.data.customersinsector.customerno;
        // Chart 1
        this.customersThisWeek = result.data.customersthisweek;
        this.lineChart1Data[0].data = this.customersThisWeek.customerno;
        this.lineChart1Labels = this.customersThisWeek.day;
        // Chart 4
        this.customersLastYear = result.data.customerslastyear;
        this.lineChart4Data[0].data = this.customersLastYear.customerno;
        this.lineChart4Labels = this.customersLastYear.month;
        // Chart 5
        this.pointsThisWeek = result.data.pointsthisweek;
        this.lineChart5Data[0].data = this.pointsThisWeek.points;
        this.lineChart5Labels = this.pointsThisWeek.day;
        // Chart 6
        this.pointsLastWeek = result.data.pointslastweek;
        this.barChart1Data[0].data = this.pointsLastWeek.points;
        this.barChart1Labels = this.pointsLastWeek.day;
        // Chart 7
        this.customersLastWeek = result.data.customerslastweek;
        this.lineChart6Data[0].data = this.customersLastWeek.returningcustomerno;
        this.lineChart6Labels = this.customersLastWeek.day;
        // Chart 8
        this.customersLastMonth = result.data.customerslastmonth;
        this.lineChart7Data[0].data = this.customersLastMonth.returningcustomerno;
        this.lineChart7Labels = this.customersLastMonth.day;
        // Chart 9
        this.customersLastYear = result.data.customerslastyear;
        this.lineChart8Data[0].data = this.customersLastYear.returningcustomerno;
        this.lineChart8Labels = this.customersLastYear.month;
      }
    ),
  this.api.breadcrumb_data(undefined)
    .subscribe(
      result => {
        console.log(result);
        this.customersThisMonth = result.customersthismonth;
        this.moneySpentThisMonth = result.moneyspentthismonth;
        this.pointsTotal = result.pointstotal;
        this.averageTransactionToday = result.averagetransactiontoday;
      }
    );
  }

  // Fisher-Yates shuffle function
  public shuffle(array) {
    return new Promise(resolve => {
      let counter = array.length;

      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        const index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        const temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }

      this.shuffledArray = array;
      resolve(true);
    });
  }

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  // dropdown buttons
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
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

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = [];
  public lineChart1Options: any = {
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
  public lineChart1Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart4
  public lineChart4Data: Array<any> = [
    {
      data: [],
      label: 'Series B'
    }
  ];
  public lineChart4Labels: Array<any> = [];
  public lineChart4Options: any = {
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
        tension: 0.00001,
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
  public lineChart4Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart4Legend = false;
  public lineChart4Type = 'line';

  // lineChart6
  public lineChart6Data: Array<any> = [
    {
      data: [],
      label: 'Series B'
    }
  ];
  public lineChart6Labels: Array<any> = [];
  public lineChart6Options: any = {
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
        tension: 0.00001,
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
  public lineChart6Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart6Legend = false;
  public lineChart6Type = 'line';

  // lineChart7
  public lineChart7Data: Array<any> = [
    {
      data: [],
      label: 'Series B'
    }
  ];
  public lineChart7Labels: Array<any> = [];
  public lineChart7Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 2,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart7Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart7Legend = false;
  public lineChart7Type = 'line';

  // lineChart8
  public lineChart8Data: Array<any> = [
    {
      data: [],
      label: 'Series B'
    }
  ];
  public lineChart8Labels: Array<any> = [];
  public lineChart8Options: any = {
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
        tension: 0.00001,
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
  public lineChart8Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart8Legend = false;
  public lineChart8Type = 'line';

  // lineChart5
  public lineChart5Data: Array<any> = [
    {
      data: [],
      label: 'Series A'
    }
  ];
  public lineChart5Labels: Array<any> = [];
  public lineChart5Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
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
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart5Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart5Legend = false;
  public lineChart5Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [],
      label: 'Series A'
    }
  ];
  public barChart1Labels: Array<any> = [];
  public barChart1Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
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
    legend: {
      display: false
    }
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
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public socialChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public socialChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public socialChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public socialChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public socialChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public socialChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
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
    legend: {
      display: false
    }
  };
  public socialChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public socialChartLegend = false;
  public socialChartType = 'line';

  // sparkline charts

  public sparklineChartData1: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Clients'
    }
  ];
  public sparklineChartData2: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Clients'
    }
  ];

  public sparklineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public sparklineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
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
    legend: {
      display: false
    }
  };
  public sparklineChartDefault: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#d1d4d7',
    }
  ];
  public sparklineChartPrimary: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandPrimary,
    }
  ];
  public sparklineChartInfo: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandInfo,
    }
  ];
  public sparklineChartDanger: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
    }
  ];
  public sparklineChartWarning: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandWarning,
    }
  ];
  public sparklineChartSuccess: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
    }
  ];


  public sparklineChartLegend = false;
  public sparklineChartType = 'line';


  ngOnInit(): void {
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(this.random(50, 200));
    }
  }
}
