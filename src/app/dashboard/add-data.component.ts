import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'add-data.component.html',
  providers: [ApiService]
})
export class AddDataComponent {
  payrollForm: FormGroup;
  suppliersForm: FormGroup;
  singleSupplierForm: FormGroup;
  employeeForm: FormGroup;
  payrollFormStatus: any;
  suppliersFormStatus: any;
  singleSupplierFormStatus: any;
  employeeFormStatus: any;

  constructor(
  private http: Http,
	private formBuilder: FormBuilder,
	private api: ApiService,
	) {	
	  this.payrollForm = this.formBuilder.group({
		entryperiod:         ['', [Validators.required]],
		employeeamount:      ['', [Validators.required]],
		localemployeeamount: ['', [Validators.required]],
		grosspayroll:        ['', [Validators.required]],
    payrollincometax:    [''],
    payrollemployeeni:   [''],
    payrollemployerni:   [''],
    payrolltotalpension: [''],
    payrollotherbenefit: [''],
	  });
    this.suppliersForm = this.formBuilder.group({
		entryperiod:          ['', [Validators.required]],
		grossspend:           ['', [Validators.required]],
		suppliersamount:      ['', [Validators.required]],
		localsuppliersamount: ['', [Validators.required]],
	  });
    this.singleSupplierForm = this.formBuilder.group({
    entryperiod:          ['', [Validators.required]],
    supplierbusinessname: [''],
    postcode:             [''],
    monthlyspend:         [''],
	  });
    this.employeeForm = this.formBuilder.group({
    entryperiod:          ['', [Validators.required]],
    employeeno:           [''],
    employeeincometax:    [''],
    employeegrosswage:    [''],
    employeeni:           [''],
    employeepension:      [''],
    employeeotherbenefit: [''],
	  });
  }
  
  onSubmitPayroll() {
	 console.log(this.payrollForm.value);
	
	this.api
      .login(this.payrollForm.value)
      .subscribe(
        result => {
          console.log('data submitted!');
          this.payrollFormStatus = "success";
          console.log(this.payrollFormStatus);
        },
        error => {
          console.log( error._body );
          this.payrollFormStatus = "send_failed";
          console.log(this.payrollFormStatus);
        }
      );
  }
  
  onSubmitSuppliers() {
	 console.log(this.suppliersForm.value);
	
	this.api
      .login(this.suppliersForm.value)
      .subscribe(
        result => {
          console.log('data submitted!');
          this.suppliersFormStatus = "success";
          console.log(this.suppliersFormStatus);
        },
        error => {
          console.log( error._body );
          this.suppliersFormStatus = "send_failed";
          console.log(this.suppliersFormStatus);
        }
      );
  }
  
  onSubmitSingleSupplier() {
	 console.log(this.singleSupplierForm.value);
	
	this.api
      .login(this.singleSupplierForm.value)
      .subscribe(
        result => {
          console.log('data submitted!');
          this.singleSupplierFormStatus = "success";
          console.log(this.singleSupplierFormStatus);
        },
        error => {
          console.log( error._body );
          this.singleSupplierFormStatus = "send_failed";
          console.log(this.singleSupplierFormStatus);
        }
      );
  }
  
  onSubmitEmployee() {
	 console.log(this.employeeForm.value);
	
	this.api
      .login(this.employeeForm.value)
      .subscribe(
        result => {
          console.log('data submitted!');
          this.employeeFormStatus = "success";
          console.log(this.employeeFormStatus);
        },
        error => {
          console.log( error._body );
          this.employeeFormStatus = "send_failed";
          console.log(this.employeeFormStatus);
        }
      );
  }

}
