import { Component } from '@angular/core';
import { MessagingService } from './service/messaging.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'push-notification';
  message;
  userType;

  constructor(private messagingService: MessagingService) { }

	/**
	 * Checks for push notification permissions and subscribes to messages.
	 */
  ngOnInit(): void {
    if (localStorage.getItem('usertype') === 'customer') {
      this.messagingService.requestPermission();
      this.messagingService.receiveMessage();
      this.message = this.messagingService.currentMessage;
    }
  }
}
