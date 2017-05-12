import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import {Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'login.component.html',
  providers: [ApiService]
})
export class LoginComponent {
  signin: FormGroup;
  ageRanges: Object[];
  
  constructor(
	private http: Http,
	private formBuilder: FormBuilder,
	private router: Router,
	private api: ApiService
	) {	  
	  this.api.getAgeRanges()
		.subscribe(
			result => {
				console.log(result);
				this.ageRanges = result.ages;
			}
		);
	  this.signin = this.formBuilder.group({
		email:        ['', [Validators.required]],
		password:     ['', [Validators.required]],
	  });
  }
  
  onSubmit() {
    console.log(this.signin.value);
	
	this.api
      .login(this.signin.value)
      .subscribe(
        result => {
          console.log('logged in!');
		  this.router.navigate(['/dashboard'])
        },
        error => {
          console.log( error._body );
        }
      );
  }


}