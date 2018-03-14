import { Component, OnInit, EventEmitter, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PaginationInstance } from 'ngx-pagination';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'transaction-log.component.html',
})
export class TransactionLogComponent implements OnInit {

  transactionList: any;
  recurringTransactionList: any;
  noTransactionList = true;
  noRecurringList = true;
  myDate: any;
  minDate: any;
  public p: any;
  public modalRef: BsModalRef;
  clickedRecur: any;
  public updatedDate: string;
  public startTime: string;
  categoryIdList: number[] = [];
  categoryNameList: string[] = [];

  public paginateConfig: PaginationInstance = {
        id: 'transpaginate',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0
    };

  constructor(
  private api: ApiService,
  private modalService: BsModalService,
  ) {
    this.myDate = moment().format('YYYY-MM-DD[T]HH:mm');
    this.api.categoryList().subscribe(
      result => {
        //this.setCategoryList(result.categories);
        this.categoryIdList = result.categories;
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
    // this.myDate = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.loadTransactions(1);
  }

  private setCategoryList(data: any) {
    this.categoryIdList = Object.keys(data.ids).map(key => data.ids[key]);
    this.categoryNameList = Object.keys(data.names).map(key => data.names[key]);
  }

  byId(c1: ItemModel, c2: ItemModel) {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  loadTransactions(logPage: number) {
    this.api.transList(logPage).subscribe(
      result => {
        if (result.transactions.length > 0) {
          this.transactionList = result.transactions;
          // TODO Rename in server
          this.paginateConfig.totalItems = result.page_no;
          this.paginateConfig.currentPage = logPage;
          this.noTransactionList = false;
        } else {
        // handle the case when the transactionList is empty
          this.transactionList = null;
          this.noTransactionList = true;
        }
        if (result.recurring_transactions) {
          this.recurringTransactionList = result.recurring_transactions;
          this.noRecurringList = false;
        } else {
          this.recurringTransactionList = null;
          this.noRecurringList = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  recurringTransactionDetails(clicked, template: TemplateRef<any>) {
    this.clickedRecur = clicked;
    console.log(this.clickedRecur);
    this.updatedTime = moment(this.clickedRecur.last_updated).format('YYYY-MM-DD[T]HH:mm');
    this.startTime = moment(this.clickedRecur.start_time).format('YYYY-MM-DD[T]HH:mm');
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  editRecurringTransaction() {
    let updatedDateSubmit = moment(this.updatedTime, 'YYYY-MM-DD[T]HH:mm').local().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    let startTimeSubmit = moment(this.startTime, 'YYYY-MM-DD[T]HH:mm').local().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    let myParams = {
      category: this.clickedRecur.category,
      essential: this.clickedRecur.essential,
      id: this.clickedRecur.id,
      last_updated: this.updatedDate,
      recurring_period: this.updatedDateSubmit,
      seller: this.clickedRecur.seller,
      start_time: this.startTimeSubmit,
      value: this.clickedRecur.value,
    };
    /******************************/

    this.api
    .upload(myParams)
    .subscribe(
      result => {
        if ( result.success === true ) {
          console.log('Successful Upload');
          console.log(result);
          this.transactionFormStatus = 'success';
          console.log(this.transactionFormStatus);
          this.resetForm();
        } else {
          console.log('Upload Error');
          this.transactionFormStatusError = JSON.stringify(result.status) + 'Error, ' + JSON.stringify(result.message);
          this.transactionFormStatus = 'send_failed';
          console.log(this.transactionFormStatus);
        }
      },
      error => {
        console.log('Upload Error');
        console.log(error);
        try {
          console.log(error.error);
          const jsonError = error.json();
          console.log('boop');
          this.transactionFormStatusError = '"' + jsonError.error + '" Error, ' + jsonError.message;
        } catch (e) {
          this.transactionFormStatusError = 'There was a server error, please try again later.';
        }
        this.transactionFormStatus = 'send_failed';
        console.log(this.transactionFormStatus);
      }
    );
  }

}
