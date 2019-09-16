import { Directive, Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { DataType } from '../shared/data-types.enum';
import * as moment from 'moment';


@Component({
  templateUrl: 'category-month.component.html'
})
export class CategoryMonthComponent implements OnInit {

  disableCategoryButton1: boolean = false;
  disableCategoryButton2: boolean = false;
  disableCategoryButton3: boolean = false;
  disableCategoryButton4: boolean = false;

  weekPurchaseList = {
    first: 0,
  };

  weekList1 = [];
  weekList2 = [];
  weekList3 = [];
  weekList4 = [];
  weekListValueSum1: number = 0;
  weekListValueSum2: number = 0;
  weekListValueSum3: number = 0;
  weekListValueSum4: number = 0;
  weekEssential1: number = 0;
  weekEssential2: number = 0;
  weekEssential3: number = 0;
  weekEssential4: number = 0;

  dayList: any[] = [];
  valueList: number[] = [];
  myWeek1: any;
  myWeek2: any;
  myWeek3: any;
  myWeek4: any;
  categoryLimit1: number = 6;
  categoryLimit2: number = 6;
  categoryLimit3: number = 6;
  categoryLimit4: number = 6;

  constructor(
  private api: ApiService,
  ) {
    this.setDate();
    this.api.categoryTransactionList().subscribe(
      result => {
        this.setData(result);
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  ngOnInit(): void {
  }

  private setDate () {
    this.myWeek1 = moment().startOf('isoWeek').format('YYYY-MM-DD');
    this.myWeek2 = moment(this.myWeek1).subtract(1, 'weeks').format('YYYY-MM-DD');
    this.myWeek3 = moment(this.myWeek2).subtract(1, 'weeks').format('YYYY-MM-DD');
    this.myWeek4 = moment(this.myWeek3).subtract(1, 'weeks').format('YYYY-MM-DD');
  }

  private setData (data: any) {
    function prop<T, K extends keyof T>(obj: T, key: K) {
      return obj[key];
    }
    this.weekList1 = prop(data.data.categories, this.myWeek1);
    this.weekList2 = prop(data.data.categories, this.myWeek2);
    this.weekList3 = prop(data.data.categories, this.myWeek3);
    this.weekList4 = prop(data.data.categories, this.myWeek4);
    this.getMaxValue(this.weekList1, this.weekList2, this.weekList3, this.weekList4);
    this.weekEssential1 = prop(data.data.essentials, this.myWeek1);
    this.weekEssential2 = prop(data.data.essentials, this.myWeek2);
    this.weekEssential3 = prop(data.data.essentials, this.myWeek3);
    this.weekEssential4 = prop(data.data.essentials, this.myWeek4);
  }

  private getMaxValue (data1: any,
    data2: any,
    data3: any,
    data4: any) {
    if (data1) {
      this.weekListValueSum1 = data1.reduce(function (s, a) {return s + a.value;}, 0);
    }
    if (data2) {
      this.weekListValueSum2 = data2.reduce(function (s, a) {return s + a.value;}, 0);
    }
    if (data3) {
      this.weekListValueSum3 = data3.reduce(function (s, a) {return s + a.value;}, 0);
    }
    if (data4) {
      this.weekListValueSum4 = data4.reduce(function (s, a) {return s + a.value;}, 0);
    }
  }

  private loadMore1 () {
    this.disableCategoryButton1 = true;
    this.categoryLimit1 = 20;
  }
  private loadMore2 () {
    this.disableCategoryButton2 = true;
    this.categoryLimit2 = 20;
  }
  private loadMore3 () {
    this.disableCategoryButton3 = true;
    this.categoryLimit3 = 20;
  }
  private loadMore4 () {
    this.disableCategoryButton4 = true;
    this.categoryLimit4 = 20;
  }
}
