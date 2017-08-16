import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'account-edit.component.html',
  providers: [ApiService]
})
export class AccountEditComponent {
  settingForm: FormGroup;
  settingOrganisationForm: FormGroup;
  settingCustomerForm: FormGroup;
  accountType: any;
  @ViewChild('fileInput') fileInput;

  constructor(
  private http: Http,
	private formBuilder: FormBuilder,
	private api: ApiService,
	) {	
	  this.settingForm = this.formBuilder.group({
      email           : ['', [Validators.required]],
      postcode        : ['', [Validators.required]],
      password        : ['', [Validators.required]],
      new_password    : [''],
      profile_picture : [''],
	  }); 
    this.settingOrganisationForm = this.formBuilder.group({
      name         : ['', [Validators.required]],
      street_name  : ['', [Validators.required]],
      town         : ['', [Validators.required]],
	  });
    this.settingCustomerForm = this.formBuilder.group({
      full_name     : ['', [Validators.required]],
      display_name  : ['', [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    this.api.accountFullLoad().subscribe(
      result => {
        console.log(result);
        this.settingForm.patchValue({
          email:        result.email,
          postcode:     result.postcode,
          password:     '',
          new_password: '',
        });
        this.settingOrganisationForm.patchValue({
          name:         result.name,
          street_name:  result.street_name,
          town:         result.town,
        });
        this.settingCustomerForm.patchValue({
          full_name:    result.full_name,
          display_name: result.display_name,
        });
        this.api.setUserInfo( result.email, result.display_name );
        this.accountType = ( result.name == null ? 'customer' : 'organisation' );
      },
      error => {
        console.log( error._body );
      }
    );
  }
  
  onSubmitOrganisation() {
	 console.log(this.settingForm.valid);
	if (!this.settingForm.valid && !this.settingOrganisationForm.valid) {
		console.log("Not Valid!");
		return;
	}
  
  let settingForm = this.settingForm.value;
	let settingOrganisationForm = this.settingOrganisationForm.value;
  
  // image upload code
  let fi = this.fileInput.nativeElement;
  let data = new FormData();
  
  if (fi.files && fi.files[0]) {
    let fileToUpload = fi.files[0];
    data.append("file", fileToUpload);
  }

  let submitData = {
    email:        settingForm.email,
    postcode:     settingForm.postcode,
    password:     settingForm.password,
    new_password: settingForm.new_password,
    name:         settingOrganisationForm.name,
    street_name:  settingOrganisationForm.street_name,
    town:         settingOrganisationForm.town,
  }
  
  data.append('form', JSON.stringify(submitData));
  
  console.log(data);
	this.api
    .accountEditUpdate(data)
    .subscribe(
      result => {
        console.log('data submitted!');
      },
      error => {
        console.log( error._body );
      }
    );
  }
  
  onSubmitCustomer() {
	 console.log(this.settingForm.valid);
	if (!this.settingForm.valid && !this.settingCustomerForm.valid) {
		console.log("Not Valid!");
		return;
	}
  
  let settingForm = this.settingForm.value;
	let settingCustomerForm = this.settingCustomerForm.value;
	
  // image upload code
  let fi = this.fileInput.nativeElement;
  let data = new FormData();
  
  if (fi.files && fi.files[0]) {
    let fileToUpload = fi.files[0];
    data.append("file", fileToUpload);
  }

  let submitData = {
    email:        settingForm.email,
    postcode:     settingForm.postcode,
    password:     settingForm.password,
    new_password: settingForm.new_password,
    full_name:    settingCustomerForm.full_name,
    display_name: settingCustomerForm.display_name,
  }
  
  data.append('form', JSON.stringify(submitData));
  
	this.api
    .accountEditUpdate(data)
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
