import { Injectable } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private readonly angularFireMessaging: AngularFireMessaging,
    private api: ApiService
  ) { }

  requestPermission() {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    } else if (Notification.permission === 'granted') {
      console.log('Push notification permission granted');
      this.registerDeviceToken();
    } else if (Notification.permission === 'denied' ||
               Notification.permission === 'default') {
      console.log('Push notification permission not granted');
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          console.log('Push notification permission granted');
          this.registerDeviceToken();
        }
      });
    }
  }

  registerDeviceToken() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      this.api.checkDeviceToken({'token': token}).subscribe(
        result => {
          if (result.exists) { console.log('Device already registered!'); } else {
            this.api.addDeviceToken({'token': token, 'email': localStorage.getItem('email')}).subscribe(
              result => {
                console.log('Device registered successfully!');
                localStorage.setItem('devicetoken', token);
              },
              error => {
                console.error('Device could not be registered!', error._body);
              }
            );
          }
        },
        error => {
          console.error(error._body);
        }
      );
    }, (err) => {
      console.error('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((message) => {
      console.log('show message!', message);
	    const notification = new Notification(message.notification.title, { body: message.notification.body });
      this.currentMessage.next(message);
    });
  }
}
