import { Injectable } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private api: ApiService
  ) {
    this.angularFireMessaging.messages.subscribe((_messaging: AngularFireMessaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    })
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      this.api.addDeviceToken({'token': token, 'email': localStorage.getItem('email')}).subscribe(
        result => {
          console.log("Device registered successfully!");
          localStorage.setItem('devicetoken', token);
        },
        error => {
          console.error("Device could not be registered!", error._body);
        }
      );
    }, (err) => {
      console.error('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    });
  }
}
