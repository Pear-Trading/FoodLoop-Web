import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { CustPiesService } from '../providers/cust-pies.service';
import { DataType } from '../shared/data-types.enum';
import { ChartData } from '../_interfaces/chart-data';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Component({
  selector: 'panel-pie',
  templateUrl: 'pie-panel.component.html',
})
export class PiePanel implements OnInit {

  public chartType = 'doughnut';
  public chartLegend = true;
  public doughnutChartDataLocal: number[] = [];
  public doughnutChartLabelsLocal: string[] = [];
  public doughnutChartDataCategory: number[] = [];
  public doughnutChartLabelsCategory: string[] = [];

  dayList: any[] = [];
  valueList: number[] = [];
  myWeek1: any;
  myWeek2: any;
  myWeek3: any;
  myWeek4: any;

  public purchaseNotEssential: number;
  public purchaseEssential: number;
  public showEssentialChart = false;

  public barChartDataEssential:any[]=[
    {data: 0, label: 'Essential', stack: '1'},
    {data: 0, label: 'Non-Essential', stack: '1'},
  ];

  public barChartLabelsEssential:string[] = ['All Purchases'];

  public barChartOptionsEssential:any = {
      responsive: true,
      scales:{
          xAxes:[{
              stacked:true
          }],
          yAxes:[{
              stacked:true
          }]
      }
    };
  public barChartTypeEssential:string = 'horizontalBar';

  //Old

  // public mainChartElements = 7;

  constructor(
    private api: ApiService,
    private pieService: CustPiesService,
  ) {
    this.setDate();
    this.pieService.getPie().subscribe(
      result => {
        this.setWeekData(result);
        this.setChartData(result.data.local_all);
        this.purchaseEssential = result.data.essentials.purchase_no_essential_total;
        this.purchaseNotEssential = result.data.essentials.purchase_no_total - this.purchaseEssential;
        this.barChartDataEssential = [
          {data: [this.purchaseEssential], label: 'Essential', stack: '1'},
          {data: [this.purchaseNotEssential], label: 'Non-Essential', stack: '1'},
        ];
        this.showEssentialChart = true;
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  public ngOnInit(): void {

  }

  private setChartData(data1: any) {
    this.doughnutChartDataLocal = Object.keys(data1).map(key => data1[key]);
    //this.doughnutChartDataCategory = (this.weekList1.value).map(key => this.weekList1.value[key]);
    // setTimeout is currently a workaround for ng2-charts labels
    setTimeout(() => this.doughnutChartLabelsLocal = Object.keys(data1), 0);
    //setTimeout(() => this.doughnutChartLabelsCategory = Object.keys(this.weekList1.category), 0);
    // console.log(this.doughnutChartDataCategory);
    // console.log(this.doughnutChartLabelsCategory);
  }

  private setDate () {
    this.myWeek1 = moment().startOf('isoWeek').format('YYYY-MM-DD');
    this.myWeek2 = moment(this.myWeek1).subtract(1, 'weeks').format('YYYY-MM-DD');
    this.myWeek3 = moment(this.myWeek2).subtract(1, 'weeks').format('YYYY-MM-DD');
    this.myWeek4 = moment(this.myWeek3).subtract(1, 'weeks').format('YYYY-MM-DD');
    console.log(this.myWeek1, this.myWeek2, this.myWeek3, this.myWeek4)
  }

  private setWeekData (data: any) {
    function prop<T, K extends keyof T>(obj: T, key: K) {
      return obj[key];
    }
    this.weekList1 = prop(data.data.categories, this.myWeek1);
    console.log(this.weekList1);
    this.weekList2 = prop(data.data.categories, this.myWeek2);
    this.weekList3 = prop(data.data.categories, this.myWeek3);
    this.weekList4 = prop(data.data.categories, this.myWeek4);
    this.weekEssential1 = prop(data.data.essentials, this.myWeek1);
    this.weekEssential2 = prop(data.data.essentials, this.myWeek2);
    this.weekEssential3 = prop(data.data.essentials, this.myWeek3);
    this.weekEssential4 = prop(data.data.essentials, this.myWeek4);
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
