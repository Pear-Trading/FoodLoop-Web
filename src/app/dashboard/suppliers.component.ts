import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AgmCoreModule } from '@agm/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PaginationInstance } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
@Component({
  templateUrl: 'suppliers.component.html',
})
export class SuppliersComponent implements OnInit, AfterViewInit {
  @Output() public onClick = new EventEmitter();
  @Input() public categories: any;
  public perPage: number = 10;

  searchText: string;

  supplierList: any;
  supplierListAvailable = false;
  sortBy = 'name';
  sortDir = 'asc';

  public paginateConfig: PaginationInstance = {
    id: 'transpaginate',
    itemsPerPage: this.perPage,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadSuppliers(1);
  }

  loadSuppliers(logPage: number) {
    this.api.externalSuppliers(logPage, this.sortBy, this.sortDir, this.perPage, this.searchText).subscribe(
      result => {
        this.supplierList = result.suppliers;
        if (this.supplierList) {
          this.supplierListAvailable = true;
        }
        this.paginateConfig.totalItems = result.page_no;
        this.paginateConfig.currentPage = logPage;
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

  searchSuppliers() {
    // Go back to page 1 when searching
    this.loadSuppliers(1);
  }

  ngAfterViewInit() {
  }

}
