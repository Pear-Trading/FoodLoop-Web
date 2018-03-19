import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

interface RecurData {
  category: number;
  essential: number;
  id: number;
  last_updated: string;
  recurring_period: string;
  seller: string;
  start_time: string;
  value: number;
}

@Component({
  // tslint:disable-next-line
  selector: '[recur-result]',
  templateUrl: 'recur-result.component.html',
})
export class RecurResultComponent {
  @Input() public recur: RecurData;
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;
  public updatedDate: string;

  ngOnInit(): void {
    if (this.recur.last_updated) {
      this.updatedDate = moment(this.recur.last_updated).format('llll');
    } else {
      this.updatedDate = moment(this.recur.start_time).format('llll');
    }
  }

  public recurClick(): void {
    this.onClick.emit(
      this.recur
    );
  }
}
