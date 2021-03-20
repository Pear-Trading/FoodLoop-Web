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
  topicList: any;
  topicIdList: any;

  constructor(private api: ApiService) {
    this.api.getTopics().subscribe(
      result => {
      	if (result.topics.length > 0) {
		      this.topicList = result.topics;
		      this.topicIdList = Object.keys(this.topicList);
		    } else {
		    	console.warn('No topics returned from server');
		    }
      },
      error => {
        console.error('Couldn\'t get topics');
        console.error(error._body);
      }
    );
    this.sendMessageForm = new FormGroup({
      messagetext: new FormControl('', Validators.required),
      topic: new FormControl('', Validators.required),
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
          console.error( error._body );
          this.noEmail = true;
        }
      );
    }
  }

  onSubmit(): void {
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
            console.error('Upload Error');
            this.sendMessageFormStatusError = JSON.stringify(result.status) + 'Error, ' + JSON.stringify(result.message);
            this.sendMessageFormStatus = 'send_failed';
          }
        },
        error => {
          console.error('Upload Error');
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
