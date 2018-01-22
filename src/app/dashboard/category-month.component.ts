import { Directive, Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { DataType } from '../shared/data-types.enum';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'category-month.component.html'
})
export class CategoryMonthComponent implements OnInit {

  disableCategoryButtonFirst: boolean = false;

  weekPurchaseList = {
    first: 0,
  };

  categoryList: number[] = [];
  dayList: any[] = [];
  valueList: number[] = [];
  categoryLimitFirst: number = 10;
  myWeek1: any;
  myWeek2: any;
  myWeek3: any;
  myWeek4: any;

  constructor(
  private api: ApiService,
  ) {
    this.setDate();
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

  private loadMore () {
    this.disableCategoryButtonFirst = true;
    this.categoryLimitFirst = 100;
  }

  private setDate () {
    this.myWeek1 = moment().format('YYYY-MM-DD');
    this.myWeek2 = moment(this.myWeek1).subtract(1, 'weeks').format('YYYY-MM-DD');
    this.myWeek3 = moment(this.myWeek2).subtract(1, 'weeks').format('YYYY-MM-DD');
    this.myWeek4 = moment(this.myWeek3).subtract(1, 'weeks').format('YYYY-MM-DD');
    console.log(this.myWeek1);
    console.log(this.myWeek2);
    console.log(this.myWeek3);
    console.log(this.myWeek4);
  }

  private setData (data: any) {
    // this.categoryList = Object.keys(data.data.category).map(key => data.data.category[key]);
    // this.dayList = Object.keys(data.data.days).map(key => data.data.days[key]);
    // this.valueList = Object.keys(data.data.value).map(key => data.data.value[key]);
  }

  ngOnInit(): void {
  }
}
