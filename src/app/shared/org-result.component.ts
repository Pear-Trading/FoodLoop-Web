import { Component, Input } from '@angular/core';

@Component({
  selector: 'org-result',
  template:'banana {{ organisation }}',
})
export class OrgResultComponent {
  @Input() organisation: any;
  
}