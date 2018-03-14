import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/api-service';
import { OrgTableComponent } from '../shared/org-table.component';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'add-data.component.html',
})
export class AddDataComponent implements OnInit {
  payrollForm: FormGroup;
  singleSupplierForm: FormGroup;
  employeeForm: FormGroup;
  transactionForm: FormGroup;
  payrollFormStatus: any;
  singleSupplierFormStatus: any;
  employeeFormStatus: any;
  transactionFormStatus: any;
  transactionFormStatusError = 'Error received, please try again.';
  accountType: any;

 submitOrg = {
    name: '',
    street_name: '',
    town: '',
    postcode: '',
  };
  organisationId: number;
  organisationTown: string;
  organisationPostcode: string;
  amount: number;
  essentialPurchase = false;
  recurringPurchase = false;
  recurringType: string;
  transactionAdditionType = 1;
  storeList = [];
  showAddStore = false;
  submitReceipt = false;
  transactionFormInvalid = true;
  myDate: any;
  minDate: any;
  leftCategoryIdList: number[] = [];
  rightCategoryIdList: number[] = [];
  leftCategoryNameList: string[] = [];
  rightCategoryNameList: string[] = [];
  categoryList: any;

  constructor(
  private formBuilder: FormBuilder,
  private api: ApiService,
  ) {
    this.payrollForm = this.formBuilder.group({
    entry_period:         ['', [Validators.required]],
    employee_amount:      ['', [Validators.required]],
    local_employee_amount: ['', [Validators.required]],
    gross_payroll:        ['', [Validators.required]],
    payroll_income_tax:    ['', [Validators.required]],
    payroll_employee_ni:   ['', [Validators.required]],
    payroll_employer_ni:   ['', [Validators.required]],
    payroll_total_pension: ['', [Validators.required]],
    payroll_other_benefit: ['', [Validators.required]],
    });
    this.employeeForm = this.formBuilder.group({
    entry_period:          ['', [Validators.required]],
    employee_no:           ['', [Validators.required]],
    employee_income_tax:    ['', [Validators.required]],
    employee_gross_wage:    ['', [Validators.required]],
    employee_ni:           ['', [Validators.required]],
    employee_pension:      ['', [Validators.required]],
    employee_other_benefit: ['', [Validators.required]],
    });
    this.myDate = moment().format('YYYY-MM-DD[T]HH:mm');
    // this.myDate = new Date().toISOString().slice(0, 16);
    this.api.categoryList().subscribe(
      result => {
        this.setCategoryList(result.categories);
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  ngOnInit(): void {
    this.getMinDate();
    this.accountType = localStorage.getItem('usertype');
  }

  private setCategoryList(data: any) {
    let halfLength = Math.floor(data.length / 2);
    this.leftCategoryList = data.splice(0, halfLength);
    this.rightCategoryList = data;
  }

  getMinDate() {
    // gets the April 1st date of the current year
    const aprilDate = moment().month(3).date(1);
    const now = moment();
    // Checks if current time is before April 1st, if so returns true
    const beforeApril = now.isBefore(aprilDate);
    if ( beforeApril === true ) {
      this.minDate = aprilDate.subtract(2, 'years').format('YYYY-MM-DD');
    } else {
      this.minDate = aprilDate.subtract(1, 'years').format('YYYY-MM-DD');
    }
  }

  initializeItems() {
    // Dont bother searching for an empty or undefined string
    if ( this.submitOrg.name === '' ) {
      return;
    }
    const searchData = {
      search_name: this.submitOrg.name,
    };

    this.api.search(searchData).subscribe(
      data => {
        if (data.validated.length > 0) {
          this.storeList = data.validated;
          this.showAddStore = false;
          this.transactionAdditionType = 1;
        } else {
          this.storeList = data.unvalidated;
          this.showAddStore = false;
          this.transactionAdditionType = 2;
        }
        // handle the case when the storelist is empty
        if (this.storeList.length < 1) {
          this.storeList = [];
          this.showAddStore = true;
          this.transactionAdditionType = 3;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // if user select a item from the list
  addStore(store) {
    this.submitOrg = store;
    this.transactionFormValidate();
    this.organisationId = store.id;
  }

  // search for store
  organisationSearch(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // Filter the store list so search seems quicker
    if (val && val.trim() !== '' && this.storeList.length > 0) {
      this.storeList = this.storeList.filter(
        (item) => {
          return ( item.name.toLowerCase().indexOf( val.toLowerCase() ) > -1 );
        }
      );
    }

    // if nothing is found
    if (!this.storeList === null) {
      // display add new store button
      this.showAddStore = true;
    }
  }

  transactionFormValidate() {
    if (this.submitOrg.name.length &&
        this.amount &&
        (this.recurringPurchase &&
        this.recurringType ||
        !this.recurringPurchase &&
        !this.recurringType)) {
          this.transactionFormInvalid = false;
        } else {
          this.transactionFormInvalid = true;
        }
  }

  public postTransaction() {

    let myParams: any;
    let purchaseTime: string;
    purchaseTime = moment(this.myDate, 'YYYY-MM-DD[T]HH:mm').local().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    switch (this.transactionAdditionType) {
      case 1:
        myParams = {
          transaction_type  : this.transactionAdditionType,
          transaction_value : this.amount,
          purchase_time     : purchaseTime,
          organisation_id   : this.organisationId,
          category          : this.categoryId,
          essential         : this.essentialPurchase,
          recurring         : this.recurringType,
        };
        break;
      case 2:
        myParams = {
          transaction_type  : this.transactionAdditionType,
          transaction_value : this.amount,
          purchase_time     : purchaseTime,
          organisation_id   : this.organisationId,
          category          : this.categoryId,
          essential         : this.essentialPurchase,
          recurring         : this.recurringType,
        };
        break;
      case 3:
        myParams = {
          transaction_type  : this.transactionAdditionType,
          transaction_value : this.amount,
          purchase_time     : purchaseTime,
          organisation_name : this.submitOrg.name,
          street_name       : this.submitOrg.street_name,
          town              : this.submitOrg.town,
          postcode          : this.submitOrg.postcode,
          category          : this.categoryId,
          essential         : this.essentialPurchase,
          recurring         : this.recurringType,
        };
        break;
    }
    /******************************/

    this.api
    .upload(myParams)
    .subscribe(
      result => {
        if ( result.success === true ) {
          this.transactionFormStatus = 'success';
          this.resetForm();
        } else {
          this.transactionFormStatusError = JSON.stringify(result.status) + 'Error, ' + JSON.stringify(result.message);
          this.transactionFormStatus = 'send_failed';
        }
      },
      error => {
        console.log(error);
        try {
          console.log(error.error);
          const jsonError = error.json();
          this.transactionFormStatusError = '"' + jsonError.error + '" Error, ' + jsonError.message;
        } catch (e) {
          this.transactionFormStatusError = 'There was a server error, please try again later.';
        }
        this.transactionFormStatus = 'send_failed';
      }
    );
  }

  private resetForm() {
    this.submitOrg = {
      name: '',
      street_name: '',
      town: '',
      postcode: '',
    };
    this.storeList = [];
    this.amount = null;
    this.transactionFormInvalid = true;
    this.showAddStore = false;
    this.essentialPurchase = false;
    this.recurringPurchase = false;
    this.recurringType = null;
  }

  onSubmitPayroll() {
   console.log(this.payrollForm.value);

  this.api
      .orgPayroll(this.payrollForm.value)
      .subscribe(
        result => {
          this.payrollFormStatus = 'success';
        },
        error => {
          console.log( error._body );
          this.payrollFormStatus = 'send_failed';
        }
      );
  }

  onSubmitSingleSupplier() {
   console.log(this.singleSupplierForm.value);

  this.api
      .orgSupplier(this.singleSupplierForm.value)
      .subscribe(
        result => {
          this.singleSupplierFormStatus = 'success';
        },
        error => {
          this.singleSupplierFormStatus = 'send_failed';
        }
      );
  }

  onSubmitEmployee() {
   console.log(this.employeeForm.value);

  this.api
      .orgEmployee(this.employeeForm.value)
      .subscribe(
        result => {
          this.employeeFormStatus = 'success';
        },
        error => {
          this.employeeFormStatus = 'send_failed';
        }
      );
  }

}
