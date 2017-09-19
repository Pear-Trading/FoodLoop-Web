import { Component, Input, Output, EventEmitter } from '@angular/core';

interface OrgData {
  id: number;
  name: string;
  street_name: string;
  town: string;
  postcode: string;
}

@Component({
  // tslint:disable-next-line
  selector: '[org-result]',
  templateUrl: 'org-result.component.html',
})
export class OrgResultComponent {
  @Input() public org: OrgData;
  @Output() public onClick = new EventEmitter();

  public orgClick(): void {
    this.onClick.emit(
      this.org
    );
  }
}
