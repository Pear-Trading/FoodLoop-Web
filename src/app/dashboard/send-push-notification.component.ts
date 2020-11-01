import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../providers/api-service';

@Component({
  templateUrl: 'send-push-notification.component.html',
})

export class SendPushNotificationComponent implements OnInit {
  sendMessageForm: FormGroup;
  loggedInEmail: string;
  username: any;
  noEmail = false;
  sendMessageFormStatus: any;
  sendMessageFormStatusError = 'Error received, please try again.';

  constructor(private api: ApiService) {
    this.sendMessageForm = new FormGroup({
      messagetext:    new FormControl('', Validators.required),
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
          this.sendMessageForm.patchValue({
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
    console.log(this.sendMessageForm.value);
    this.api
      .sendMessage(this.sendMessageForm.value)
      .subscribe(
        result => {
          if ( result.success === true ) {
            console.log('Successful Upload');
            this.sendMessageFormStatus = 'success';
            this.sendMessageForm.patchValue({
              messagetext: '',
            });
          } else {
            console.log('Upload Error');
            this.sendMessageFormStatusError = JSON.stringify(result.status) + 'Error, ' + JSON.stringify(result.message);
            this.sendMessageFormStatus = 'send_failed';
          }
        },
        error => {
          console.log('Upload Error');
          try {
            this.sendMessageFormStatusError = '"' + error.error.error + '" Error, ' + error.error.message;
          } catch (e) {
            this.sendMessageFormStatusError = 'There was a server error, please try again later.';
          }
          this.sendMessageFormStatus = 'send_failed';
        }
      );
  }
}
