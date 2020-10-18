import { Component, OnInit, EventEmitter, TemplateRef } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PaginationInstance } from 'ngx-pagination';
import * as moment from 'moment';


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
  categoryIdList: any;
  categoryList: any;
  categoryNameList: string[] = [];
  transactionFormStatus: string;
  transactionFormStatusSuccess: string;
  transactionFormStatusError = 'Error received, please try again.';
  updatedTime: string;
  accountType: any;
  showMeta = false;

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
        this.categoryList = result.categories;
        this.categoryIdList = Object.keys(this.categoryList);
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
    this.accountType = localStorage.getItem('usertype');
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
    this.updatedTime = moment(this.clickedRecur.display_time, 'llll').format('YYYY-MM-DD[T]HH:mm');
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  editRecurringTransaction() {
    let updatedTimeSubmit = moment(this.updatedTime, 'YYYY-MM-DD[T]HH:mm').local().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    this.clickedRecur.display_time = moment(this.updatedTime).format('llll');
    let myParams = {
      category: (this.clickedRecur.category == 0 ? undefined : this.clickedRecur.category),
      essential: this.clickedRecur.essential,
      id: this.clickedRecur.id,
      apply_time: updatedTimeSubmit,
      recurring_period: this.clickedRecur.recurring_period,
      seller: this.clickedRecur.seller,
      value: this.clickedRecur.value,
    };
    this.api
    .recurUpdate(myParams)
    .subscribe(
      result => {
        if ( result.success === true ) {
          this.transactionFormStatus = 'success';
          this.transactionFormStatusSuccess = 'Edit Succeeded.';
        } else {
          this.transactionFormStatusError = JSON.stringify(result.status) + 'Error, ' + JSON.stringify(result.message);
          this.transactionFormStatus = 'send_failed';
        }
      },
      error => {
        console.log(error);
        try {
          this.transactionFormStatusError = '"' + error.error.error + '" Error, ' + error.error.message;
        } catch (e) {
          this.transactionFormStatusError = 'There was a server error, please try again later.';
        }
        this.transactionFormStatus = 'send_failed';
      }
    );
  }

  deleteRecurringTransaction() {
    let myParams = {
      id: this.clickedRecur.id,
    };
    this.api
    .recurDelete(myParams)
    .subscribe(
      result => {
        if ( result.success === true ) {
          this.transactionFormStatus = 'success';
          this.transactionFormStatusSuccess = 'Delete Succeeded.';
        } else {
          this.transactionFormStatusError = JSON.stringify(result.status) + 'Error, ' + JSON.stringify(result.message);
          this.transactionFormStatus = 'send_failed';
        }
      },
      error => {
        console.log(error);
        try {
          this.transactionFormStatusError = '"' + error.error.error + '" Error, ' + error.error.message;
        } catch (e) {
          this.transactionFormStatusError = 'There was a server error, please try again later.';
        }
        this.transactionFormStatus = 'send_failed';
      }
    );
  }

  toggleShowMeta() {
    this.showMeta = !this.showMeta;
  }
}
