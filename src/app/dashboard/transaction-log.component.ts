import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import { TransactionResultComponent } from '../shared/transaction-result.component';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'transaction-log.component.html',
  providers: [ApiService]
})
export class TransactionLogComponent {

  transactionList;
  noTransactionList = true;
  myDate: any;
  minDate: any;
  logPage: any = 1;

  constructor(
  private http: Http,
	private api: ApiService,
	) {
    this.myDate = moment().format('YYYY-MM-DD[T]HH:mm');
    // this.myDate = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.getMinDate();
    this.loadTransactions();
  }

  getMinDate(){
    // gets the April 1st date of the current year
    let aprilDate = moment().month(3).date(1);
    let now = moment();
    // Checks if current time is before April 1st, if so returns true
    let beforeApril = now.isBefore(aprilDate);
    if ( beforeApril == true ) {
      this.minDate = aprilDate.subtract(2, 'years').format('YYYY-MM-DD');
    } else {
      this.minDate = aprilDate.subtract(1, 'years').format('YYYY-MM-DD');
    }
  }

  loadTransactions() {
    this.api.transList(this.logPage).subscribe(
      result => {
        if(result.transactions.length > 0) {
          this.transactionList = result.transactions;
          console.log(this.transactionList);
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
