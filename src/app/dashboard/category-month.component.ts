import { Directive, Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { DataType } from '../shared/data-types.enum';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

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
  weekListValueMax1: number = 0;
  weekListValueMax2: number = 0;
  weekListValueMax3: number = 0;
  weekListValueMax4: number = 0;

  categoryList: number[] = [];
  dayList: any[] = [];
  valueList: number[] = [];
  myWeek1: any;
  myWeek2: any;
  myWeek3: any;
  myWeek4: any;
  categoryIdList: number[] = [];
  categoryNameList: string[] = [];
  categoryLimit1: number = 6;
  categoryLimit2: number = 6;
  categoryLimit3: number = 6;
  categoryLimit4: number = 6;

  constructor(
  private api: ApiService,
  ) {
    this.setDate();
    this.api.categoryList().subscribe(
      result => {
        this.setCategoryList(result.categories);
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
    this.api.categoryTransactionList().subscribe(
      result => {
        console.log(result);
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

  private setCategoryList(data: any) {
    this.categoryIdList = Object.keys(data.ids).map(key => data.ids[key]);
    this.categoryNameList = Object.keys(data.names).map(key => data.names[key]);
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
    this.weekList1 = prop(data.data, this.myWeek1);
    this.weekList2 = prop(data.data, this.myWeek2);
    this.weekList3 = prop(data.data, this.myWeek3);
    this.weekList4 = prop(data.data, this.myWeek4);
    this.getMaxValue(this.weekList1, this.weekList2, this.weekList3, this.weekList4);
  }

  private getMaxValue (data1: any,
    data2: any,
    data3: any,
    data4: any) {
    if (data1) {
      this.weekListValueMax1 = Math.max.apply(Math,data1.map(function(o){return o.value;}));
    }
    if (data2) {
      this.weekListValueMax2 = Math.max.apply(Math,data2.map(function(o){return o.value;}));
    }
    if (data3) {
      this.weekListValueMax3 = Math.max.apply(Math,data3.map(function(o){return o.value;}));
    }
    if (data4) {
      this.weekListValueMax4 = Math.max.apply(Math,data4.map(function(o){return o.value;}));
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
