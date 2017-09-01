import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ApiService } from '../providers/api-service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'feedback.component.html',
  providers: [ApiService]
})
export class FeedbackComponent {
  feedbackForm: FormGroup;
  loggedInEmail: any;
  noEmail: boolean = false;
  username: any;
  feedbackFormStatus: any;
  feedbackFormStatusError: string = 'Error received, please try again.';

  constructor(
    private http: Http,
  	private formBuilder: FormBuilder,
  	private api: ApiService,
  ) {
    this.loggedInEmail = localStorage.getItem('email');
    if (this.loggedInEmail == null) {
      this.noEmail = true;
    }

    this.feedbackForm = this.formBuilder.group({
      email:           ['', [Validators.required]],
      feedbacktext:    ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.api
      .feedback(this.feedbackForm.value)
      .subscribe(
        result => {
          if ( result.success == true ) {
            console.log('Successful Upload');
            console.log(result);
            this.feedbackFormStatus = "success";
            console.log(this.feedbackFormStatus);
            this.feedbackForm.patchValue({
              feedbacktext: '',
            });
          } else {
            console.log('Upload Error');
            this.feedbackFormStatusError = JSON.stringify(result.status) + 'Error, ' + JSON.stringify(result.message);
            this.feedbackFormStatus = "send_failed";
            console.log(this.feedbackFormStatus);
          }
        },
        error => {
          console.log('Upload Error');
          console.log(error);
          try {
            console.log(error.error);
            let jsonError = error.json();
            console.log("boop");
            this.feedbackFormStatusError = '"' + jsonError.error + '" Error, ' + jsonError.message;
          } catch(e) {
            this.feedbackFormStatusError = 'There was a server error, please try again later.';
          }
          this.feedbackFormStatus = "send_failed";
          console.log(this.feedbackFormStatus);
        }
      );
  }

}
