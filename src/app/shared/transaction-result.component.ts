import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

interface TransactionData {
  seller: number;
  value: number;
  purchase_time: string;
}

@Component({
  // tslint:disable-next-line
  selector: '[transaction-result]',
  templateUrl: 'transaction-result.component.html',
})
export class TransactionResultComponent implements OnInit {
  @Input() public transaction: TransactionData;
  public transactionDate: string;

  ngOnInit(): void {
    this.transactionDate = moment(this.transaction.purchase_time).format('llll');
  }
}
