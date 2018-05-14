import { Component} from '@angular/core';
import { ApiService } from '../providers/api-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  templateUrl: './org-push.component.html'
})

export class OrgPushComponent{
  pushForm: FormGroup;
  personalised = false;

  constructor(
  private formBuilder: FormBuilder,
  private api: ApiService,
  ) {
    this.pushForm = this.formBuilder.group({
      title:         ['', [Validators.required]],
      body:          ['', [Validators.required]],
      icon:          ['', [Validators.required]],
      personalised:  [true, [Validators.required]],
    });
  }

  onSubmit(){
    console.log(this.pushForm.value)
    console.log(this.personalised)
    this.api.sendNotification(this.pushForm.value)
      .subscribe(
      res => {
        console.log('Message Sent', res)
      },
      err => {
        console.log('Message Failed to send', err)
      }
      )
  }

  toggleEditable(event) {
     if ( event.target.checked ) {
         this.personalised = true;
    }
}

}
