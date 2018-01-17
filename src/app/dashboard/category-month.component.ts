import { Directive, Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { DataType } from '../shared/data-types.enum';

@Component({
  templateUrl: 'category-month.component.html'
})
export class CategoryMonthComponent implements OnInit {

  disableCategoryButtonFirst: boolean = false;

  weekPurchaseList = {
    first: 0,
  };

  categoryList: number[] = [];
  categoryLimitFirst: number = 10;

  constructor(
  private api: ApiService,
  ) {
    this.api.categoryTransactionList().subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  public loadMore () {
    this.disableCategoryButtonFirst = true;
    this.categoryLimitFirst = 100;
  }

  ngOnInit(): void {
  }
}
