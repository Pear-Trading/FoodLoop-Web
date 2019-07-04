import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AgmCoreModule } from '@agm/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  templateUrl: 'new-section.component.html',
})
export class NewSectionComponent implements OnInit, AfterViewInit {

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
  }




}
