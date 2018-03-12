import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../providers/api-service';
// import { PaginatePipe } from 'ngx-pagination';
import {PaginationInstance} from 'ngx-pagination';
// import { PaginationControlsComponent } from 'ngx-pagination';
// import { PaginationControlsDirective } from 'ngx-pagination';
// import { TransactionResultComponent } from '../shared/transaction-result.component';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'transaction-log.component.html',
})
export class TransactionLogComponent implements OnInit {

  transactionList;
  noTransactionList = true;
  noRecurringList = true;
  myDate: any;
  minDate: any;
  public p: any;

  public paginateConfig: PaginationInstance = {
        id: 'transpaginate',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0
    };

  constructor(
  private api: ApiService,
  ) {
    this.myDate = moment().format('YYYY-MM-DD[T]HH:mm');
    // this.myDate = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.getMinDate();
    this.loadTransactions(1);
  }

  getMinDate() {
    // gets the April 1st date of the current year
    const aprilDate = moment().month(3).date(1);
    const now = moment();
    // Checks if current time is before April 1st, if so returns true
    const beforeApril = now.isBefore(aprilDate);
    if ( beforeApril === true ) {
      this.minDate = aprilDate.subtract(2, 'years').format('YYYY-MM-DD');
    } else {
      this.minDate = aprilDate.subtract(1, 'years').format('YYYY-MM-DD');
    }
  }

  loadTransactions(logPage: number) {
    console.log(logPage);
    this.api.transList(logPage).subscribe(
      result => {
        if (result.transactions.length > 0) {
          this.transactionList = result.transactions;
          // TODO Rename in server
          this.paginateConfig.totalItems = result.page_no;
          this.paginateConfig.currentPage = logPage;
          this.noTransactionList = false;
        } else {
        // handle the case when the transactionList is empty
          this.transactionList = null;
          this.noTransactionList = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
