import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface SupplierData {
  name: string;
  postcode: string;
  spend: number = 0;
}

@Component({
  // tslint:disable-next-line
  selector: '[supplier-result]',
  templateUrl: 'supplier-result.component.html',
})
export class SupplierResultComponent implements OnInit {
  @Input() public supplier: SupplierData;

  ngOnInit(): void {
  }
}
