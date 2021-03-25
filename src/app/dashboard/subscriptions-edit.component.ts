import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ApiService } from '../providers/api-service';

@Component({
  templateUrl: 'subscriptions-edit.component.html',
})
export class SubscriptionsUpdateComponent implements OnInit {
  updateSubscriptionsForm: FormGroup;
  updateSubscriptionsFormStatus: string;
  updateSubscriptionsFormStatusSuccess: string;
  updateSubscriptionsFormStatusError = 'Error received, please try again.';
  topicList: any;
  topicIdList: any;
	
	get topicsFormArray() {
    return this.updateSubscriptionsForm.controls.topicSubscriptions as FormArray;
  }
  
  constructor(private api: ApiService, private formBuilder: FormBuilder) {
		this.api.getTopicsAndSubscriptions().subscribe(
      result => {
      	if (result.topics.length > 0) {
		      this.topicList = result.topics;
		      this.topicIdList = Object.keys(this.topicList);
		      					
					this.topicList.forEach((topic) => this.topicsFormArray.push(new FormControl({
						id: topic.id,
						name: topic.name,
						isSubscribed: !!topic.isSubscribed
					})));
		    } else {
		    	console.warn('No topics returned from server');
		    }
      },
      error => {
        console.error('Couldn\'t get topics');
        console.error(error._body);
      }
    );		
    
    this.updateSubscriptionsForm = this.formBuilder.group({
			topicSubscriptions: new FormArray([])
		});
  }
  
	ngOnInit(): void {
  }
  
  onCheckChange(event): void {
  	const topicIndex = this.topicsFormArray.value.findIndex((obj => obj.id == event.target.id));
  	this.topicsFormArray.value[topicIndex].isSubscribed = !this.topicsFormArray.value[topicIndex].isSubscribed;
  }

  onSubmit(): void {
  	console.debug(this.updateSubscriptionsForm.controls.topicSubscriptions.value);
  	
    this.api
      .updateSubscriptions({ topicSubscriptions: this.updateSubscriptionsForm.controls.topicSubscriptions.value })
      .subscribe(
        results => {
          console.debug('Subscriptions successfully updated.');
          this.updateSubscriptionsFormStatus = 'success';
        },
        error => {
          console.error('Subscriptions update failed.');
          try {
            this.updateSubscriptionsFormStatusError = '"' + error.error.error + '" Error, ' + error.error.message;
          } catch (e) {
            this.updateSubscriptionsFormStatusError = 'There was a server error, please try again later.';
          }
          this.updateSubscriptionsFormStatus = 'update_failed';
        }
      );
  }
}
