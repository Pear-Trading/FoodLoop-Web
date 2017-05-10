import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
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
	
	this.peopleService
      .register(this.signin.value)
      .subscribe(
        result => {
          console.log( logged in! );
        },
        error => {
          console.log( error._body );
        }
      );
  }


}