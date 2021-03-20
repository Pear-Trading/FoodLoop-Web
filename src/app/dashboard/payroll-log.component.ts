import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../providers/api-service';
// import { PaginatePipe } from 'ngx-pagination';
import {PaginationInstance} from 'ngx-pagination';
// import { PaginationControlsComponent } from 'ngx-pagination';
// import { PaginationControlsDirective } from 'ngx-pagination';
// import { TransactionResultComponent } from '../shared/transaction-result.component';
import * as moment from 'moment';


@Component({
  templateUrl: 'payroll-log.component.html',
})
export class PayrollLogComponent implements OnInit {

  payrollList;
  noPayrollList = true;
  myDate: any;
  minDate: any;

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
    this.loadPayrolls(1);
  }

  getMinDate() {
    // gets the April 1st date of the current year
    const aprilDate = moment().month(3).date(1);
    const now = moment();
    // Checks if current time is before April 1st, if so returns true
    const beforeApril = now.isBefore(aprilDate);
    if ( beforeApril == true ) {
      this.minDate = aprilDate.subtract(2, 'years').format('YYYY-MM-DD');
    } else {
      this.minDate = aprilDate.subtract(1, 'years').format('YYYY-MM-DD');
    }
  }

  loadPayrolls(logPage: number) {
    console.log(logPage);
    this.api.payrollList(logPage).subscribe(
      result => {
        if (result.payrolls.length > 0) {
          this.payrollList = result.payrolls;
          // TODO Rename in server
          this.paginateConfig.totalItems = result.page_no;
          this.paginateConfig.currentPage = logPage;
          this.noPayrollList = false;
        } else {
        // handle the case when the payrollList is empty
          this.payrollList = null;
          this.noPayrollList = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
