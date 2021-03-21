import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../providers/api-service';

@Component({
  templateUrl: 'topics-edit.component.html',
})
export class TopicsEditComponen {
  createTopicForm: FormGroup;
  loggedInEmail: string;
  createTopicFormStatus: string;
  createTopicFormStatusSuccess: string;
  createTopicFormStatusError = 'Error received, please try again.';

  constructor(private api: ApiService) {
    this.createTopicForm = new FormGroup({
      topic: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    this.api
      .createTopic(this.createTopicForm.value)
      .subscribe(
        result => {
          console.debug('Topic successfully created.');
          this.createTopicFormStatus = 'success';
          this.createTopicForm.patchValue({
            topic: '',
          });
        },
        error => {
          console.error('Topic creation failed.');
          try {
            this.createTopicFormStatusError = '"' + error.error.error + '" Error, ' + error.error.message;
          } catch (e) {
            this.createTopicFormStatusError = 'There was a server error, please try again later.';
          }
          this.createTopicFormStatus = 'create_failed';
        }
      );
  }
}
