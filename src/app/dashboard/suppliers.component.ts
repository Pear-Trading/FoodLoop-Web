import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AgmCoreModule } from '@agm/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

interface SuppliersComponent {
  name : string;
}

@Component({
  templateUrl: 'suppliers.component.html',
})
export class SuppliersComponent implements OnInit, AfterViewInit {
  @Input() public recurList: Array<RecurSupplierData>;
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;

  supplierList: any;
  supplierListAvailable = false;
  sortBy = 'name';
  sortDir = 'asc';

  public paginateConfig: PaginationInstance = {
    id: 'transpaginate',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  public recurClick(event: any): void {
    this.onClick.emit( event );
  }

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadSuppliers(1);
  }

  loadSuppliers(logPage: number) {
    this.api.externalSuppliers(logPage, this.sortBy, this.sortDir).subscribe(
      result => {
        this.supplierList = result.suppliers;
        this.paginateConfig.totalItems = result.page_no;
        this.paginateConfig.currentPage = logPage;
        this.noTransactionList = false;
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }


  sortName() { this.sortByColumn('name'); }
  sortPostcode() { this.sortByColumn('postcode'); }
  sortSpend() { this.sortByColumn('spend'); }
  
  sortByColumn(name) {
      this.sortBy = name;
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      this.loadSuppliers(1);
  }

  ngAfterViewInit() {
  }

}
