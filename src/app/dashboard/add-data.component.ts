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
        },
        error => {
          console.log( error._body );
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
        },
        error => {
          console.log( error._body );
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
        },
        error => {
          console.log( error._body );
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
        },
        error => {
          console.log( error._body );
        }
      );
  }

}
