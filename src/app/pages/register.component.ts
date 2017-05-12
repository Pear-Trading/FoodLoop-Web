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
  signup: ValidationManager;
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
	  this.signup = new ValidationManager({
		token:        'required',
		usertype:     'required',
		name:         'required',
		full_name:    'required',
		display_name: 'required',
		email:        'required',
		postcode:     'required',
		street_name:  'required',
		town:         'required',
		age_range:    'required',
		password:     'required',
		confirmpassword: 'required|equalTo:password'
	  });
  }
  
  onSubmit() {
	  
    console.log(this.signup.isValid());
	
    console.log(this.signup.getForm().value);
	
	/* this.api
      .register(this.signup.value)
      .subscribe(
        result => {
          console.log('registered!');
		  this.router.navigate(['/dashboard']);
        },
        error => {
          console.log( error._body );
        }
      );*/
  }


}