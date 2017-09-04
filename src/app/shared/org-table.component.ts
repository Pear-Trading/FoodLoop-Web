import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrgResultComponent } from '../shared/org-result.component';

interface OrgData {
  id: number;
  name: string;
  street_name: string;
  town: string;
  postcode: string;
}

@Component({
  selector: 'org-table',
  templateUrl: 'org-table.component.html',
})
export class OrgTableComponent {
  @Input() public orgList: Array<OrgData>;
  @Output() public onClick = new EventEmitter();

  public orgClick(event: any): void {
    this.onClick.emit( event );
  }
}
