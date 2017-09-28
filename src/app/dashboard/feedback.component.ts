import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  loggedInEmail: string;
  noEmail = false;
  username: any;
  feedbackFormStatus: any;
  feedbackFormStatusError = 'Error received, please try again.';

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private api: ApiService,
  ) {
    this.feedbackForm = this.formBuilder.group({
      email:           ['', [Validators.required]],
      feedbacktext:    ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    if (localStorage.getItem('email')) {
      this.loggedInEmail = localStorage.getItem('email');
    }
    console.log('loggedInEmail: ' + this.loggedInEmail);
    if (this.loggedInEmail) {
      console.log('email not found in storage');
      this.api.accountFullLoad().subscribe(
        result => {
          console.log(result);
          this.feedbackForm.patchValue({
            email:        result.email,
          });
          this.api.setUserInfo( result.email, result.display_name || result.name );
        },
        error => {
          console.log( error._body );
          this.noEmail = true;
        }
      );
    }
  }

  onSubmit() {
    this.api
      .feedback(this.feedbackForm.value)
      .subscribe(
        result => {
          if ( result.success === true ) {
            console.log('Successful Upload');
            console.log(result);
            this.feedbackFormStatus = 'success';
            console.log(this.feedbackFormStatus);
            this.feedbackForm.patchValue({
              feedbacktext: '',
            });
          } else {
            console.log('Upload Error');
            this.feedbackFormStatusError = JSON.stringify(result.status) + 'Error, ' + JSON.stringify(result.message);
            this.feedbackFormStatus = 'send_failed';
            console.log(this.feedbackFormStatus);
          }
        },
        error => {
          console.log('Upload Error');
          console.log(error);
          try {
            console.log(error.error);
            const jsonError = error.json();
            console.log('boop');
            this.feedbackFormStatusError = '"' + jsonError.error + '" Error, ' + jsonError.message;
          } catch (e) {
            this.feedbackFormStatusError = 'There was a server error, please try again later.';
          }
          this.feedbackFormStatus = 'send_failed';
          console.log(this.feedbackFormStatus);
        }
      );
  }

}
