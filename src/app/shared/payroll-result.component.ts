import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

interface PayrollData {
  entry_period: string;
  gross_payroll: number;
  employee_amount: number;
}

@Component({
  // tslint:disable-next-line
  selector: '[payroll-result]',
  templateUrl: 'payroll-result.component.html',
})
export class PayrollResultComponent implements OnInit {
  @Input() public payroll: PayrollData;
  public payrollDate: string;

  ngOnInit(): void {
    this.payrollDate = moment(this.payroll.entry_period).format('MMMM YYYY');
  }
}
