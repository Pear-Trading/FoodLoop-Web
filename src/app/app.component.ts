import { Component } from '@angular/core';
import { MessagingService } from './service/messaging.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'push-notification';
  message;
  userType;

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    this.userType = localStorage.getItem('usertype');
    if (this.userType === 'customer') {
      this.messagingService.requestPermission();
      this.messagingService.receiveMessage();
      this.message = this.messagingService.currentMessage;
      console.log(this.message);
      if (this.message.notification) {
	console.log('Notification waiting');
      }
    }
  }
}
