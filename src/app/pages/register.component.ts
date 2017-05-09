import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'register.component.html',
  providers: [ApiService]
})
export class RegisterComponent {
  signup: FormGroup;
  ageRanges: Object[];
  
  constructor(private http: Http, private formBuilder: FormBuilder, private api: ApiService) {
	  

  this.api.getAgeRanges().subscribe(
  result => {
	  console.log(result);
	  this.ageRanges = result.ages;
	 }
)
  this.signup = this.formBuilder.group({
    token:        ['', [Validators.required]],
      full_name:    ['', [Validators.required]],
      display_name: ['', [Validators.required]],
      email:        ['', [Validators.required]],
      postcode:     ['', [Validators.required]],
      age_range:    ['', [Validators.required]],
      password:     ['', [Validators.required]],
  });
  }
  
  onSubmit() {
    console.log(this.signup.value);
  }


}