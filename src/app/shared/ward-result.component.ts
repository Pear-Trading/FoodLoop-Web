import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface WardData {
  ward: string;
  sum: number;
  count: number;
}

@Component({
  // tslint:disable-next-line
  selector: '[ward-result]',
  templateUrl: 'ward-result.component.html',
})
export class WardResultComponent implements OnInit {
  @Input() public ward: WardData;

  ngOnInit(): void {
  }
}
