import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValidationManager } from "ng2-validation-manager";
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import {Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'register.component.html',
  providers: [ApiService]
})

export class RegisterComponent {
  signupForm: ValidationManager;
  customerForm: ValidationManager;
  organisationForm: ValidationManager;
  ageRanges: Object[];
  
  constructor(
	private http: Http,
	private formBuilder: FormBuilder,
	private router: Router,
	private api: ApiService,
	) {	  
	  this.api.getAgeRanges()
		.subscribe(
		  result => {
		    console.log(result);
		    this.ageRanges = result.ages;
		  }
		);
	  this.signupForm = new ValidationManager({
		token:        'required',
		usertype:     'required',
		email:        'required|email',
		password:     'required',
		confirmpassword: 'required|equalTo:password'
	  });
	  this.customerForm = new ValidationManager({
		display_name: 'required',
		full_name:    'required',
		postcode:     'required',
		age_range:    'required',
	  });
	  this.organisationForm = new ValidationManager({
		name:         'required',
		street_name:  'required',
		town:         'required',
		postcode:     'required',
	  });
  }
  
  onSubmitCustomer() {
	  
    console.log(this.signupForm.isValid());
	if (!this.signupForm.isValid() && !this.customerForm.isValid()) {
		console.log("Not Valid!");
		return;
	}
    let signupForm = this.signupForm.getForm().value;
	let customerForm = this.customerForm.getForm().value;
	
	let data = {
		token:        signupForm.token,
		usertype:     signupForm.usertype,
		email:        signupForm.email,
		password:     signupForm.password,
		display_name: customerForm.display_name,
		full_name:    customerForm.full_name,
		postcode:     customerForm.postcode,
		age_range:    customerForm.age_range,
	};
	console.log(data);
	this.api
      .register(data)
      .subscribe(
        result => {
          console.log('registered!');
		  this.router.navigate(['/dashboard']);
        },
        error => {
          console.log( error._body );
        }
      );
  }
  onSubmitOrganisation() {
	  
    console.log(this.signupForm.isValid());
	if (!this.signupForm.isValid() || !this.organisationForm.isValid()) {
		console.log("Not Valid!");
		return;
	}
    let signupForm = this.signupForm.getForm().value;
	let organisationForm = this.organisationForm.getForm().value;
	
	let data = {
		token:        signupForm.token,
		usertype:     signupForm.usertype,
		email:        signupForm.email,
		password:     signupForm.password,
		name:         organisationForm.name,
		street_name:  organisationForm.street_name,
		town:         organisationForm.town,
		postcode:     organisationForm.postcode,
	};
	console.log(data);
	this.api
      .register(data)
      .subscribe(
        result => {
          console.log('registered!');
		  this.router.navigate(['/dashboard']);
        },
        error => {
          console.log( error._body );
		  
        }
      );
  }


}