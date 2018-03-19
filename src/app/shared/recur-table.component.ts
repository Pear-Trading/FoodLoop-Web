import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecurResultComponent } from '../shared/recur-result.component';

interface RecurData {
  category: string;
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
  selector: 'recur-table',
  templateUrl: 'recur-table.component.html',
})
export class RecurTableComponent {
  @Input() public recurList: Array<RecurData>;
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;


  public recurClick(event: any): void {
    this.onClick.emit( event );
  }
}
