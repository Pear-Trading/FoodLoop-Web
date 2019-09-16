import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface MetaTypeData {
  type: string;
  sum: number;
  count: number;
}

@Component({
  // tslint:disable-next-line
  selector: '[meta-type-result]',
  templateUrl: 'meta-type-result.component.html',
})
export class MetaTypeResultComponent implements OnInit {
  @Input() public type: MetaTypeData;

  ngOnInit(): void {
  }
}
