import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValidationManager } from 'ng2-validation-manager';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import {Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'register.component.html',
})

export class RegisterComponent {
  signupForm: ValidationManager;
  customerForm: ValidationManager;
  organisationForm: ValidationManager;
  years: Object[];
  registerStatus: any;
  registerStatusError = 'Error received, please try again.';

  constructor(
  private http: Http,
  private formBuilder: FormBuilder,
  private router: Router,
  private api: ApiService,
  ) {
  this.years = [];
  const max = new Date().getFullYear() - 10,
        min = max - 140;

  for (let i = max; i >= min; i--) {
    this.years.push(i);
  }
    this.signupForm = new ValidationManager({
    token:        'required',
    usertype:     'required',
    email:        'required|email',
    password:     'required',
    confirmpassword: 'required|equalTo:password'
    });
    this.customerForm = new ValidationManager({
    display_name:  'required',
    full_name:     'required',
    postcode:      'required',
    year_of_birth: 'required',
    });
    this.organisationForm = new ValidationManager({
    name:         'required',
    sector:       'required',
    street_name:  'required',
    town:         'required',
    postcode:     'required',
    });
  }

  onSubmitCustomer() {

    console.log(this.signupForm.isValid());
  if (!this.signupForm.isValid() && !this.customerForm.isValid()) {
    console.log('Not Valid!');
    this.registerStatus = 'validation_failed';
    console.log(this.registerStatus);
    return;
  }
    const signupForm = this.signupForm.getForm().value;
  const customerForm = this.customerForm.getForm().value;

  const data = {
    token:         signupForm.token,
    usertype:      signupForm.usertype,
    email:         signupForm.email,
    password:      signupForm.password,
    display_name:  customerForm.display_name,
    full_name:     customerForm.full_name,
    postcode:      customerForm.postcode,
    year_of_birth: customerForm.year_of_birth,
  };
  console.log(data);
  this.api
      .register(data)
      .subscribe(
        result => {
          console.log('registered!');
          this.registerStatus = 'success';
          console.log(this.registerStatus);
      this.router.navigate(['/dashboard']);
        },
        error => {
          console.log('Register Error');
          console.log(error);
          try {
            console.log(error.error);
            const jsonError = error.json();
            console.log('boop');
            this.registerStatusError = '"' + jsonError.error + '" Error, ' + jsonError.message;
          } catch (e) {
            this.registerStatusError = 'There was a server error, please try again later.';
          }
          this.registerStatus = 'send_failed';
          console.log(this.registerStatus);
        }
      );
  }
  onSubmitOrganisation() {

    console.log(this.signupForm.isValid());
  if (!this.signupForm.isValid() || !this.organisationForm.isValid()) {
    console.log('Not Valid!');
    this.registerStatus = 'validation_failed';
    console.log(this.registerStatus);
    return;
  }
    const signupForm = this.signupForm.getForm().value;
  const organisationForm = this.organisationForm.getForm().value;

  const data = {
    token:        signupForm.token,
    usertype:     signupForm.usertype,
    email:        signupForm.email,
    password:     signupForm.password,
    name:         organisationForm.name,
    sector:       organisationForm.sector,
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
          this.registerStatus = 'success';
          console.log(this.registerStatus);
        this.router.navigate(['/dashboard']);
        },
        error => {
          console.log('Register Error');
          console.log(error);
          try {
            console.log(error.error);
            const jsonError = error.json();
            console.log('boop');
            this.registerStatusError = '"' + jsonError.error + '" Error, ' + jsonError.message;
          } catch (e) {
            this.registerStatusError = 'There was a server error, please try again later.';
          }
          this.registerStatus = 'send_failed';
          console.log(this.registerStatus);
        }
      );
  }


}
