import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../providers/api-service';

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

  constructor(private api: ApiService) {
    this.feedbackForm = new FormGroup({
      email:           new FormControl({value: this.loggedInEmail, disabled: this.noEmail}, Validators.required),
      feedbacktext:    new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.loggedInEmail = localStorage.getItem('email');
    }

    if (!this.loggedInEmail) {
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

  onSubmit(): void {
    this.api
      .feedback(this.feedbackForm.value)
      .subscribe(
        result => {
          if ( result.success === true ) {
            console.log('Successful Upload');
            this.feedbackFormStatus = 'success';
            this.feedbackForm.patchValue({
              feedbacktext: '',
            });
          } else {
            console.log('Upload Error');
            this.feedbackFormStatusError = JSON.stringify(result.status) + 'Error, ' + JSON.stringify(result.message);
            this.feedbackFormStatus = 'send_failed';
          }
        },
        error => {
          console.log('Upload Error');
          try {
            this.feedbackFormStatusError = '"' + error.error.error + '" Error, ' + error.error.message;
          } catch (e) {
            this.feedbackFormStatusError = 'There was a server error, please try again later.';
          }
          this.feedbackFormStatus = 'send_failed';
        }
      );
  }
}
