import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AgmCoreModule } from '@agm/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// interface RecurSupplierData {
//   name : string;
// }

@Component({
  templateUrl: 'more-graphs-and-tables.component.html',
})
export class MoreStuffComponent implements OnInit {  // if you wanna rename this, replace in all files 'MoreStuffComponent' with desired name and 'more-graphs-and-tables.component' with another desired name
  // @Input() public recurList: Array<RecurSupplierData>;
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;

  public recurClick(event: any): void {
    this.onClick.emit( event );
  }

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    
  }
}
