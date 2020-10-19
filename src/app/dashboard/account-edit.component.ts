import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/api-service';


@Component({
  templateUrl: 'account-edit.component.html',
})
export class AccountEditComponent implements OnInit {
  settingForm: FormGroup;
  settingOrganisationForm: FormGroup;
  settingCustomerForm: FormGroup;
  accountType: any;
  // @ViewChild('fileInput') fileInput;
  submitStatus: any;
  submitStatusError = 'Error received, please try again.';

  constructor(
  private formBuilder: FormBuilder,
  private api: ApiService,
  ) {
    this.settingForm = this.formBuilder.group({
      email           : ['', [Validators.required]],
      postcode        : ['', [Validators.required]],
      password        : ['', [Validators.required]],
      new_password    : [''],
    });
    this.settingOrganisationForm = this.formBuilder.group({
      name         : ['', [Validators.required]],
      street_name  : ['', [Validators.required]],
      town         : ['', [Validators.required]],
      sector       : ['', [Validators.required]],
    });
    this.settingCustomerForm = this.formBuilder.group({
      full_name     : ['', [Validators.required]],
      display_name  : ['', [Validators.required]],
    });
    this.accountType = localStorage.getItem('usertype');
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
          sector:       result.sector,
        });
        this.settingCustomerForm.patchValue({
          full_name:    result.full_name,
          display_name: result.display_name,
        });
        this.api.setUserInfo( result.email, result.display_name || result.name );
      },
      error => {
        console.log( error._body );
      }
    );
  }

  onSubmitOrganisation() {
  console.log(this.settingForm.valid);
  if (!this.settingForm.valid && !this.settingOrganisationForm.valid) {
    console.log('Not Valid!');
    this.submitStatus = 'validation_failed';
    console.log(this.submitStatus);
    return;
  }

  const settingForm = this.settingForm.value;
  const settingOrganisationForm = this.settingOrganisationForm.value;

  // image upload code
  // const fi = this.fileInput.nativeElement;
  // const data = new FormData();

  // if (fi.files && fi.files[0]) {
  //   const fileToUpload = fi.files[0];
  //   data.append('file', fileToUpload);
  // }

  const submitData = {
    email:        settingForm.email,
    postcode:     settingForm.postcode.toUpperCase(),
    password:     settingForm.password,
    new_password: settingForm.new_password,
    name:         settingOrganisationForm.name,
    street_name:  settingOrganisationForm.street_name,
    town:         settingOrganisationForm.town,
    sector:       settingOrganisationForm.sector,
  };

  // data.append('form', JSON.stringify(submitData));

  console.log(submitData);
  this.api
    .accountEditUpdate(submitData)
    .subscribe(
      result => {
        this.submitStatus = 'success';
      },
      error => {
        console.log('Edit Error');
        console.log(error);
        try {
          this.submitStatusError = '"' + error.error.error + '" Error, ' + error.error.message;
        } catch (e) {
          this.submitStatusError = 'There was a server error, please try again later.';
        }
        this.submitStatus = 'send_failed';
      }
    );
  }

  onSubmitCustomer() {
   console.log(this.settingForm.valid);
  if (!this.settingForm.valid && !this.settingCustomerForm.valid) {
    console.log('Not Valid!');
    this.submitStatus = 'validation_failed';
    return;
  }

  const settingForm = this.settingForm.value;
  const settingCustomerForm = this.settingCustomerForm.value;

  // image upload code
  // const fi = this.fileInput.nativeElement;
  const data = new FormData();

  // if (fi.files && fi.files[0]) {
  //   const fileToUpload = fi.files[0];
  //   data.append('file', fileToUpload);
  // }

  const submitData = {
    email:        settingForm.email,
    postcode:     settingForm.postcode.toUpperCase(),
    password:     settingForm.password,
    new_password: settingForm.new_password,
    full_name:    settingCustomerForm.full_name,
    display_name: settingCustomerForm.display_name,
  };

  // data.append('form', JSON.stringify(submitData));

  this.api
    .accountEditUpdate(submitData)
    .subscribe(
      result => {
        console.log('data submitted!');
        this.submitStatus = 'success';
        console.log(this.submitStatus);
      },
      error => {
        console.log('Edit Error');
        console.log(error);
        try {
          console.log(error.error);
          const jsonError = error.json();
          console.log('boop');
          this.submitStatusError = '"' + jsonError.error + '" Error, ' + jsonError.message;
        } catch (e) {
          this.submitStatusError = 'There was a server error, please try again later.';
        }
        this.submitStatus = 'send_failed';
        console.log(this.submitStatus);
      }
    );
  }

}
